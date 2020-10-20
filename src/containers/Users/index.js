import React, { useState, useEffect, Fragment, useContext } from 'react'
import { Link } from 'react-router-dom'
import { BreadcrumbContext } from './../Breadcrumb/BreadcrumbContext'
import UsersTable from './UsersTable'
import { Button, Row } from 'antd'
import AddingUser from 'containers/User/AddingUser'

export default function Users() {
  const [users, setUsers] = useState([])
  const { contextType, changeItems } = useContext(BreadcrumbContext)
  const [visibleAddUser, setVisibleAddUser] = useState(false)
  useEffect(() => {
    changeItems([<Link to={`/`}>Helpdesk</Link>, 'Пользователи'])

    const getUsers = () => {
      fetch(`/api/1.0/users`)
        .then((res) => res.json())
        .then((data) => {
          Array.isArray(data.users)
            ? setUsers(data.users)
            : console.log('error')
        })
        .catch((err) => {
          console.log(err)
        })
    }
    getUsers()
  }, [visibleAddUser])
  const openAddUser = () => {
    setVisibleAddUser(true)
    console.log('visibleAddUser:', visibleAddUser)
  }
  const closeAddUser = () => {
    setVisibleAddUser(false)
    console.log('visibleAddUser:', visibleAddUser)
  }
  return (
    <Fragment>
      <AddingUser
        visible={visibleAddUser}
        closeAddUser={closeAddUser}
      ></AddingUser>
      <Row style={{ justifyContent: 'flex-end' }}>
        {' '}
        <Button
          style={{ marginBottom: '1em' }}
          onClick={openAddUser}
          type="primary"
        >
          Добавить +
        </Button>
      </Row>
      <UsersTable users={users} closeAddUser={closeAddUser}></UsersTable>
    </Fragment>
  )
}
