import React  from 'react'
import { Table, Tag } from 'antd'
import { Link } from 'react-router-dom'
import moment from 'moment'

const columns = [
    {
      title: 'ID',
      width: '50px',
      dataIndex: 'id',
      key: 'id',
      render: (text, record) => <Link to={`/ticket/${record.id}`}>{record.id}</Link>,
    },
    {
      title: 'Дата',
      width: '280px',
      dataIndex: 'created_at',
      key: 'created_at',
      responsive: ['md'],
      // render: text => <button className="link">{text}</button>,
      render: (text, record) => <span style={{width:'280px'}}>{moment(record.created_at).format('YYYY-MM-DD HH:MM:SS')}</span>,
    },
    {
      title: 'Оператор',
      width: '150px',
      dataIndex: 'operator',
      key: 'operator',
      render: (text, record) => <span>{record.operator.full_name}</span>,
    },
  
    {
      title: 'Категория',
      dataIndex: 'category',
      key: 'category',
      width: '50px',
      render: (text, record) => <span>{record.subkategoriia.category.title}</span>,
    },
    {
      title: 'Субкатегория',
      dataIndex: 'subkategoriia',
      key: 'subkategoriia',
      width: '200px',
      // render: text => <button className="link">{text}</button>,
      render: (text, record) => <span>{record.subkategoriia.title}</span>,
    },
    {
      title: 'Услуга',
      dataIndex: 'usluga',
      key: 'usluga',
      width:'100px',
      // render: text => <button className="link">{text}</button>,
      render: (text, record) => <span>{record.usluga.name}</span>,
    },
    {
      title: 'Правильный номер',
      dataIndex: 'pravilnyi_nomer',
      key: 'pravilnyi_nomer',
      width:'75px',
      align:'center',
      // render: text => <button className="link">{text}</button>,
      render: (text, record) => <span>{record.pravilnyi_nomer}</span>,
    },
    {
      title: 'Неправильный номер',
      dataIndex: 'nepravilnyi_nomer',
      key: 'nepravilnyi_nomer',
      width:'75px',
      align:'center',
      render: (text, record) => <span>{record.nepravilnyi_nomer}</span>,
    },
    {
      title: 'Терминал',
      dataIndex: 'nomer_terminala',
      key: 'nomer_terminala',
      width:'75px',
      align:'center',
      // render: text => <button className="link">{text}</button>,
      render: (text, record) => <span>{record.nomer_terminala}</span>,
    },
    {
      title: 'Проведено',
      dataIndex: 'provedeno',
      key: 'provedeno',
      width:'30px',
      align:'center',
      // render: text => <button className="link">{text}</button>,
      render: (text, record) => <span>{record.provedeno}</span>,
    },
    {
      title: 'Отменено',
      dataIndex: 'summa_otmeny',
      key: 'summa_otmeny',
      width:'30px',
      align:'center',
      // render: text => <button className="link">{text}</button>,
      render: (text, record) => <span>{record.summa_otmeny}</span>,
    },
    {
      title: 'Абонент',
      dataIndex: 'nomer_abonenta',
      key: 'nomer_abonenta',
      width:'75px',
      align:'center',
      // render: text => <button className="link">{text}</button>,
      render: (text, record) => <span>{record.nomer_abonenta}</span>,
    },
    {
      title: 'Статус',
      dataIndex: 'status',
      key: 'status',
      width:'75px',
      align:'center',
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
]

export default class CallsTable extends React.Component{
    state = {
        bordered: true,
        loading: false,
        size: 'middle',
        ellipsis: true,
        // size: 'midle',
    }
    render() {
        const {
          issues, 
          changePageHandler,
          changePageSizeHandler,
          pageSize,
        } = this.props 
        const pageSizeOptions = ['10', '100', '250', '500']
        return (   
          <div>
            <Table
              {...this.state}
              columns={columns}
              dataSource={issues}
              rowKey="id"
              footer={() => ''}
              pagination={{
                pageSizeOptions: pageSizeOptions, 
                showSizeChanger:true,
                pageSize:pageSize,
                onChange: changePageHandler,
                onShowSizeChange: changePageSizeHandler,
              }}
            />
          </div>
        )
    }
}