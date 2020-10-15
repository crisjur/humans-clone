import React, { useCallback, useEffect, useState } from 'react';
import { Modal, Button, Input } from 'antd';

import './App.scss';
import Header from './components/Header';
import RightContent from './components/RightContent';
import HumanList from './components/HumanList';
import api from './api/api';
import { useLocation } from 'react-router';

function App() {
  const location = useLocation()
  const [isShow, setIsShow] = useState(false)
  const [name, setName] = useState('')
  const [humans, setHumans] = useState([])

  const onToggleModal = useCallback(() => {
    setName('')
    setIsShow(value => !value)
  }, [setIsShow])

  const getHumans = useCallback(() => {
    setHumans(api.getHumans())
  }, [])

  const createHuman = useCallback(() => {
    if(name) {
      setIsShow(false)
      api.createHuman(name)
      getHumans()
    }
  }, [name, getHumans])

  //useEffect
  useEffect(() => {
    getHumans()
  }, [])

  //useEffect
  useEffect(() => {
    if (location.pathname === '/') {
      getHumans()
    }
  }, [location.pathname])
  return (
    <div className="container">
      <Header />
      <div className="content">
        <div className="layout-content">
          <div className="left-layout-content">
            <HumanList humans={humans} onToggleModal={onToggleModal} />
          </div>
          <div className="right-layout-content">
            <RightContent />
          </div>
        </div>
      </div>

      {/* Modal */}
      <Modal
          visible={isShow}
          title="New Human"
          onOk={createHuman}
          onCancel={onToggleModal}
          footer={[
            null,
            <Button key="submit" type="primary" onClick={createHuman}>
              Create
            </Button>,
          ]}
        >
          <p>Name</p>
          <Input size="large" placeholder="" value={name} onChange={e => setName(e.target.value)} />
        </Modal>
    </div>
  );
}

export default App;
