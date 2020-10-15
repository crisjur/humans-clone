import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Button, Input } from 'antd';
import HumanListItem from './HumanListItem';
import { useHistory, useLocation } from 'react-router';

const HumanList = ({ humans, onToggleModal }) => {
  const history = useHistory()
  const location = useLocation()
  const [hId, setHId] = useState('')
  const [search, setSearch] = useState('')
  
  const onSelectHuman = useCallback(id => {
    setHId(id)
    history.push(`/${id}`)
  }, [history])

  useEffect(() => {
    if(location.pathname === '/') {
      setHId('')
    }
  }, [location.pathname])
  const _humans = useMemo(() => {
    if (!search) return humans
    return humans.filter(h => h.name.toLowerCase().includes(search.toLowerCase()))
  }, [search, humans])
  return (
    <div className="human-list">
      <Input
        size="large"
        placeholder="Search..."
        className="search-input"
        value={search}
        onChange={e => setSearch(e.target.value)} />
      <Button type="primary" block onClick={onToggleModal}>New Human</Button>
      {_humans.map(h => <HumanListItem name={h.name} active={hId === h.id} onClick={() => onSelectHuman(h.id)}/>)}
    </div>
  )
}

export default HumanList