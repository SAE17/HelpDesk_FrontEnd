import React, { useEffect } from 'react'
import { Form, DatePicker, Select, Col, Row, Button, Input, Tag, Icon, Menu, Dropdown,  } from 'antd'
import { DownloadOutlined,DownOutlined } from '@ant-design/icons';
const Option = Select.Option
const { OptGroup } = Select
const { RangePicker } = DatePicker





export default function Filters({ ...props }) {
  const {
    period,
    priorities,
    types,
    users,
    statuses,
    reported_by,
    assigned_to,
    status,
    priority,
    type,
  } = props
  const formItemLayout = {
    labelCol: {
      xs: { span: 12 },
      sm: { span: 5 },
    },
    wrapperCol: {
      xs: { span: 12 },
      sm: { span: 12 },
    },
  }

  const menuDownloadReport = (
    <Menu onClick={props.handleMenuClick}>
      <Menu.Item key="TotalReport" >
        Общий отчет
      </Menu.Item>
      <Menu.Item key="TechReport">
        Отчет техников
      </Menu.Item>
      <Menu.Item key="PaymentReport">
        Отчет платежей
      </Menu.Item>
    </Menu>
  );
  


  return (
    <div>
      <Form {...formItemLayout}>
        <Row>
          <Col span={12}>
            <Form.Item label="Интервал" style={{ marginBottom: '15px' }}>
              <Select
                placeholder="Выберите интервал"
                value={period}
                onChange={props.handleChangePeriod}
                style={{ width: 300 }}
                defaultValue="undefine"
              >
                <Option value="undefine">--Не определен--</Option>
                <OptGroup label="Дни">
                  <Option value="Today">За сегодня</Option>
                  <Option value="Yesterday">За вчера</Option>
                </OptGroup>
                <OptGroup label="Недели">
                  <Option value="Last7days">За последние 7 дней</Option>
                  <Option value="6">За текущую неделю</Option>
                  <Option value="7">За прошлую неделю</Option>
                </OptGroup>
                <OptGroup label="Месяцы">
                  <Option value="Last30days">За последние 30 дней</Option>
                  <Option value="9">За текущий месяц</Option>
                  <Option value="10">За прошлый месяц</Option>
                  <Option value="11">С начала года</Option>
                </OptGroup>
              </Select>
            </Form.Item>
            <Form.Item label="Период" style={{ marginBottom: '15px' }}>
              {' '}
              <RangePicker
                style={{ width: 300 }}
                format="YYYY-MM-DD"
                onChange={props.handleChangeRange}
                value={[props.from, props.to]}
              />
            </Form.Item>
            <Form.Item label="Тип" style={{ marginBottom: '15px' }}>
              <Select
                value={type}
                style={{ width: 300 }}
                onChange={value => props.setType(value)}
              >
                <Option key="" value="">
                  Все
                </Option>
                {types.map(type => (
                  <Option key={type.id} value={type.id}>
                    {type.title}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label="Статус" style={{ marginBottom: '15px' }}>
              <Select
                onChange={value => props.setStatus(value)}
                value={status}
                style={{ width: 300 }}
              >
                <Option key="" value="">
                  Все
                </Option>
                {statuses.map(option => (
                  <Option key={option.id} value={option.id}>
                    {option.title}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Кем добавлен" style={{ marginBottom: '15px' }}>
              <Select
                onChange={value => props.setReportedBy(value)}
                value={reported_by}
                style={{ width: 300 }}
              >
                <Option key="" value="">
                  Все
                </Option>
                {users.map(user => (
                  <Option key={user.id} value={user.id}>
                    {user.first_name} {user.last_name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label="Исполнитель" style={{ marginBottom: '15px' }}>
              <Select
                onChange={value => props.setAssignedTo(value)}
                value={assigned_to}
                style={{ width: 300 }}
              >
                <Option key="" value="">
                  Все
                </Option>
                {users.map(user => (
                  <Option key={user.id} value={user.id}>
                    {user.first_name} {user.last_name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label="Приоритет" style={{ marginBottom: '15px' }}>
              <Select
                style={{ width: 300 }}
                value={priority}
                onChange={value => props.setPriority(value)}
              >
                <Option key="" value="">
                  Все
                </Option>
                {priorities.map(option => (
                  <Option key={option.id} value={option.id}>
                    <Tag>{option.id}</Tag>
                    {option.title}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item style={{ marginBottom: '15px', marginLeft: '1em' }}>
              <Button
                style={{ float: 'right' }}
                type="primary"
                onClick={props.showTable}
              >
                Поиск
              </Button>
              <Dropdown overlay={menuDownloadReport} 
                        style={{ float: 'right',
                                 margin:'0 1em 15px 3em'}}
              >
                <Button>
                  Скачать отчет .xlsx <DownOutlined />
                </Button>
              </Dropdown>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  )
}
