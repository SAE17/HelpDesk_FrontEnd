import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Divider, Form, Input, Select, Tag, Checkbox } from 'antd'
import React from 'react'
// import users from './../TestJsons/users.json'
const { Option } = Select
const { TextArea } = Input

function tagRender(props) {
  const { label, closable, onClose } = props

  return (
    <Tag
      // color={value}
      closable={closable}
      onClose={onClose}
      style={{ marginRight: 3 }}
    >
      {label}
    </Tag>
  )
}
const AddTicketForm = ({ ...props }) => {
  const {
    template,
    selectedTemplate,
    handleChangeTemplate,
    priorities,
    cities,
    faults,
    users,
    types,
    assignees,
    subcategories,
    setAssignees,
    title,
    setTitle,
    type,
    setType,
    priority,
    setPriority,
    city,
    setCity,
    fault,
    setFault,
    description,
    setDescription,
    claims,
    handleAdd,
    handleEdit,
    handleEditTemplate,
    handleRemove,
    handleSubmit,
    isPassing,
    setIsPassing,
    subcategory,
    setSubcategory,
    setService,
    services,
    service,
    // categories,
    // setCategory,
    // category,
  } = props

  const [form] = Form.useForm()

  const formItemLayout = {
    labelCol: {
      span: 9,
    },
    wrapperCol: {
      span: 14,
    },
  }

  const formItemLayout1 = {
    labelCol: {
      xs: { span: 24, offset: 0 },
      sm: { span: 12, offset: 0 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 12 },
    },
  }

  return (
    <div>
      <Form {...formItemLayout} form={form}>
        <Form.Item label="Шаблон" style={{ marginBottom: '5px' }}>
          <Select value={selectedTemplate} onChange={handleChangeTemplate}>
            <Option key="classic" value="classic">
              Классический
            </Option>
            <Option key="paymentsTemplate" value="paymentsTemplate">
              Заявка по платежам
            </Option>
            <Option key="repairsTemplate" value="repairsTemplate">
              Заявка по ремонту
            </Option>
            <Option key="techTemplate" value="techTemplate">
              Заявка тех. отдела
            </Option>
          </Select>
        </Form.Item>

        <Form.Item label="Название" style={{ marginBottom: '5px' }}>
          <Input
            value={title}
            onChange={event => {
              setTitle(event.target.value)
            }}
          />
        </Form.Item>
        <Form.Item label="Тип" style={{ marginBottom: '5px' }}>
          <Select value={type} onChange={setType}>
            {types.map(type => (
              <Option key={type.id} value={type.id}>
                {type.title}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="Приоритет" style={{ marginBottom: '5px' }}>
          <Select value={priority} onChange={setPriority}>
            {priorities.map(option => (
              <Option key={option.id} value={option.id}>
                {option.title}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="Исполнитель" style={{ marginBottom: '5px' }}>
          <Select
            mode="multiple"
            tagRender={tagRender}
            defaultValue={assignees}
            style={{ width: '100%' }}
            onChange={value => {
              setAssignees(value)
            }}
          >
            {users.map(user => (
              <Option key={user.id} value={user.id}>
                {user.first_name} {user.last_name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="Описание" style={{ marginBottom: '5px' }}>
          <TextArea
            rows={4}
            placeholder="Введите текст описания"
            value={description}
            onChange={event => {
              setDescription(event.target.value)
            }}
          />
        </Form.Item>

        {template &&
          Object.entries(template).map(([key, values], index) => {
            let comp =
              <Input
                placeholder="Значение"
                // style={{ width: '80%', marginRight: 8 }}
                onChange={handleEditTemplate(key, 'value')}
                value={values.value}
              />

            if (key === 'Город' || values.key === 'Город') {
              // comp = <Select value={city} onChange={setCity}>
              comp = <Select value={city} onChange={setCity}>
                {cities.map(option => (
                  <Option key={option.id} value={option.id}>
                    {option.name}
                  </Option>
                ))}
              </Select>
            } else if (key === 'Группа неисправности' || values.key === 'Группа неисправности') {
              // comp = <Select value={fault} onChange={setFault} >
              comp = <Select value={fault} onChange={setFault}>
                {faults.map(option => (
                  <Option key={option.id} value={option.id}>
                    {option.title}
                  </Option>
                ))}
              </Select>
            } else if (key === 'Расстояние' || values.key === 'Расстояние') {
              comp = <Input
                placeholder="Значение"
                disabled
              />
            } else if (key === 'Балл' || values.key === 'Балл') {
              comp = <Input
                placeholder="Значение"
                disabled
              />
            } else if (key === 'Потраченное средств' || values.key === 'Потраченное средств') {
              comp = <Input
                placeholder="Значение"
                disabled
              />
            } else if (key === 'Попутный' || values.key === 'Попутный') {
              comp = <Checkbox
                onChange={setIsPassing}
                value={isPassing}>
              </Checkbox>
            } else if (key === 'Субкатегория' || values.key === 'Субкатегория') {
              comp = <Select
                value={subcategory}
                showSearch
                placeholder="Search to Select"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                filterSort={(optionA, optionB) =>
                  optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                }
                onChange={setSubcategory}>
                {subcategories.map(option => (
                  <Option key={option.id} value={'' + option.id}>
                    {option.title}
                  </Option>
                ))}
              </Select>
            } else if (key === 'Услуга' || values.key === 'Услуга') {
              comp = <Select
                showSearch
                placeholder="Search to Select"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                filterSort={(optionA, optionB) =>
                  optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                }
                value={service}
                onChange={setService}>
                {services.map(option => (
                  <Option key={option.id} value={'' + option.id}>
                    {option.name}
                  </Option>
                ))}
              </Select>
            }
            //  else if (key === 'Категория' || values.key === 'Категория') {
            //   comp = <Select value={category} onChange={setCategory}>
            //     {categories.map(option => (
            //       <Option key={option.id} value={''+option.id}>
            //         {option.title}
            //       </Option>
            //     ))}
            //   </Select>

            // }
            return <Form.Item
              key={key}
              label={values.key}
              required={false}
              style={{ marginBottom: '5px' }}
            > {comp} </Form.Item>
          })}
      </Form>
      <Divider style={{ marginBottom: '10px' }}></Divider>
      <Form onSubmit={handleSubmit}>
        {claims &&
          Object.entries(claims).map(([key, values], index) => (
            <Form.Item
              {...formItemLayout1}
              key={key}
              style={{ marginBottom: '5px' }}
              label={
                <Input
                  placeholder="Ключ"
                  onChange={handleEdit(key, 'key')}
                  value={values.key}
                />
              }
              required={false}
            >
              <Form.Item
                style={{ marginBottom: '5px' }}
                // {...field}
                validateTrigger={['onChange', 'onBlur']}
                rules={[
                  {
                    required: true,
                    whitespace: true,
                    message: 'Please input value or delete this field.',
                  },
                ]}
                noStyle
              >
                <Input
                  placeholder="Значение"
                  style={{ width: '80%', marginRight: 8 }}
                  onChange={handleEdit(key, 'value')}
                  value={values.value}
                />
              </Form.Item>

              <MinusCircleOutlined
                key={key}
                className="dynamic-delete-button"
                onClick={() => handleRemove(key)}
              />
            </Form.Item>
          ))}

        <Button
          type="dashed"
          onClick={handleAdd}
          style={{ width: '-webkit-fill-available', margin: '5px 10%' }}
        >
          <PlusOutlined /> Add field
        </Button>
      </Form>
      <Form>

      </Form>
    </div>
  )
}

export default AddTicketForm
