import React from 'react'
import { Table } from 'antd'
// import issues from '../TestJsons/issues.json'
import { Link } from 'react-router-dom'

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    // render: text => <button className="link">{text}</button>,
    render: (text, record) => <Link to={`/ticket/${record.id}`}>{text}</Link>,
  },
  {
    title: 'П',
    width: '40px',
    dataIndex: 'priority',
    // render: text => <button className="link">{text}</button>,
    render: (text, record) => <span>{record.priority.id}</span>,
  },
  {
    title: 'Название',
    dataIndex: 'title',
    render: (text, record) => <Link to={`/ticket/${record.id}`}>{text}</Link>,
  },

  {
    title: 'Тип',
    dataIndex: 'type',
    // render: text => <button className="link">{text}</button>,
    render: (text, record) => <span>{record.type.title}</span>,
  },
]

const showHeader = true
const footer = () => 'Here is footer'
const pagination = { position: 'none' }

export default class ReportedByMeTable extends React.Component {
  state = {
    bordered: true,
    loading: false,
    pagination,
    size: 'small',
    // size: 'midle',
    showHeader,
    footer,
    scroll: undefined,
  }
  render() {
    const { issues } = this.props
    const pageSizeOptions = ['10', '100', '250', '500']
    return (
      <div>
        <Table
          {...this.state}
          columns={columns}
          bordered
          dataSource={issues}
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
