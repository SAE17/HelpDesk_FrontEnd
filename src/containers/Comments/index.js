import React from 'react'

import { Comment, Tooltip, List } from 'antd'
import moment from 'moment'
// import comments from '../TestJsons/comments.json'

const Comments = ({ ...props }) => {
  const comments = props.comments
  return (
    <List
      className="comment-list"
      header={`${comments.length} replies`}
      itemLayout="horizontal"
      dataSource={comments}
      renderItem={item => (
        <li>
          <Comment
            actions={<span key="comment-list-reply-to-0">Reply to</span>}
            author={
              <span>
                {item.created_by.first_name} {item.created_by.last_name}
              </span>
            }
            // avatar={item.avatar}
            avatar="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            content={item.message}
            datetime={
              <Tooltip
                title={moment(item.created_at).format('YYYY-MM-DD HH:mm:ss')}
              >
                <span>{moment(item.created_at).fromNow()}</span>
              </Tooltip>
            }
          />
        </li>
      )}
    />
  )
}
export default Comments
