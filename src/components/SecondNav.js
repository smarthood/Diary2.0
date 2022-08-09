import { ArrowBack } from '@mui/icons-material'
import { AppBar, Typography, Toolbar, IconButton } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

export default function SecondNav({title}) {
  return (
    <>
    <AppBar>
        <Toolbar>
        <Link to="/">
            <IconButton>
                <ArrowBack />
            </IconButton>
        </Link>
        <Typography>{title}</Typography>
        </Toolbar>
    </AppBar>
    <Toolbar />
    </>
  )
}
