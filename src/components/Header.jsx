import React, { useCallback } from 'react'
import { useHistory } from 'react-router'
import HeaderButton from './HeaderButton'

const Header = () => {
  const history = useHistory();

  const onTapNavMenu = useCallback((path) => {
    history.push(path)
  }, [history])
  return (
    <div className="header">
        <div className="header-container">
          <div className="nav-side">
            <div className="logo">humans.io</div>
            <HeaderButton label="Notes" className="mr-3" active onClick={() => onTapNavMenu('/')} />
            <HeaderButton label="Timeline" className="mr-3" />
            <HeaderButton label="Circles" />
          </div>
          <div className="nav-side">
            <HeaderButton label="Settings" />
            <HeaderButton label="Help" className="ml-3" />
            <HeaderButton label="Sign out" className="ml-3" />
          </div>
        </div>
      </div>
  )
}

export default Header