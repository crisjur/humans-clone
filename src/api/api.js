import shortId from 'shortid'
import moment from 'moment'
import _ from 'lodash'
import LocalStorage from '../utils/localstorage'

const findItem = (data, id) => {
  const item = data.find(d => d.id === id) || {}
  return item
}

const getHumans = () => {
  return LocalStorage.getItem('humans') || []
}

const getHumanDetail = id => {
  let humans = LocalStorage.getItem('humans') || []
  return findItem(humans, id)
}

const createHuman = (name) => {
  const id = shortId.generate()
  const humans = LocalStorage.getItem('humans') || []
  const createdAt = moment().format('MM/DD/YYYY')
  const _humans = [...humans, { id, name, createdAt, updatedAt: createdAt }]
  LocalStorage.setItem('humans', JSON.stringify(_humans))
}

const updateHuman = (id, key, value) => {
  let humans = LocalStorage.getItem('humans') || []
  const human = findItem(humans, id)
  const updatedAt = moment().format('MM/DD/YYYY')
  const _human = {
    ...human,
    [key]: value,
    updatedAt
  }
  const index = _.findIndex(humans, { id });
  humans.splice(index, 1, _human);
  LocalStorage.setItem('humans', JSON.stringify(humans))
}


const addComment = (id, comment) => {
  let humans = LocalStorage.getItem('humans') || []
  const human = findItem(humans, id)
  const comments = human?.comments || []
  const date = moment().format('MM/DD/YYYY')
  const _comments = [...comments, { id: shortId.generate(), comment, createdAt: date }]
  const _human = {
    ...human,
    comments: _comments
  }
  const index = _.findIndex(humans, { id });
  humans.splice(index, 1, _human);
  LocalStorage.setItem('humans', JSON.stringify(humans))
}

const addEvent = (id, event) => {
  let humans = LocalStorage.getItem('humans') || []
  const human = findItem(humans, id)
  const events = human?.events || []
  const date = moment().format('MM/DD/YYYY')
  const _events = [...events, { ...event, id: shortId.generate(), createdAt: date }]
  const _human = {
    ...human,
    events: _events,
  }
  const index = _.findIndex(humans, { id });
  humans.splice(index, 1, _human);
  LocalStorage.setItem('humans', JSON.stringify(humans))
}

const updateEvent = (id, eId, title, date) => {
  let humans = LocalStorage.getItem('humans') || []
  const human = findItem(humans, id)
  let events = human?.events || []
  const event = findItem(events, eId)
  const _event = {
    ...event,
    title,
    date
  }
  const _index = _.findIndex(events, { id: eId });
  events.splice(_index, 1, _event);
  const _human = {
    ...human,
    events,
  }
  const index = _.findIndex(humans, { id });
  humans.splice(index, 1, _human);
  LocalStorage.setItem('humans', JSON.stringify(humans))
}

const deleteEvent = (id, eId) => {
  let humans = LocalStorage.getItem('humans') || []
  const human = findItem(humans, id)
  const events = human?.events || []
  const _events =  events.filter(e => e.id !== eId)
  const _human = {
    ...human,
    events: _events,
  }
  const index = _.findIndex(humans, { id });
  humans.splice(index, 1, _human);
  LocalStorage.setItem('humans', JSON.stringify(humans))
}

const updateComment = (id, cId, message) => {
  let humans = LocalStorage.getItem('humans') || []
  const human = findItem(humans, id)
  let comments = human?.comments || []
  const comment = findItem(comments, cId)
  const updatedAt = moment().format('MM/DD/YYYY')
  const _comment = {
    ...comment,
    comment: message,
    updatedAt
  }
  const _index = _.findIndex(comments, { id: cId });
  comments.splice(_index, 1, _comment);
  const _human = {
    ...human,
    comments,
  }
  const index = _.findIndex(humans, { id });
  humans.splice(index, 1, _human);
  LocalStorage.setItem('humans', JSON.stringify(humans))
}

const deleteComment = (id, cId) => {
  let humans = LocalStorage.getItem('humans') || []
  const human = findItem(humans, id)
  const comments = human?.comments || []
  const _comments =  comments.filter(e => e.id !== cId)
  const _human = {
    ...human,
    comments: _comments,
  }
  const index = _.findIndex(humans, { id });
  humans.splice(index, 1, _human);
  LocalStorage.setItem('humans', JSON.stringify(humans))
}

const deleteHuman = (id) => {
  let humans = LocalStorage.getItem('humans') || []
  const _humans =  humans.filter(h => h.id !== id)
  LocalStorage.setItem('humans', JSON.stringify(_humans))
}
export default {
  createHuman,
  getHumans,
  getHumanDetail,
  addComment,
  addEvent,
  updateEvent,
  deleteEvent,
  updateComment,
  deleteComment,
  updateHuman,
  deleteHuman
}