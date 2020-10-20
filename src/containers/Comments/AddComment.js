import React, { useEffect } from 'react'
// import comments from '../TestJsons/comments.json'
import axios from 'axios'

import { Comment, Avatar, Form, Button, List, Input } from 'antd'
import moment from 'moment'
import Comments from './index.js'

const { TextArea } = Input

const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <div>
    <Form.Item>
      <TextArea rows={4} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button
        htmlType="submit"
        loading={submitting}
        onClick={onSubmit}
        type="primary"
      >
        Add Comment
      </Button>
    </Form.Item>
  </div>
)

export default function AddComment({ ...props }) {
  const [comments, setComments] = React.useState([])
  const id = props.id
  const [submitting, setSubmitting] = React.useState(false)
  const [value, setValue] = React.useState('')

  useEffect(() => {
    const getComments = () => {
      fetch(`/api/1.0/issues/${id}/comments`)
        .then(res => res.json())
        .then(data => {
          data.comments && setComments(data.comments)
        })
        .catch(err => {
          console.log(err)
        })
    }
    getComments()
  }, [])

  const handleSubmit = () => {
    if (!value) {
      return
    }
    setSubmitting(true)

    setTimeout(() => {
      setSubmitting(false)
      setValue('')
      handleAddComment()

      setComments([
        ...comments,
        {
          id: 'b70e3994-f952-48b3-abca-ec380a964626',
          message: <p>{value}</p>,
          created_at: moment(),
          updated_at: moment(),
          created_by: {
            id: 'f20ce3b0-2a77-4d6e-84e0-4cbb796fd511',
            first_name: 'Вы',
            last_name: ' ',
          },
        },
      ])
    }, 1000)
  }
  const handleAddComment = () => {
    axios({
      method: 'post',
      url: `/api/1.0/issues/${id}/comments`,
      data: {
        message: value,
      },
    })
      .then(response => {
        response.comment && setComments([...comments, response.comment])
        console.log('ok')
      })

      .catch(err => {
        console.log(err)
      })
  }
  const handleChange = e => {
    setValue(e.target.value)
  }

  return (
    <div>
      {comments.length > 0 && <Comments comments={comments}></Comments>}

      <Comment
        avatar={
          <Avatar
            // src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            alt="Han Solo"
          />
        }
        content={
          <Editor
            onChange={handleChange}
            onSubmit={handleSubmit}
            submitting={submitting}
            value={value}
          />
        }
      />
    </div>
  )
}
