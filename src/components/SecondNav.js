import { ArrowBack } from '@mui/icons-material'
import { AppBar, Typography, Toolbar, IconButton } from '@mui/material'
import React from 'react'

export default function SecondNav({title,setTLDrawerOpen,setALDrawerOpen,setDLDrawerOpen}) {
const changeDrawerState=()=>{
  if(title==="Album"){
    setALDrawerOpen(false)
  }
  else if(title==="Calender"){
    setDLDrawerOpen(false)
  }
  else{
    setTLDrawerOpen(false)
  }
}
  return (
    <>
    <AppBar>
        <Toolbar>
            <IconButton onClick={changeDrawerState}>
                <ArrowBack />
            </IconButton>
        <Typography>{title}</Typography>
        </Toolbar>
    </AppBar>
    <Toolbar />
    </>
  )
}
