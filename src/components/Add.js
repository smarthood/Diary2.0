import React from 'react'
import {Add as AddIcon} from '@mui/icons-material'
import { Fab, Typography } from '@mui/material'
import { Box, Container } from '@mui/system'
import { Link } from 'react-router-dom'

export default function Add() {
  return (
    <Container>
      <Link to="/add_new">
    <Fab color= 'primary' sx={{
        position: 'fixed',
        bottom: 20,
        left: {xs:'80%',md: '80px'}
    }}>
        <AddIcon />
    </Fab></Link>
    </Container>
  )
}
