import React, { useEffect, useState } from 'react'
import SecondNav from '../components/SecondNav'
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import notes from './Main'
export default function TimeLine() {
  return (
    <div>
      <SecondNav title={"Timeline"} />
      <Timeline position="alternate">
        <TimelineItem>
          <TimelineOppositeContent color="text.secondary">
          18/11/2001
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot variant="outlined" color="primary"/>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>title</TimelineContent>
        </TimelineItem>
      </Timeline>
    </div>
  )
}
