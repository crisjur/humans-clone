import React, { useCallback, useMemo, useState } from 'react'
import { Modal, Button, Input, DatePicker, Menu, Dropdown } from 'antd';
import { CalendarFilled, EllipsisOutlined } from '@ant-design/icons';
import moment from 'moment';

const Event = ({ data, updateEvent, deleteEvent }) => {
  const { id, title, date } = data
  const [isShow, setIsShow] = useState(false)
  const [eventTitle, setEventTitle] = useState('')
  const [eventDate, setEventDate] = useState('')

  const onToggleModal = useCallback(() => {
    setIsShow(value => !value)
  }, [setIsShow])

  const onClickMenu = useCallback(({ key }) => {
    setEventTitle(title)
    setEventDate(date)
    setIsShow(value => !value)
  }, [title, date, setIsShow])

  const _updateEvent = useCallback(() => {
    if(eventTitle && eventDate) {
      setIsShow(false)
      updateEvent(id, eventTitle, eventDate)
    }
  }, [id, eventTitle, eventDate])

  const _deleteEvent = useCallback(() => {
    deleteEvent(id)
    setIsShow(false)
  }, [id])

  const menu = useMemo(() =>
    <Menu onClick={onClickMenu}>
      <Menu.Item key="0">
        <div>Edit</div>
      </Menu.Item>
    </Menu>
  ,[]);


  return (
    <div className="event-item">
      <div className="d-flex flex-row">
        <CalendarFilled className="calendar-icon" />
        <span className="event-title">{title}</span>
      </div>
      <div className="d-flex flex-column">
        <Dropdown overlay={menu} trigger={['click']}>
          <EllipsisOutlined className="menu-icon text-right" onClick={e => e.preventDefault()} />
        </Dropdown>
        <span className="event-date">{date}</span>
      </div>
      {/* Modal */}
      <Modal
          visible={isShow}
          title="Update Event"
          onOk={_updateEvent}
          onCancel={onToggleModal}
          footer={[
            <Button type="primary" onClick={_deleteEvent} danger>
              Delete
            </Button>,
            <Button type="primary" onClick={_updateEvent}>
              Save
            </Button>,
          ]}
        >
          <p>Date</p>
          <DatePicker 
            size="large"
            defaultValue={moment(eventDate, "MM/DD/YYYY")}
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

export default Event