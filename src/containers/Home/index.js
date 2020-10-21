import React, { useContext, useEffect, useState } from 'react'
import { BreadcrumbContext } from './../Breadcrumb/BreadcrumbContext'
import {
  Row,
  Col,
  List,
  Card,
  Tag,
  Tooltip,
} from 'antd'
import axios from 'axios'
import { Link, useHistory } from 'react-router-dom'
import AssignedToMeTable from './AssignedToMeTable'
import ReportedByMeTable from './ReportedByMeTable'
// import activities from '../TestJsons/activities.json'
import moment from 'moment'

export default function Home({ ...props }) {
  const { changeItems } = useContext(BreadcrumbContext)
  let history = useHistory()
  const [activities, setActivities] = useState([])
  const [reportedByMe, setReportedByMe] = useState([])
  const [assignedToMe, setAssignedToMe] = useState([])

  useEffect(() => {
    changeItems([<Link to={`/`}>Helpdesk</Link>])
    const getActivities = () => {
      axios({
        method: 'get',
        url: `/api/1.0/activities`,
      })
        .then((response) => {
          console.log('response:', response.data)
          if (response.data) {
            response.data.activities && setActivities(response.data.activities)
          }
        })
        .catch((err) => {
          console.log(err)
          if (err.response && err.response.status === 401) {
            localStorage.removeItem('isLoggedIn', false)
            history.push('/signin')
          }
        })
    }
    const getAssignedToMe = () => {
      axios({
        method: 'get',
        url: `api/1.0/user_issues?type=1`,
      })
        .then((response) => {
          console.log('response:', response.data)
          if (response.data) {
            response.data.issues && setAssignedToMe(response.data.issues)
          }
        })
        .catch((err) => {
          console.log(err)
          if (err.response && err.response.status === 401) {
            localStorage.removeItem('isLoggedIn', false)
            history.push('/signin')
          }
        })
    }
    const getReportedByMe = () => {
      axios({
        method: 'get',
        url: `api/1.0/user_issues?type=2`,
      })
        .then((response) => {
          console.log('response:', response.data)
          if (response.data) {
            response.data.issues && setReportedByMe(response.data.issues)
          }
        })
        .catch((err) => {
          console.log(err)
          if (err.response && err.response.status === 401) {
            localStorage.removeItem('isLoggedIn', false)
            history.push('/signin')
          }
        })
    }
    getReportedByMe()
    getAssignedToMe()
    getActivities()
  }, [changeItems, history])

  // const columns = [{ title: 'title', dataIndex: 'title', key: 'title' }]
  return (
    <div>
      <Row>
        <Col span={12}>
          <List
            header={
              <div>
                <h1>Activity stream</h1>
              </div>
            }
            bordered={true}
            itemLayout="vertical"
            dataSource={activities}
            renderItem={(item) => (
              <List.Item
                key={item.id}
                actions={[
                  <Tooltip
                    title={moment(item.created_at).format(
                      'YYYY-MM-DD HH:mm:ss',
                    )}
                  >
                    <span>{moment(item.created_at).fromNow()}</span>
                  </Tooltip>,
                ]}
              >
                <List.Item.Meta
                  // avatar={<Avatar src="" />}
                  // title={}
                  description={
                    <div>
                      Пользователь{' '}
                      <Link to={`/users/${item.created_by.id}/details`}>
                        {item.created_by && item.created_by.first_name}{' '}
                        {item.created_by && item.created_by.last_name}
                      </Link>{' '}
                      внёс изменения в <Link>тикет {item.issue_id}</Link>
                    </div>
                  }
                />
                <Tag> {item.original_value}</Tag> →{'  '}
                <Tag>{item.new_value}</Tag>
              </List.Item>
            )}
          />
        </Col>
        <Col span={11} offset={1}>
          <Card title="Assigned to me" style={{ marginBottom: '1em' }}>
            {/* <Table bordered columns="" dataSource="" /> */}
            <AssignedToMeTable issues={assignedToMe}></AssignedToMeTable>
          </Card>
          <Card title="Reported by me">
            <ReportedByMeTable issues={reportedByMe}></ReportedByMeTable>
          </Card>
        </Col>
      </Row>
    </div>
  )
}
