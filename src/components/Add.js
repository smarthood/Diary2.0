import React from 'react'
import { Add as AddIcon } from '@mui/icons-material'
import { Fab } from '@mui/material'
import { Container } from '@mui/system'
import { Link } from 'react-router-dom'
import { Button } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
export default function Add() {
  return (
    <Container>
      <Link to="/add">
        <Fab color='primary' sx={{
          position: 'fixed',
          bottom: 20,
          right: "5%",
          display: { md: "none" }
        }}>
          <AddIcon />
        </Fab></Link>
      <Link to="/add">
        <Button startIcon={<EditIcon  />} variant="contained" sx={{
          background: "dodgerblue", color: "white",
          position: 'fixed',
          bottom: 20,
          zIndex:100,
          right: "3%", display: { xs: "none", md: "flex" }, '&:hover': {
            backgroundColor: 'white',
          }
        }}>Add today's story</Button>
      </Link>
    </Container>
  )
}
