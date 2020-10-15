import React, { useCallback, useState, useMemo, useEffect } from 'react'
import { Modal, Button, Input, Menu, Dropdown } from 'antd';
import { MessageOutlined, EllipsisOutlined } from '@ant-design/icons';

const { TextArea } = Input;

const CommentItem = ({ data, updateComment, deleteComment }) => {
  const { comment, createdAt, id } = data
  const [isShow, setIsShow] = useState(false)
  const [_comment, _setComment] = useState(comment)
  
  const onToggleModal = useCallback(() => {
    setIsShow(value => !value)
  }, [setIsShow])

  const onClickMenu = useCallback(({ key }) => {
    if (key == '0') {
      setIsShow(value => !value)
    } else {
      deleteComment(id)
    }
  }, [id, setIsShow])

  const _updateComment = useCallback(() => {
    if(_comment) {
      setIsShow(false)
      updateComment(id, _comment)
    }
  }, [id, _comment])

  //useEffect
  useEffect(() => {
    _setComment(comment)
  }, [comment])

  const menu = useMemo(() =>
    <Menu onClick={onClickMenu}>
      <Menu.Item key="0">
        <div>Edit</div>
      </Menu.Item>
      <Menu.Item key="1">
        <div>Remove</div>
      </Menu.Item>
    </Menu>
  ,[]);

  return (
    <div className="event-item">
      <div className="d-flex flex-row">
        <MessageOutlined className="calendar-icon" />
        <span className="event-title">{comment}</span>
      </div>
      <div className="d-flex flex-column">
        <Dropdown overlay={menu} trigger={['click']}>
          <EllipsisOutlined className="menu-icon text-right" />
        </Dropdown>
        <span className="event-date">{createdAt}</span>
      </div>
       {/* Modal */}
       <Modal
          visible={isShow}
          title="Update Comment"
          onOk={_updateComment}
          onCancel={onToggleModal}
          footer={[
            null,
            <Button type="primary" onClick={_updateComment}>
              Save
            </Button>,
          ]}
        >
          <TextArea rows={6} className="comment-textarea" value={_comment} onChange={e => _setComment(e.target.value)} />
        </Modal>
    </div>
  )
}

export default CommentItem