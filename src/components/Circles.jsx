import React, { useState, useCallback } from 'react'
import { Modal, Button, Input } from 'antd';

const Circles = ({ data }) => {
  const [isShow, setIsShow] = useState(false)
  
  const onToggleModal = useCallback(() => {
    setIsShow(value => !value)
  }, [setIsShow])

  return (
    <div className="d-flex flex-row mt-4">
      <span>Circles:</span>
      <Button type="primary" size="small" className="ml-2" onClick={onToggleModal}>+</Button>
      {/* Modal */}
      <Modal
          visible={isShow}
          title={`Edit ${data.name}'s circles`}
          onOk={onToggleModal}
          onCancel={onToggleModal}
          footer={null}
        >
          <Input size="large" placeholder="" />
        </Modal>
    </div>
  )
}

export default Circles