import React from 'react'
import Event from './Event'

const Events = ({ data, updateEvent, deleteEvent }) => {
  return (
    <div className="events-wrap">
      {data.map(event => <Event data={event} updateEvent={updateEvent} deleteEvent={deleteEvent} />)}
    </div>
  )
}

export default Events