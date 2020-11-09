import React  from 'react'
import CallsTable from './CallsTable'
import {useEffect, useContext, useState } from 'react'
import { Link, useHistory} from 'react-router-dom'
import { BreadcrumbContext } from './../Breadcrumb/BreadcrumbContext'
import moment from 'moment'
import CallsFilters from './CallsFilters'
import axios from 'axios'

export default function Calls() {
    const { changeItems } = useContext(BreadcrumbContext)
    
    let history = useHistory()

    const [subCategories, setSubCategories] = useState([])
    const [subCategory, setSubCategory] = useState('')

    const [services, setServices] = useState([])
    const [service, setService] = useState('')

    const [employees, setEmployees] = useState([])
    const [employee, setEmployee] = useState('')
    
    const [statuses, setStatuses] = useState([])
    const [status, setStatus] = useState('')

    const [searchTerm, setSearchTerm] = useState('')

    const [pageSize, setPageSize] = useState('10')
    const [currentPage, setCurrentPage] = useState('')

    const [period, setPeriod] = useState(undefined)
    const [from, setFrom] = useState(moment())
    const [to, setTo] = useState(moment())
   
    const [issues, setIssues] = useState([])

        
    useEffect(() => {
        changeItems([<Link to={`/calls`}>Helpdesk</Link>, 'Звонки'])
        const getSubCategories = () => {
            axios({
                method: 'get',
                url: '/api/1.0/sub_categories'
            })
              .then(res => {
                  console.log('response', res.data)
                  res.data.sub_categories && setSubCategories(res.data.sub_categories)
              })
              .catch(err => {
                console.log(err)
                if (err.response && err.response.status === 401) {
                  localStorage.removeItem('isLoggedIn', false)
                  localStorage.removeItem('authData')
                  history.push('/signin')
                }
            })
        }
        const getServices = () => {
            axios({
                method: 'get',
                url: '/api/1.0/services'
            })
              .then(res => {
                  console.log('response services', res.data.services)
                  res.data.services && setServices(res.data.services)
              })
              .catch(err => {
                console.log(err)
                if (err.response && err.response.status === 401) {
                  localStorage.removeItem('isLoggedIn', false)
                  localStorage.removeItem('authData')
                  history.push('/signin')
                }
            })
        }
        const getEmployees = () => {
            axios({
                method: 'get',
                url: '/api/1.0/department_employees?group_id=7'
            })
              .then(res => {
                  console.log('response employees', res.data.employees)
                  res.data.employees && setEmployees(res.data.employees)
              })
              .catch(err => {
                console.log(err)
                if (err.response && err.response.status === 401) {
                  localStorage.removeItem('isLoggedIn', false)
                  localStorage.removeItem('authData')
                  history.push('/signin')
                }
            })
        }
        const getStatuses = () => {
            axios({
                method: 'get',
                url: '/api/1.0/statuses'
            })
              .then(res => {
                  console.log('response statuses', res.data.statuses)
                  res.data.statuses && setStatuses(res.data.statuses)
              })
              .catch(err => {
                console.log(err)
                if (err.response && err.response.status === 401) {
                  localStorage.removeItem('isLoggedIn', false)
                  localStorage.removeItem('authData')
                  history.push('/signin')
                }
            })
        }
        getSubCategories()
        getServices()
        getEmployees()
        getStatuses()
    }, [changeItems, history])

    const handleChangePeriod = period => {
        setPeriod(period)
        var dateStart = moment()
        var dateEnd = moment()
    
        if (period === 'Today') {
          dateStart = moment().startOf('day')
          dateEnd = moment().endOf('day')
        }
        if (period === 'Yesterday') {
          dateStart = moment()
            .subtract(1, 'day')
            .startOf('day')
          dateEnd = moment()
            .subtract(1, 'day')
            .endOf('day')
        }
        if (period === 'Last7days') {
          dateStart = moment()
            .subtract(6, 'day')
            .startOf('day')
          dateEnd = moment().endOf('day') //posledniye 7 dney
        }
        if (period === '6') {
          dateStart = moment().startOf('week')
          dateEnd = moment().endOf('day') // za tekushuyu nedelyu
        }
        if (period === '7') {
          dateStart = moment()
            .subtract(1, 'week')
            .startOf('week')
          dateEnd = moment()
            .subtract(1, 'week')
            .endOf('week') // za proshluyu nedelyu
        }
        if (period === 'Last30days') {
          dateStart = moment()
            .subtract(29, 'day')
            .startOf('day')
          dateEnd = moment().endOf('day') //posledniye 30 dney
        }
        if (period === '9') {
          dateStart = moment().startOf('month')
          dateEnd = moment().endOf('day') // za tekushiy mesyac
        }
        if (period === '10') {
          dateStart = moment()
            .subtract(1, 'month')
            .startOf('month')
          dateEnd = moment()
            .subtract(1, 'month')
            .endOf('month') //s nachala mesyaca
        }
    
        if (period === '11') {
          dateStart = moment().startOf('year')
          dateEnd = moment().endOf('day')
        }
        setFrom(dateStart)
        setTo(dateEnd)
        // this.setState({ from: dateStart, to: dateEnd })
      }
      const handleChangeRange = value => {
        setFrom(value[0])
        setTo(value[1])
        setPeriod(undefined)
      }

    const searchIssuesHandler = (e) => {
        setSearchTerm(e.target.value)
    }
    const handleMenuClick = (e) => {
      if (e.key === 'DetailedReport') {
        generateDetailedCallReportHandle()
      }
    }
    const getPaymentsIssuesHandler = () => {
      axios({
        method: 'GET',
        url: `/api/1.0/call_issues?from=${moment(from).format(
          'YYYY-MM-DD',
        )}&to=${moment(to).format(
          'YYYY-MM-DD',
        )}&subcategory_id=${subCategory}&service_id=${service}&status_id=${status}&created_by=${employee}&search_term=${searchTerm}`
      })
        .then(response => {
          response.data.issues ? setIssues(response.data.issues):setIssues([])
        })
        .catch(err => {
          console.log(err)
          if (err.response && err.response.status === 401) {
            localStorage.removeItem('isLoggedIn', false)
            localStorage.removeItem('authData')
            history.push('/signin')
          }
        })
    }

    const generateDetailedCallReportHandle = () => {
      axios({
        method: 'GET',
        url: `/api/1.0/call_issues?from=${moment(from).format(
          'YYYY-MM-DD',
        )}&to=${moment(to).format(
          'YYYY-MM-DD',
        )}&subcategory_id=${subCategory}&service_id=${service}&status_id=${status}&created_by=${employee}&search_term=${searchTerm}`,
        headers:{
          'Accepted':'xlsx',
        },
        responseType: 'blob'
      })
        .then(({data}) => {

          const url = window.URL.createObjectURL(new Blob([data]))
          const link = document.createElement('a')
          link.href = url;
          link.setAttribute('download', 
            `Detailed--Report--${moment(from).format('YYYY-MM-DD', )}  ${moment(to).format('YYYY-MM-DD',)}.xlsx`);
            
          document.body.appendChild(link);
          link.click();
          link.remove();

        })
        .catch((err) => {
          console.log(err)
        })
    }
    
    const changePageSizeHandler = (currentPage, pageSize) => {
      setCurrentPage(currentPage)
      setPageSize(pageSize)
    }

    const changePageHandler = (page, pageSize) => {
      setCurrentPage(page)
      setPageSize(pageSize)
    }



    return (
        <div>
            <CallsFilters
                handleChangePeriod={handleChangePeriod}
                handleChangeRange={handleChangeRange}
                period={period}
                from={from}
                to={to}
                
                subcategories={subCategories}
                subcategory={subCategory}
                setSubCategory={setSubCategory}

                services={services}
                service={service}
                setService={setService}

                employees={employees}
                employee={employee}
                setEmployee={setEmployee}

                statuses={statuses}
                status={status}
                setStatus={setStatus}

                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                searchIssuesHandler={searchIssuesHandler}

                handleMenuClick={handleMenuClick}

                getPaymentsIssuesHandler={getPaymentsIssuesHandler}
            >
            </CallsFilters>
            <CallsTable
                issues={issues}
                pageSize={pageSize}
                currentPage={currentPage}
                changePageHandler={changePageHandler}
                changePageSizeHandler={changePageSizeHandler}
            ></CallsTable>
        </div>
        
    )
}