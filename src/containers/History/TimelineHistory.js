import { Timeline } from 'antd'
import React from 'react'
const TimelineHistory = (props) => {
    return(
        <div>
            <Timeline>
                {
                    props.history && props.history.map(histElem => (  
                        <Timeline.Item>{
                            histElem.created_at + " " + 
                            histElem.created_by.first_name + " " + 
                            histElem.created_by.last_name + " " +
                            histElem.description + " " +
                            histElem.original_value + ' на ' + histElem.new_value
                        }</Timeline.Item>
                    ))
                }
            </Timeline>
        </div>
    )
}

export default TimelineHistory
