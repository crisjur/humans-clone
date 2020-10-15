import React from 'react'
import CommentItem from './CommentItem'

const Comments = ({ data, updateComment, deleteComment }) => {
  return (
    <div className="comments-wrap">
      {data.map(comment => <CommentItem data={comment} updateComment={updateComment} deleteComment={deleteComment} />)}
    </div>
  )
}

export default Comments