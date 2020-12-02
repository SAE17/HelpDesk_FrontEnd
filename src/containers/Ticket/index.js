import React, { useEffect, useContext } from 'react'
import { Form, Divider, Row, Col, Typography, Select, message } from 'antd'
import Activity from './Activity'
import moment from 'moment'
import { BreadcrumbContext } from '../Breadcrumb/BreadcrumbContext'
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios'

const { Option } = Select
const { Title } = Typography
export default function Ticket({ ...props }) {
  let history = useHistory()
  var disable = false
  const id = props.match.params.id
  const { changeItems } = useContext(BreadcrumbContext)

  const [issue, setIssue] = React.useState([])
  const [statuses, setStatuses] = React.useState([])
  const [status, setStatus] = React.useState('')

  const [title, setTitle] = React.useState('')

  const [assignees, setAssignees] = React.useState([])
  const [assign, selectAssign] = React.useState('')


  const handleChangheStatus = value => {
    setStatus(value)
    axios({
      method: 'patch',
      url: `/api/1.0/issues/${id}`,
      data: {
        op: 'replace',
        path: 'status',
        value: value,
      },
    })
      .then(response => {
        console.log('response:', response.data)
        response.data.issue && setIssue(response.data.issue)
        message.success({ content: 'Статус изменен успешно', duration: 1 })
      })

      .catch(err => {
        console.log(err)
        if (err.response && err.response.status === 401) {
          localStorage.removeItem('isLoggedIn', false)
          localStorage.removeItem('authData')
          history.push('/signin')
        }
      })
  }
  const handleChangheAssign = value => {
    selectAssign(value)
    axios({
      method: 'patch',
      url: `/api/1.0/issues/${id}/assignees`,
      data: {
        op: 'replace',
        path: 'status',
        value: value,
      },
    })
      .then(response => {
        console.log('response:', response.data)
        response.data.issue && setIssue(response.data.issue)
        message.success({ content: 'Исполнитель изменен успешно', duration: 1 })
      })

      .catch(err => {
        console.log(err)
        if (err.response && err.response.status === 401) {
          localStorage.removeItem('isLoggedIn', false)
          localStorage.removeItem('authData')
          history.push('/signin')
        }
      })
  }
  const formItemLayout = {
    labelCol: {
      span: 6,
    },
    wrapperCol: {
      span: 14,
    },
  }
  useEffect(() => {
    changeItems([
      <Link to={`/`}>Helpdesk</Link>,
      <Link to={'/tickets'}>Заявки</Link>,
      `${id} ${title}`,
    ])
    const getStatuses = () => {
      axios({
        method: 'get',
        url: `/api/1.0/statuses`,
      })
        .then(response => {
          console.log('response.data:', response.data)
          if (response.data) {
            response.data.statuses && setStatuses(response.data.statuses)
          }

        })
        .catch(err => {
          console.log(err)
          if (err.response.status === 401) {
            localStorage.removeItem('isLoggedIn', false)
            localStorage.removeItem('authData')
            history.push('/signin')
          }
        })
    }
    const getAssignees = () => {
      axios({
        method: 'get',
        url: `/api/1.0/users`,
      })
        .then(response => {
          console.log('response.data:', response.data)
          if (response.data) {
            response.data.users && setAssignees(response.data.users)
          }
        })
        .catch(err => {
          console.log(err)
          if (err.response.status === 401) {
            localStorage.removeItem('isLoggedIn', false)
            localStorage.removeItem('authData')
            history.push('/signin')
          }
        })
    }
    const getIssue = () => {
      axios({
        method: 'get',
        url: `/api/1.0/issues/${id}`,
      })
        .then(response => {
          console.log('response:', response.data)
          if (response.data) {
            response.data.issue && setIssue(response.data.issue)
            response.data.issue && setTitle(response.data.issue.title)
            response.data.issue.status &&
              setStatus(response.data.issue.status.id)
            response.data.issue.assignees && selectAssign(response.data.issue.assignees[0].id)
            if (response.data.issue.assignees === undefined) {

            }
          }
        })
        .catch(err => {
          console.log(err)
          if (err.response && err.response.status === 401) {
            localStorage.removeItem('isLoggedIn', false)
            localStorage.removeItem('authData')
            history.push('/signin')
          }
        })
    }
    getStatuses()
    getIssue()
    getAssignees()
  }, [changeItems, history, id, title]);

  const role = JSON.parse(localStorage.getItem("authData")).role.id
  if (role !== 1 && status === 6) {
    disable = true
  } else {
    disable = false
  }
  return (
    <div>

      <Row>
        <Col span={12}>
          <Title level={4}>{issue && issue.title} </Title>
        </Col>
        <Col span={2} offset={10}>
        </Col>
      </Row>
      <Row>
        <Col span={16}>
          <Divider orientation="left">Подробности</Divider>
          <Row>
            <Col span={12}>
              <Form {...formItemLayout}>
                <Form.Item label="Тип" colon={false} style={{ margin: 0 }}>
                  {issue.type && issue.type.title}
                </Form.Item>
                <Form.Item label="Приоритет" style={{ margin: 0 }}>
                  {issue.priority && issue.priority.id}
                </Form.Item>
                <Form.Item label="Статус" style={{ margin: 0 }}>
                  {/* {issue.status && issue.status.title} */}
                  <Select
                    onChange={handleChangheStatus}
                    value={status}
                    disabled={disable}
                  >
                    {statuses.map(option => (
                      <Option key={option.id} value={option.id}>
                        {option.title}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Form>
            </Col>
            <Col span={12}>
              <Form>
                {issue.claims &&
                  issue.claims.map(claim => (
                    <Form.Item
                      label={claim.name}
                      key={claim.name}
                      style={{ margin: 0 }}
                    >
                      {claim.value}
                    </Form.Item>
                  ))}
              </Form>
            </Col>
          </Row>

          <Divider orientation="left">Описание</Divider>

          <Form>{issue && issue.description}</Form>

          <Divider orientation="left">Действия</Divider>
          <Activity id={id}></Activity>
        </Col>

        <Col span={7} offset={1}>
          <Divider orientation="left">Люди</Divider>

          <Form>
            <Form.Item label="Создан" style={{ margin: 0 }}>
              {issue.reported_by && issue.reported_by.first_name}{' '}
              {issue.reported_by && issue.reported_by.last_name}
            </Form.Item>
            <Form.Item label="Исполнители" style={{ margin: 0, width: '400px' }}>
              <Select
                value={assign}
                onChange={handleChangheAssign}
                disabled={disable}
                style={{ width: '300px' }}
              >
                {assignees.map(assign => (
                  <Option key={`${assign.id}`} value={assign.id}>
                    {assign.first_name} {assign.last_name}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item label="Создано" style={{ margin: 0 }}>
              {moment(issue.created_at).format('DD.MM.YYYY HH:mm')}
            </Form.Item>
            <Form.Item label="Обновлено" style={{ margin: 0 }}>
              {moment(issue.updated_at).format('DD.MM.YYYY HH:mm')}
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  )
}
