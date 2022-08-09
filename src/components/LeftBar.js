import React from 'react'
import {Box} from '@mui/material'
export default function LeftBar({Items}) {
  return (
    <Box flex={1} sx={{background: "white",height: "100vh", boxShadow: 5,display: { xs: 'none', sm: 'none',md:"block" } ,left: 0}}>
    <Box sx={{position: "fixed"}} >
    {Items}
    </Box>
    </Box>
  )
}
