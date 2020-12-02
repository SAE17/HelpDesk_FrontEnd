import React from 'react'
import { Form, DatePicker, Select, Col, Row, Button, Menu, Dropdown } from 'antd'
import { Input } from 'antd'
import { SearchOutlined, DownOutlined } from '@ant-design/icons';
const Option = Select.Option
const { OptGroup } = Select
const { RangePicker } = DatePicker
const { Search } = Input;
export default function CallsFilters({ ...props }) {
    const {
        period,

        subcategory,
        subcategories,

        service,
        services,

        employee,
        employees,

        status,
        statuses,

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
            <Menu.Item key="DetailedReport">
                Детализированный отчет
            </Menu.Item>
        </Menu>
    );
    return (
        <div>
            <Form {...formItemLayout}>
                <Row span={6}>
                    <Col>
                        <Form.Item label="Интервал" style={{ marginBottom: '15px' }}>
                            <Select
                                placeholder="Выберите интервал"
                                value={period}
                                onChange={props.handleChangePeriod}
                                style={{ width: '350px' }}
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
                                style={{ width: '350px' }}
                                format="YYYY-MM-DD"
                                onChange={props.handleChangeRange}
                                value={[props.from, props.to]} />
                        </Form.Item>
                        <Form.Item label="Субкатегория" style={{ marginBottom: '15px' }}>
                            <Select
                                onChange={(val) => { props.setSubCategory(val) }}
                                value={subcategory}
                                style={{ width: '350px' }}
                                showSearch
                                optionFilterProp="children"
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                            >
                                <Option key="" value="">Все</Option>
                                {
                                    subcategories.map(option => (
                                        <Option key={option.id} value={option.id}>
                                            {option.title}
                                        </Option>
                                    ))
                                }
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col style={{ marginLeft: '50px' }}>
                        <Form.Item label="Услуги" style={{ width: '300px', marginBottom: '15px' }}>
                            <Select
                                onChange={(val) => { props.setService(val) }}
                                value={service}
                                style={{ width: '300px' }}
                                showSearch
                                optionFilterProp="children"
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                            >
                                <Option key="" value="">Все</Option>
                                {
                                    services.map(option => (
                                        <Option key={option.id} value={option.id}>
                                            {option.name}
                                        </Option>
                                    ))
                                }
                            </Select>
                        </Form.Item>
                        <Form.Item label="Добавил" style={{ width: '300px', marginBottom: '15px' }}>
                            <Select
                                onChange={(val) => { props.setEmployee(val) }}
                                value={employee}
                                style={{ width: '300px' }}
                            >
                                <Option key="" value="">Все</Option>
                                {
                                    employees.map(option => (
                                        <Option key={option.id} value={option.id}>
                                            {option.full_name}
                                        </Option>
                                    ))
                                }
                            </Select>
                        </Form.Item>
                        <Form.Item label="Статус" style={{ width: '300px', marginBottom: '15px' }}>
                            <Select
                                onChange={(val) => { props.setStatus(val) }}
                                value={status}
                                style={{ width: '300px' }}
                            >
                                <Option key="" value="">Все</Option>
                                {
                                    statuses.map(option => (
                                        <Option key={option.id} value={option.id}>
                                            {option.title}
                                        </Option>
                                    ))
                                }
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col style={{ marginLeft: '100px' }}>
                        <Form.Item label="Поиск" style={{ width: '400px' }}>
                            <Search
                                placeholder="input search text"
                                allowClear
                                onChange={props.searchIssuesHandler}
                                style={{ width: 200, margin: '0 10px' }}
                            />
                        </Form.Item>
                        <Form.Item style={{ display: 'flex' }}>
                            <div style={{ display: 'flex' }}>
                                <Button type="primary" icon={<SearchOutlined />}
                                    style={{ margin: '0 1em 0 3em' }}
                                    onClick={props.getPaymentsIssuesHandler}
                                >
                                    Поиск
                                </Button>
                                <Dropdown overlay={menuDownloadReport}>
                                    <Button>
                                        Скачать отчет .xlsx <DownOutlined />
                                    </Button>
                                </Dropdown>
                            </div>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </div>
    )

}

