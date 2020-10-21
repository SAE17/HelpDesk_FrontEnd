
import React, {useEffect, useState } from 'react'
import axios from 'axios'
import TimelineHistory from './TimelineHistory'

const History = ({...props}) => {
    const [historyIssues, setHistoryIssues] = useState([])
    useEffect(() => {
        const getHistory = () => {
            axios({
              method: 'get',
              url: `/api/1.0/issues/${props.id}/history`,
            })
              .then(response => {
                console.log('response:', response.data)
                response.data.history && setHistoryIssues(response.data.history)
              })
              .catch(err => {
                console.log(err)
                if (err.response && err.response.status === 401) {
                  localStorage.removeItem('isLoggedIn', false)
                }
              })
          }
          getHistory()
    }, [props.id])
    return(
      <TimelineHistory history={historyIssues}/>
    )
}

export default History;