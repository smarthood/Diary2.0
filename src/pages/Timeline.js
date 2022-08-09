import React, { useEffect, useState } from 'react'
import SecondNav from '../components/SecondNav'
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import {auth,db} from '../utils/firebase'
import {collection,orderBy,query,onSnapshot} from 'firebase/firestore'

export default function TimeLine() {
//   const [notes,setNotes]=useState([])
//   useEffect(()=>{
//     const noteRef = collection(db,auth.currentUser.uid)
//     const q= query(noteRef, orderBy("createAt","desc"));
//     onSnapshot(q,(snapshot)=>{
//         const note = snapshot.docs.map((doc)=>({
//             id:doc.id,
//             ...doc.data(),
//         }));
//         setNotes(note);
//     })
// },[])
  return (
    <div>
      <SecondNav title={"Timeline"} />
      <Timeline position="alternate">
        <TimelineItem>
          <TimelineOppositeContent color="text.secondary">
          12/11/2012
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot variant="outlined" color="primary"/>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>dickson</TimelineContent>
        </TimelineItem>
      </Timeline>
    </div>
  )
}
