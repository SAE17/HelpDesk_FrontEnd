import React, { Fragment } from 'react'
import { Tabs } from 'antd'
import AddComment from 'containers/Comments/AddComment'
import History from 'containers/History'

const { TabPane } = Tabs
function callback(key) {
  console.log(key)
}
export default function Activity({ ...props }) {
  return (
    <Fragment>
      <Tabs defaultActiveKey="2" onChange={callback}>
        <TabPane tab="Все" key="1" disabled>
          Content of Tab Pane 1
        </TabPane>
        <TabPane tab="Коментарии" key="2">
          <AddComment id={props.id}></AddComment>
        </TabPane>
        <TabPane tab="Другое" key="3">
          <History id={props.id}/>
        </TabPane>
      </Tabs>
    </Fragment>
  )
}
