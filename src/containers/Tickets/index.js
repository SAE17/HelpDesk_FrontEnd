import React, { useState, useEffect, useContext } from 'react'
import TicketsTable from './TicketsTable'
import moment from 'moment'
import Filters from './Filters'
import { Link, useHistory } from 'react-router-dom'
import { BreadcrumbContext } from './../Breadcrumb/BreadcrumbContext'
import axios from 'axios'
import download from 'downloadjs'

export default function Tickets() {
  const { changeItems } = useContext(BreadcrumbContext)
  let history = useHistory()
  const [issues, setIssues] = React.useState([])

  const [priorities, setPriorities] = React.useState([])
  const [users, setUsers] = useState([])
  const [types, setTypes] = useState([])
  const [statuses, setStatuses] = useState([])

  const [period, setPeriod] = useState(undefined)
  const [from, setFrom] = useState(moment())
  const [to, setTo] = useState(moment())
  
  const [reported_by, setReportedBy] = useState('')
  const [assigned_to, setAssignedTo] = useState('')
  const [status, setStatus] = useState('')
  const [priority, setPriority] = useState('')
  const [type, setType] = useState('')

  const [totalRows, setTotalRows] = useState('')
  const [currentPage, setCurrentPage] = useState('')
  const [pageSize, setPageSize] = useState('10')
  
  useEffect(() => {
    changeItems([<Link to={`/`}>Helpdesk</Link>, 'Заявки'])
    const getUsers = () => {
      axios({
        method: 'get',
        url: `/api/1.0/users`,
      })
        .then(response => {
          console.log('response:', response.data)
          response.data.users && setUsers(response.data.users)
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
    const getTypes = () => {
      axios({
        method: 'get',
        url: `/api/1.0/issue_types`,
      })
        .then(response => {
          console.log('response:', response.data)
          response.data.types && setTypes(response.data.types)
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
    const getPriority = () => {
      axios({
        method: 'get',
        url: `/api/1.0/priorities`,
      })
        .then(response => {
          console.log('response:', response.data)
          response.data.priorities && setPriorities(response.data.priorities)
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
    const getStatus = () => {
      axios({
        method: 'get',
        url: `/api/1.0/statuses`,
      })
        .then(response => {
          console.log('response:', response.data)
          response.data.statuses && setStatuses(response.data.statuses)
        })
        .catch(err => {
          console.log(err)
          if (err.response && err.response.status === 401) {
            localStorage.removeItem('isLoggedIn', false)
            localStorage.removeItem('authData')
            history.push('/signin')
          }
        })
      // fetch(`/api/1.0/statuses`)
      //   .then(res => {
      //     res.json()
      //     if (res.status === 401) {
      //       localStorage.removeItem('isLoggedIn', false)
      //       history.push('/signin')
      //     }
      //   })
      //   .then(data => {
      //     Array.isArray(data.statuses)
      //       ? setStatuses(data.statuses)
      //       : console.log('error')
      //   })
      //   .catch(err => {
      //     console.log(err)
      //   })
    }

    getPriority()
    getTypes()
    getUsers()
    getStatus()

  }, [changeItems, history])

  const handleMenuClick = e => {
    if(e.key==='TechReport'){
      generateDetailTechReportHandle()
    }
    if(e.key==='TotalReport'){
      generateDetailTotalReportHandle()
    }
  }

  //Скачать детальный отчет заявкам платежа

  // Скачать детальный отчет по заявкам техника
  const generateDetailTechReportHandle = () => {
    fetch(`/api/1.0/reports/tech_details?from=${moment(from).format(
      'YYYY-MM-DD',
    )}&to=${moment(to).format(
      'YYYY-MM-DD',
    )}&reported_by=${reported_by}&assigned_to=${assigned_to}&status=${status}&priority=${priority}`, {
      headers: {
        'Accept': 'xlsx'
      },
    })

      .then((res) => res.blob())
      .then((blob) => download(blob, `Detailed Report ${moment(from).format('YYYY-MM-DD', )}  ${moment(to).format(
                                      'YYYY-MM-DD',)} `, 'xlsx')
      )
      .catch((err) => {
        console.log(err)
      })
  }

  // Скачать общий детальный отчет
  const generateDetailTotalReportHandle = () => {
      fetch(`/api/1.0/issues?from=${moment(from).format(
        'YYYY-MM-DD',
      )}&to=${moment(to).format(
        'YYYY-MM-DD',
      )}&reported_by=${reported_by}&assigned_to=${assigned_to}&status=${status}&priority=${priority}&type=${type}`, {
        headers: {
          'Accept': 'xlsx'
        },
      })

        .then((res) => res.blob())
        .then((blob) => download(blob, `Detailed Report ${moment(from).format('YYYY-MM-DD', )}  ${moment(to).format(
                                        'YYYY-MM-DD',)} `, 'xlsx')
        )
        .catch((err) => {
          console.log(err)
        })
  }

  const showTable = () => {
    axios({
      method: 'GET',
      url: `/api/1.0/issues?from=${moment(from).format(
        'YYYY-MM-DD',
      )}&to=${moment(to).format(
        'YYYY-MM-DD',
      )}&reported_by=${reported_by}&assigned_to=${assigned_to}&status=${status}&priority=${priority}&type=${type}`,
      headers:{
        'Page-Size':`${pageSize}`,
        'Current-Page':`${currentPage}`
      },
    })
    
      .then(response => {
        
        console.log('response:', response)
        // const { data } = response
        response.data.issues ? setIssues(response.data.issues) : setIssues([])
        response.data.pagination ? setTotalRows(response.data.pagination.total_pages):setTotalRows('')
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

  const changePageSizeHandler = (currentPage, pageSize) => {
    setCurrentPage(currentPage)
    setPageSize(pageSize)
  }

  const changePageHandler = (page, pageSize) => {
    setCurrentPage(page)
    setPageSize(pageSize)
    showTable()
  }


  return (
    <div>
      <Filters
        handleChangePeriod={handleChangePeriod}
        handleChangeRange={handleChangeRange}
        period={period}
        from={from}
        to={to}
        showTable={showTable}
        priorities={priorities}
        types={types}
        users={users}
        statuses={statuses}
        reported_by={reported_by}
        setReportedBy={setReportedBy}
        assigned_to={assigned_to}
        setAssignedTo={setAssignedTo}
        status={status}
        setStatus={setStatus}
        priority={priority}
        setPriority={setPriority}
        type={type}
        setType={setType}
        handleMenuClick={handleMenuClick}
      ></Filters>

      <TicketsTable issues={issues}
                    totalRows={totalRows}
                    changePageHandler={changePageHandler}
                    currentPage={currentPage}
                    changePageSizeHandler={changePageSizeHandler}
                    pageSize={pageSize}
                    >
      </TicketsTable>
    </div>
  )
}
