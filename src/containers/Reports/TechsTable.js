import React from 'react'
import { Table } from 'antd'


const columns = [
  {
    title: 'Мастер',
    dataIndex: 'full_name',
  },
  {
    title: 'Количество заявок',
    dataIndex: 'issue_quantity',
  },
  {
    title: 'Количество заявок, %',
    dataIndex: 'issue_quantity_percent',
  },

  {
    title: 'Количество баллов',
    dataIndex: 'issue_scores',
  },
  {
    title: 'Количество баллов, %',
    dataIndex: 'issue_percent_score',
  },
  {
    title: 'Сумма',
    dataIndex: 'salary',
  },
]

const showHeader = true
const footer = () => 'Here is footer'
const pagination = { position: 'none' }

export default class TechsTable extends React.Component {
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
