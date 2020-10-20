import React, { useState, useEffect, Fragment, useContext } from 'react'
import { Link } from 'react-router-dom'
import { BreadcrumbContext } from './../Breadcrumb/BreadcrumbContext'
import { Button, Row, Avatar } from 'antd'
import AddingUser from 'containers/User/AddingUser'
import { UserOutlined } from '@ant-design/icons'
export default function User() {
  const { contextType, changeItems } = useContext(BreadcrumbContext)
  useEffect(() => {
    changeItems([
      <Link to={`/`}>Helpdesk</Link>,
      <Link to={`/users`}>Пользователи</Link>,
      `id`,
    ])
  }, [])
  return (
    <Fragment>
      <div>
        <Avatar
          size={64}
          style={{ backgroundColor: '#87d068' }}
          icon={<UserOutlined />}
        />
        Name Lastname
      </div>
    </Fragment>
  )
}
