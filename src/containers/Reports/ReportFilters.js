import React, { useEffect } from 'react'
import { Form, DatePicker, Select, Col, Row, Button, Input, Tag, Icon } from 'antd'

const Option = Select.Option
const { OptGroup } = Select
const { RangePicker } = DatePicker

export default function ReportFilters({...props}){
    const {
        period,
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
                    <Form.Item>
                    <Button
                            style={{ float: 'right' }}
                            type="primary"
                            onClick={props.getReportData}
                    >
                    Поиск
                    </Button>
                    </Form.Item>
                </Col >
                </Row>
            </Form>
        </div>
    )
}