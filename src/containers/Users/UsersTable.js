import React from 'react'
import { Table } from 'antd'
// import ModalEdit from './ModalEdit'
// import checkAccess from '../../utils/auth'
// import users from '../TestJsons/users.json'
import { Link } from 'react-router-dom'

const columns = [
  {
    title: 'Логин',
    dataIndex: 'username',
    // render: text => <button className="link">{text}</button>,
    render: (text, record) => (
      <Link to={`/users/${record.id}/details`}>{text}</Link>
    ),
  },

  {
    title: 'Имя',
    dataIndex: 'first_name',
  },
  {
    title: 'Фамилия',
    dataIndex: 'last_name',
  },

  {
    title: 'Номер телефона',
    dataIndex: 'phone_number',
  },
  {
    title: 'Email',
    dataIndex: 'email',
  },
]

const showHeader = true
const footer = () => 'Here is footer'
const pagination = { position: 'none' }

export default class UsersTable extends React.Component {
  state = {
    bordered: false,
    loading: false,
    pagination,
    size: 'small',
    // size: 'midle',
    showHeader,
    footer,
    scroll: undefined,
  }
  render() {
    const { users } = this.props
    const pageSizeOptions = ['10', '100', '250', '500']
    return (
      <div>
        <Table
          {...this.state}
          columns={columns}
          bordered
          dataSource={users}
          rowKey="id"
          rowClassName="rows-color"
          // loading={isLoadingTable}
          footer={() => ''}
          pagination={{ showSizeChanger: true, pageSizeOptions, pageSize: 250 }}
        />
      </div>
    )
  }
}
