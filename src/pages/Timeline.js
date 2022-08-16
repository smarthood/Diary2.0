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
import notes from './Main'
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
      {notes.map(({id,title,description})=>
        <TimelineItem>
          <TimelineOppositeContent color="text.secondary">
          {id}
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot variant="outlined" color="primary"/>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>{title}</TimelineContent>
        </TimelineItem>
        )}
      </Timeline>
    </div>
  )
}
