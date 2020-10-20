import React, { useState, useEffect, Fragment, useContext } from 'react'
import { Link } from 'react-router-dom'
import { BreadcrumbContext } from './../Breadcrumb/BreadcrumbContext'
import TechsTable from './TechsTable'
import CallCenterTable from './CallCenterTable'
import { Button, Row } from 'antd'
import { Tabs } from 'antd';
import ReportFilters from './ReportFilters'
import moment from 'moment'
import download from 'downloadjs'

const { TabPane } = Tabs;

export default function Reports() {
  const [users, setUsers] = useState([])
  const [ccData, setCcData] = useState([])
  
  const [period, setPeriod] = useState('Today')
  const [from, setFrom] = useState(moment())
  const [to, setTo] = useState(moment())

  const { contextType, changeItems } = useContext(BreadcrumbContext)
  const [reportType, setReportType] = useState('')
  
  const handleChangePeriod = period => {
    setPeriod(period)
    var dateStart = moment()
    var dateEnd = moment()
    if (period === 'Today') {
      dateStart = moment().startOf('day')
      dateEnd = moment().endOf('day')
    }
    if (period === 'Yesterday') {
      dateStart = moment().subtract(1, 'day').startOf('day')
      dateEnd = moment().subtract(1, 'day').endOf('day')
    }
    if (period === 'Last7days') {
      dateStart = moment().subtract(6, 'day').startOf('day')
      dateEnd = moment().endOf('day') //posledniye 7 dney
    }
    if (period === '6') {
      dateStart = moment().startOf('week')
      dateEnd = moment().endOf('day') // za tekushuyu nedelyu
    }
    if (period === '7') {
      dateStart = moment().subtract(1, 'week').startOf('week')
      dateEnd = moment().subtract(1, 'week').endOf('week')// za proshluyu nedelyu
    }
    if (period === 'Last30days') {
      dateStart = moment().subtract(29, 'day')
      dateEnd = moment().endOf('day') //posledniye 30 dney
    }
    if (period === '9') {
      dateStart = moment().startOf('month')
      dateEnd = moment().endOf('day') // za tekushiy mesyac
      console.log(dateStart, dateEnd)
    }
    if (period === '10') {
      dateStart = moment().subtract(1, 'month').startOf('month')
      dateEnd = moment().subtract(1, 'month').endOf('month') //s nachala mesyaca
    }

    if (period === '11') {
      dateStart = moment().startOf('year')
      dateEnd = moment().endOf('day')
    }
    setFrom(dateStart)
    setTo(dateEnd)

  }
  useEffect(() => {
    changeItems([
      <Link to={`/`}>Helpdesk</Link>,
      `Отчеты`,
    ])

    const getCcData = () => {
      fetch(`/api/1.0/salary_call_center_reports?from=${moment(from).format('YYYY-MM-DD')}&to=${moment(to).format('YYYY-MM-DD')}`)
        .then((res) => res.json())
        .then((data) => {
          Array.isArray(data.employees_reports)
            ? setCcData(data.employees_reports)
            : console.log('error')
        })
        .catch((err) => {
          console.log(err)
        })
    }
    getCcData()
  }, [])

  const getTechueTableHandler = () => {
    fetch(`/api/1.0/salary_technique_reports?from=${moment(from).format('YYYY-MM-DD')}&to=${moment(to).format('YYYY-MM-DD')}`)
      .then((res) => res.json())
      .then((data) => {
        Array.isArray(data.employees_reports)
          ? setUsers(data.employees_reports)
          : console.log('error')
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const getCcData = () => {
    fetch(`/api/1.0/salary_call_center_reports?from=${moment(from).format('YYYY-MM-DD')}&to=${moment(to).format('YYYY-MM-DD')}`)
      .then((res) => res.json())
      .then((data) => {
        Array.isArray(data.employees_reports)
          ? setCcData(data.employees_reports)
          : console.log('error')
      })
      .catch((err) => {
        console.log(err)
      })
  }



  const getTechReportHandler = () => {
    fetch(`/api/1.0/salary_technique_reports?from=${moment(from).format(
      'YYYY-MM-DD',
    )}&to=${moment(to).format(
      'YYYY-MM-DD',
    )}`, {
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

  const getСсReportHandler = () => {
    fetch(`/api/1.0/salary_call_center_reports?from=${moment(from).format(
      'YYYY-MM-DD',
    )}&to=${moment(to).format(
      'YYYY-MM-DD',
    )}`, {
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


  const handleChangeRange = value => {
    setFrom(value[0])
    setTo(value[1])
    setPeriod(undefined)
  }
  const changeReport = (key) => {
    setReportType(key)
  }
  const getReportData = () => {
    if (reportType != 2) {
      getTechueTableHandler()
    } else {
      getCcData()
    }
  }
  return (
    
    <Fragment>
      <ReportFilters
        from={from}
        to={to}
        period={period}
        handleChangePeriod={handleChangePeriod}
        handleChangeRange={handleChangeRange}
        getReportData={getReportData}
      >
      </ReportFilters>
      <Tabs defaultActiveKey="1" onChange={changeReport}>
        <TabPane tab="Отчет по техникам" key="1">
          <Row style={{ justifyContent: 'flex-end' }}>
            {' '}
            <Button
              style={{ marginBottom: '1em' }}
              onClick={getTechReportHandler}
              type="primary"
            >
              Скачать .XLSX
            </Button>
          </Row>
          <TechsTable users={users}></TechsTable>
        </TabPane>
        <TabPane tab="Отчет по колцентру" key="2">
          <Row style={{ justifyContent: 'flex-end' }}>
            {' '}
            <Button
              style={{ marginBottom: '1em' }}
              onClick={getСсReportHandler}
              type="primary"
            >
              Скачать .XLSX
            </Button>
          </Row>
          <CallCenterTable ccData={ccData}></CallCenterTable>
        </TabPane>
      </Tabs>
    </Fragment>

  )
}
