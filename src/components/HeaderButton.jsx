import React from 'react'

const HeaderButton = ({ label, className, active, onClick}) => {
  return (
    <div className={`nav-btn-container ${className} ${active ? 'active' : 'inactive'}`} onClick={onClick}>{label}</div>
  )
}

export default HeaderButton