import React from 'react'
import clsx from 'clsx';

const HumanListItem = ({ name, active, onClick}) => {
  return (
    <div className={clsx("human-item", active && "human-item-selected")} onClick={onClick}>
      {name || 'No name'}
    </div>
  )
}

export default HumanListItem