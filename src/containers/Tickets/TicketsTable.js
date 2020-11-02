import React from 'react'
import { Table, Tag } from 'antd'
// import issues from '../TestJsons/issues.json'
import { Link } from 'react-router-dom'
import moment from 'moment'

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
  {
    title: 'Статус',
    dataIndex: 'status',
    // render: text => <button className="link">{text}</button>,
    render: (text, record) => {
      let color = record.status.id===2 ? '#87d068' : '#CEFF86';
      if(record.status.id === 3) {
        color = '#2db7f5'
      } else if (record.status.id === 4) {
        color = '#FDCA02'
      } else if (record.status.id === 6) {
        color = '#ff0000'
      }
      return(
        <Tag color={color} key={record.status.id}>
          <div>{record.status.title.toUpperCase()}</div>
        </Tag>
      )
    },
  },
  {
    title: 'Исполнители',
    dataIndex: 'assignees',
    render: (text, record) => {
      return (
        record.assignees &&
        record.assignees.map(item => (
          <span>
            <Tag>
              {item && item.first_name} {item && item.last_name}
            </Tag>
          </span>
        ))
      )
    },
  },
  {
    title: 'Создано',
    dataIndex: 'created_at',
    render: (text, record) => (
      <span>
        <div>
          {record.reported_by && record.reported_by.first_name}{' '}
          {record.reported_by && record.reported_by.last_name}
        </div>
        {moment(text).format('DD.MM.YYYY ')}
      </span>
    ),
  },
]

const showHeader = true
const footer = () => 'Here is footer'


export default class TicketsTable extends React.Component {
  state = {
    bordered: false,
    loading: false,
    size: 'small',
    // size: 'midle',
    showHeader,
    footer,
  }
  render() {
    const { 
      issues,
      changePageHandler,
      changePageSizeHandler,
      pageSize
    } = this.props
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
          // loading={isLoaчdingTable}
          footer={() => ''}
          pagination={{ showSizeChanger: true, pageSizeOptions:pageSizeOptions , 
                        pageSize: pageSize, onChange: changePageHandler,
                        onShowSizeChange: changePageSizeHandler,
                      }}
        />
       
      </div>
    )
  }
}
