import React, { Fragment, useState, useEffect } from 'react'
import { Modal, Button, Input, Form, Select } from 'antd'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
const { Option } = Select
export default function AddingUser({ visible, ...props }) {
  let history = useHistory()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [first_name, setFirstName] = useState('')
  const [last_name, setLastName] = useState('')
  const [phone_number, setPhoneNumber] = useState('')
  const [email, setEmail] = useState('')
  const [groups, setGroups] = useState([])
  const [groupsList, setGroupsList] = useState([])

  const [isLoadingOk, setIsLoadingOk] = useState(false)

  const formItemLayout = {
    labelCol: {
      xs: { span: 10 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 14 },
      sm: { span: 14 },
    },
  }
  useEffect(() => {
    const getGroups = () => {
      axios({
        method: 'get',
        url: `api/1.0/groups`,
      })
        .then((response) => {
          console.log('response:', response.data)
          if (response.data) {
            response.data.groups && setGroupsList(response.data.groups)
          }
        })
        .catch((err) => {
          console.log(err)
          if (err.response && err.response.status === 401) {
            localStorage.removeItem('isLoggedIn', false)
            localStorage.removeItem('authData')
            history.push('/signin')
          }
        })
    };
    getGroups()
  }, [history])
  const handleAddUser = () => {
    setIsLoadingOk(true)
    axios({
      method: 'post',
      url: 'api/1.0/users',

      data: {
        username,
        password,
        first_name,
        last_name,
        phone_number,
        email,
        groups,
      },
    })
      .then((response) => {
        setIsLoadingOk(false)
        props.closeAddUser()
        // console.log(props.history.push(`/users`))
      })
      .catch((err) => {
        setIsLoadingOk(false)
        console.log(err)
      })
  }
  return (
    <Fragment>
      <Modal
        title="Добавление пользователя"
        centered
        visible={visible}
        onOk={() => props.closeAddUser()}
        onCancel={() => props.closeAddUser()}
        style={{ width: '400px' }}
        footer={[
          <Button key="back" onClick={() => props.closeAddAgent()}>
            Отмена
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={handleAddUser}
            loading={isLoadingOk}
            disabled={
              username === '' ||
              username === null ||
              password === null ||
              password === ''
            }
          >
            Создать
          </Button>,
        ]}
      >
        <Form {...formItemLayout}>
          <Form.Item label="Логин" style={{ margin: '0.5em' }}>
            <Input
              name="title_add"
              placeholder=""
              onChange={(e) => setUsername(e.currentTarget.value)}
            />
          </Form.Item>
          <Form.Item label="Имя" style={{ margin: '0.5em' }}>
            <Input
              //   name="title_add"
              placeholder=""
              onChange={(e) => setFirstName(e.currentTarget.value)}
            />
          </Form.Item>
          <Form.Item label="Фамилия" style={{ margin: '0.5em' }}>
            <Input
              //   name="title_add"
              placeholder=""
              onChange={(e) => setLastName(e.currentTarget.value)}
            />
          </Form.Item>
          <Form.Item label="Группы" style={{ margin: '0.5em' }}>
            <Select
              mode="multiple"
              style={{ width: '100%' }}
              // placeholder="Please select"
              // defaultValue={['']}
              onChange={(value) => setGroups(value)}
            >
              {groupsList.map((groupsList) => (
                <Option key={groupsList.id} value={groupsList.id}>
                  {groupsList.title}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Email" style={{ margin: '0.5em' }}>
            <Input
              //   name="title_add"
              placeholder=""
              onChange={(e) => setEmail(e.currentTarget.value)}
            />
          </Form.Item>
          <Form.Item label="Номер телефона" style={{ margin: '0.5em' }}>
            <Input
              //   name="title_add"
              placeholder=""
              onChange={(e) => setPhoneNumber(e.currentTarget.value)}
            />
          </Form.Item>
          <Form.Item label="Пароль" style={{ margin: '0.5em' }}>
            <Input.Password
              name="password"
              onChange={(e) => setPassword(e.currentTarget.value)}
            />
          </Form.Item>
        </Form>
      </Modal>
    </Fragment>
  )
}
