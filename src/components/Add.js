import React from 'react'
import {Add as AddIcon} from '@mui/icons-material'
import { Fab } from '@mui/material'
import { Container } from '@mui/system'
import { Link } from 'react-router-dom'

export default function Add() {
  return (
    <Container>
      <Link to="/add">
    <Fab color= 'primary' sx={{
        position: 'fixed',
        bottom: 20,
        left: "80%",
        display: {md:"none"}
    }}>
        <AddIcon />
    </Fab></Link>
    </Container>
  )
}
