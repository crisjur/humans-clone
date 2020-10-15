import React, { useCallback, useState } from 'react'
import { Button, Input } from 'antd';

const { TextArea } = Input;

const Comment = ({ onComment }) => {
  const [comment, setComment] = useState('')

  const onClick = useCallback(() => {
    if (comment) {
      onComment(comment)
      setComment('')
    }
  }, [comment])
  return (
    <div className="comment-wrap">
      <TextArea rows={6} className="comment-textarea" value={comment} onChange={e => setComment(e.target.value)} />
      <div className="w-100 d-flex flex-row justify-between">
        <div/>
        <Button type="primary" className="mt-2 float-right" onClick={onClick}>Comment</Button>
      </div>
    </div>
  )
}

export default Comment