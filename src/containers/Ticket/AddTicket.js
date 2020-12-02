import React, { useEffect } from 'react'
import { Modal, Button } from 'antd'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import AddTicketForm from './AddTicketForm'
import nanoid from 'nanoid'

function AddTicket({ visibleOpenTicket, ...props }) {
    let history = useHistory()
    const handleClose = props.handleClose
    const [selectedTemplate, setSelectedTemplate] = React.useState('classic')
    const [template, setTemplate] = React.useState([])
    const [priorities, setPriorities] = React.useState([])
    const [cities, setCities] = React.useState([])
    const [faults, setFaults] = React.useState([])
    const [users, setUsers] = React.useState([])
    const [types, setTypes] = React.useState([])
    const [subcategories, setSubcategories] = React.useState([])
    const [categories, setCategories] = React.useState([])
    const [services, setServices] = React.useState([])

    // const [stateCat, setStateCat] = React.useState({})
    const [assignees, setAssignees] = React.useState([])
    const [title, setTitle] = React.useState('')
    const [type, setType] = React.useState(1)
    const [priority, setPriority] = React.useState('P4')
    const [city, setCity] = React.useState('')
    const [fault, setFault] = React.useState('')
    const [subcategory, setSubcategory] = React.useState('')
    const [category, setCategory] = React.useState('')
    const [description, setDescription] = React.useState('')
    const [isPassing, setIsPassing] = React.useState('false')
    const [service, setService] = React.useState('')
    const [claims, setClaims] = React.useState({})


    const templates = {
        classic: '',
        paymentsTemplate: {
            [nanoid()]: { key: 'Услуга', value: '' },
            [nanoid()]: { key: 'Неправильный номер', value: '' },
            [nanoid()]: { key: 'Правильный номер', value: '' },
            [nanoid()]: { key: 'Номер терминала', value: '' },
            [nanoid()]: { key: 'Проведено ', value: '' },
            [nanoid()]: { key: 'Сумма отмены', value: '' },
            [nanoid()]: { key: 'Номер абонента', value: '' },
            [nanoid()]: { key: 'Субкатегория', value: '' },
        },
        repairsTemplate: {
            [nanoid()]: { key: 'ФИО Агента ', value: '' },
            [nanoid()]: { key: 'Номер агента ', value: '' },
            [nanoid()]: { key: 'Оборудование ', value: '' },
            [nanoid()]: { key: 'Серийный номер ', value: '' },
            [nanoid()]: { key: 'Описание неисправностей', value: '' },
            [nanoid()]: { key: 'Сумма работы', value: '' },
            [nanoid()]: { key: 'Замена комплектующих ', value: '' },
        },
        techTemplate: {
            [nanoid()]: { key: 'Номер терминала ', value: '' },
            [nanoid()]: { key: 'Название терминала', value: '' },
            [nanoid()]: { key: 'ID агента', value: '' },
            [nanoid()]: { key: 'Номер агента', value: '' },
            [nanoid()]: { key: 'Описание неисправности', value: '' },
            [nanoid()]: { key: 'Группа неисправности', value: '' },
            [nanoid()]: { key: 'Место терминала', value: '' },
            [nanoid()]: { key: 'Город', value: '' },
            [nanoid()]: { key: 'Расстояние', value: '' },
            [nanoid()]: { key: 'Потраченное средств', value: '' },
            [nanoid()]: { key: 'Балл', value: '' },
            [nanoid()]: { key: 'Попутный', value: '' },
        },
    }
    const defaultValues = {
        classic: {
            type: 1,
            priority: 'P4',
            city: '',
            fault: '',
        },
        paymentsTemplate: {
            type: 5,
            priority: 'P5',
            city: '',
            fault: '',
            subcategory: '1',
            category: '1',
            service: '1',
        },
        repairsTemplate: { type: 15, priority: 'P4', city: '', fault: '' },
        techTemplate: { type: 6, priority: 'P4', city: 'd125ea89-eecf-492e-935c-0b08f9387ef2', fault: '4a96e8e1-bfa8-4fe1-ad40-5984f8e9386b' },
    }
    const handleChangeTemplate = value => {
        setType(defaultValues[value].type)
        setPriority(defaultValues[value].priority)
        setCity(defaultValues[value].city)
        setFault(defaultValues[value].fault)
        setSubcategory(defaultValues[value].subcategory)
        setCategory(defaultValues[value].category)
        setService(defaultValues[value].service)
        setTemplate(templates[value])
        setSelectedTemplate(value)
    }

    const handleRemove = key => {
        setClaims(old => {
            const copy = { ...old }
            delete copy[key]
            return copy
        })
    }

    const handleAddClaim = () => {
        setClaims(old => {
            const copy = { ...old, [nanoid()]: { key: '', value: '' } }
            return copy
        })
    }

    const setIsPassingHandle = (e) => {
        if (e.target.checked) {
            setIsPassing('true')
        } else {
            setIsPassing('false')
        }
    }
    const handleEdit = (claimRow, claimCell) => event => {
        const { value } = event.target
        setClaims(old => {
            const copy = { ...old }
            copy[claimRow][claimCell] = value
            return copy
        })
    }
    const handleEditTemplate = (claimRow, claimCell) => event => {
        const { value } = event.target
        setTemplate(old => {
            const copy = { ...old }
            copy[claimRow][claimCell] = value
            return copy
        })
    }
    const handleSubmit = event => {
        event.preventDefault()
        console.log(Object.values(claims))
    }

    useEffect(() => {
        const getUsers = () => {
            fetch(`/api/1.0/users`)
                .then(res => res.json())
                .then(data => {
                    Array.isArray(data.users) ?
                        setUsers(data.users) :
                        console.log('error')
                })
                .catch(err => {
                    console.log(err)
                })
        }
        const getTypes = () => {
            fetch(`/api/1.0/issue_types`)
                .then(res => res.json())
                .then(data => {
                    Array.isArray(data.types) ?
                        setTypes(data.types) :
                        console.log('error')
                    console.log(data.types)
                })
                .catch(err => {
                    console.log(err)
                })
        }
        const getPriority = () => {
            fetch(`/api/1.0/priorities`)
                .then(res => res.json())
                .then(data => {
                    Array.isArray(data.priorities) ?
                        setPriorities(data.priorities) :
                        console.log('error')
                })
                .catch(err => {
                    console.log(err)
                })
        }
        const getCities = () => {
            fetch(`/api/1.0/cities`)
                .then(res => res.json())
                .then(data => {
                    Array.isArray(data.cities) ?
                        setCities(data.cities) :
                        console.log('error')
                })
                .catch(err => {
                    console.log(err)
                })
        }
        const getFaults = () => {
            fetch(`/api/1.0/fault_groups`)
                .then(res => res.json())
                .then(data => {
                    Array.isArray(data.fault_groups) ?
                        setFaults(data.fault_groups) :
                        console.log('error')
                })
                .catch(err => {
                    console.log(err)
                })
        }
        const getSubCategories = () => {
            fetch(`/api/1.0/sub_categories`)
                .then(res => res.json())
                .then(data => {
                    console.log(data.sub_categories)
                    Array.isArray(data.sub_categories) ?
                        setSubcategories(data.sub_categories) :
                        console.log('error')
                })
                .catch(err => {
                    console.log(err)
                })
        }
        const getCategories = () => {
            fetch(`/api/1.0/categories`)
                .then(res => res.json())
                .then(data => {
                    console.log(data.categories)
                    Array.isArray(data.categories) ?
                        setCategories(data.categories) :
                        console.log('error')
                })
                .catch(err => {
                    console.log(err)
                })
        }
        const getServices = () => {
            fetch(`/api/1.0/services`)
                .then(res => res.json())
                .then(data => {
                    console.log(data.services)
                    Array.isArray(data.services) ?
                        setServices(data.services) :
                        console.log('error')
                })
                .catch(err => {
                    console.log(err)
                })
        }

        getPriority()
        getTypes()
        getUsers()
        getCities()
        getFaults()
        getSubCategories()
        getCategories()
        getServices()
        return () => {
            clearState()
        }
    }, [])

    const clearState = () => {
        setAssignees([])
        setTitle('')
        setType(1)
        setPriority('P4')
        setCity('')
        setFault('')
        setSubcategory('')
        setCategory('')
        setDescription('')
        setIsPassing('false')
        setService('')
        setClaims({})
        setUsers([])
        handleChangeTemplate('classic')
    }
    const handleAddTicket = ({ ...props }) => {
        const copy = Object.assign(claims, template)

        const copyValues = Object.values(copy)

        if (city !== '') {
            copyValues.forEach((element) => {
                if (element.key === 'Город') {
                    element.value = city
                }
            })
        }

        if (fault !== '') {
            copyValues.forEach((element) => {
                if (element.key === 'Группа неисправности') {
                    element.value = fault
                }
            })
        }

        if (isPassing !== '') {
            copyValues.forEach((element) => {
                if (element.key === 'Попутный') {
                    element.value = isPassing
                }
            })
        }

        if (subcategories !== '') {
            copyValues.forEach((element) => {
                if (element.key === 'Субкатегория') {
                    element.value = subcategory
                }
            })
        }

        if (categories !== '') {
            copyValues.forEach((element) => {
                if (element.key === 'Категория') {
                    element.value = category
                }
            })
        }
        if (service !== '') {
            copyValues.forEach((element) => {
                if (element.key === 'Услуга') {
                    element.value = service
                }
            })
        }

        axios({
            method: 'post',
            url: '/api/1.0/issues',
            data: {
                assignees,
                title,
                type_id: type,
                priority_id: priority,
                description,
                claims: copyValues,
            },
        })
            .then(response => {
                console.log('ok')
                const id = response.data.issue.id
                handleClose()
                clearState()
                history.push(`/ticket/${id}`)
            })

            .catch(err => {
                console.log(err)
            })
        handleClose()
        // history.push('/ticket')
    }

    return (
        <div>
            <
                Modal visible={visibleOpenTicket}
                title="Добавление заявки"
                onOk={handleClose}
                onCancel={handleClose}
                centered footer={
                    [<Button key="back"
                        onClick={handleClose} >
                        Отмена
            </Button>,
                    <Button
                        key="submit"
                        type="primary"
                        // loading={loading}
                        onClick={handleAddTicket}
                        disabled={!title || title === ' '} >
                        Добавить </Button>,
                    ]
                }>

                <AddTicketForm template={template}
                    handleChangeTemplate={handleChangeTemplate}
                    selectedTemplate={selectedTemplate}
                    priorities={priorities}
                    cities={cities}
                    faults={faults}
                    users={users}
                    types={types}
                    assignees={assignees}
                    subcategories={subcategories}
                    setAssignees={setAssignees}
                    title={title}
                    setTitle={setTitle}
                    type={type}
                    setType={setType}
                    priority={priority}
                    setPriority={setPriority}
                    city={city}
                    setCity={setCity}
                    fault={fault}
                    setFault={setFault}
                    description={description}
                    setDescription={setDescription}
                    claims={claims}
                    handleRemove={handleRemove}
                    handleSubmit={handleSubmit}
                    handleEdit={handleEdit}
                    handleEditTemplate={handleEditTemplate}
                    handleAdd={handleAddClaim}
                    isPassing={isPassing}
                    setIsPassing={setIsPassingHandle}
                    subcategory={subcategory}
                    setSubcategory={setSubcategory}
                    category={category}
                    setCategory={setCategory}
                    categories={categories}
                    setService={setService}
                    services={services}
                    service={service}>
                </AddTicketForm>
            </Modal >
        </div>
    )
}
export default AddTicket