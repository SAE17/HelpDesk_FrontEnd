import React, { useState, useEffect, Fragment, useContext } from 'react'
import { Link } from 'react-router-dom'
import { BreadcrumbContext } from './../Breadcrumb/BreadcrumbContext'
import UsersTable from './UsersTable'
import { Button, Row } from 'antd'
import AddingUser from 'containers/User/AddingUser'

export default function Users() {
  const [users, setUsers] = useState([])
  const { changeItems } = useContext(BreadcrumbContext)
  const [visibleAddUser, setVisibleAddUser] = useState(false)
  const [disable, setDisable] = useState(true)

  useEffect(() => {
    changeItems([<Link to={`/`}>Helpdesk</Link>, 'Пользователи'])
    const role = JSON.parse(localStorage.getItem("authData")).role.id
    if ( role !== 1) {
      setDisable(true)
    } else {
      setDisable(false)
    }

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
  }, [visibleAddUser, changeItems, disable])
  const openAddUser = () => {
    setVisibleAddUser(true)
  }
  const closeAddUser = () => {
    setVisibleAddUser(false)
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
            style={{ marginBottom: '1em'}}
            onClick={openAddUser}
            type="primary"
            disabled={disable}
          >
            Добавить +
          </Button>
        </Row>
        <UsersTable users={users} closeAddUser={closeAddUser} isDisabled={disable}></UsersTable>
      </Fragment>
    )
}
