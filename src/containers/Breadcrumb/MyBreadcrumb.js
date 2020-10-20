import React, { Component } from 'react'
import { Breadcrumb } from 'antd'
import { BreadcrumbConsumer } from './BreadcrumbContext'

class MyBreadcrumb extends Component {
  render() {
    return (
      <BreadcrumbConsumer>
        {({ items }) => (
          <Breadcrumb style={{ margin: '16px 0' }}>
            {items.map(item => (
              <Breadcrumb.Item key={item}>{item}</Breadcrumb.Item>
            ))}
          </Breadcrumb>
        )}
      </BreadcrumbConsumer>
    )
  }
}

export default MyBreadcrumb
