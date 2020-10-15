import React, { useEffect, useState, useCallback } from 'react'
import { Modal, Button, Input, DatePicker } from 'antd';
import { useHistory, useParams } from 'react-router';
import UserAvatar from './Avatar';
import Circles from './Circles';
import Comment from './Comment';
import Events from './Events';
import Comments from './Comments';
import api from '../api/api';

const HumanDetail = () => {
  const history = useHistory()
  const { hId } = useParams()
  const [human, setHuman] = useState({})
  const [isShow, setIsShow] = useState(false)
  const [eventTitle, setEventTitle] = useState('')
  const [eventDate, setEventDate] = useState('')

  const getHumanDetail = useCallback((id) => {
    setHuman(api.getHumanDetail(id))
  }, [setHuman])

  const onComment = useCallback((comment) => {
    api.addComment(hId, comment)
    setHuman(api.getHumanDetail(hId))
  }, [hId, setHuman])

  
  const onToggleModal = useCallback(() => {
    setEventTitle('')
    setEventDate('')
    setIsShow(value => !value)
  }, [setIsShow])

  const createEvent = useCallback(() => {
    if(eventTitle && eventDate) {
      setIsShow(false)
      api.addEvent(hId, { title: eventTitle, date: eventDate})
      setHuman(api.getHumanDetail(hId))
    }
  }, [eventTitle, eventDate, setHuman])

  const updateEvent = useCallback((id, title, date) => {
    if(title && date) {
      api.updateEvent(hId, id, title, date)
      setHuman(api.getHumanDetail(hId))
    }
  }, [hId, setHuman])

  const deleteEvent = useCallback((id) => {
    if(id) {
      api.deleteEvent(hId, id)
      setHuman(api.getHumanDetail(hId))
    }
  }, [hId, setHuman])

  const updateComment = useCallback((id, comment) => {
    if(comment) {
      api.updateComment(hId, id, comment)
      setHuman(api.getHumanDetail(hId))
    }
  }, [hId, setHuman])

  const deleteComment = useCallback((id) => {
    if(id) {
      api.deleteComment(hId, id)
      setHuman(api.getHumanDetail(hId))
    }
  }, [hId, setHuman])

  const changeName = useCallback(name => {
    api.updateHuman(hId, 'name', name)
    setHuman(api.getHumanDetail(hId))
  }, [hId, setHuman])

  const changeAvatar = useCallback(src => {
    api.updateHuman(hId, 'avatar', src)
    setHuman(api.getHumanDetail(hId))
  }, [hId, setHuman])

  const onDeleteHuman = useCallback(() => {
    api.deleteHuman(hId)
    history.push('/')
  }, [hId, setHuman])

  //useEffect
  useEffect(() => {
    getHumanDetail(hId)
  }, [hId])
  return (
    <div className="human-detail-container">
      <div className="human-detail-body">
        <UserAvatar data={human} changeName={changeName} changeAvatar={changeAvatar} onDeleteHuman={onDeleteHuman}/>
        <Circles data={human} />
        <Comment onComment={onComment} />
        <Events data={human?.events || []} updateEvent={updateEvent} deleteEvent={deleteEvent} />
        <Comments data={human?.comments || []} updateComment={updateComment} deleteComment={deleteComment} />
      </div>
      <div className="human-detail-date">
        <div className="w-100 d-flex flex-row justify-between">
          <div />
          <Button type="primary" onClick={onToggleModal}>Add event</Button>
        </div>
        <div className="w-100 d-flex flex-row justify-between mt-4 align-center">
          <div className="date-title">Last Updated</div>
          <small>{human.updatedAt}</small>
        </div>
        <div className="w-100 d-flex flex-row justify-between mt-4 align-center">
          <div className="date-title">Human Created</div>
          <small>{human.createdAt}</small>
        </div>
      </div>
      
      {/* Modal */}
      <Modal
          visible={isShow}
          title="New Event"
          onOk={createEvent}
          onCancel={onToggleModal}
          footer={[
            null,
            <Button key="submit" type="primary" onClick={createEvent}>
              Create
            </Button>,
          ]}
        >
          <p>Date</p>
          <DatePicker 
            size="large"
            onChange={(date, dateString) => setEventDate(dateString)}
            format="MM/DD/YYYY"
            className="w-100"
          />
          <p>Event</p>
          <Input size="large" placeholder="" value={eventTitle} onChange={e => setEventTitle(e.target.value)} />
        </Modal>
    </div>
  )
}

export default HumanDetail