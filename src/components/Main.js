import React from 'react'
import Navbar from './Navbar'
import { Stack, Box} from '@mui/material'
import { makeStyles } from '@mui/styles'
import Add from './Add'
import SideBar from './SideBar'
import Content from './Content'



const useStyles = makeStyles({ 
Container: {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between'
},
});

export default function Main() {
  
  const classes=useStyles();
    
  return (
      <Box >
    <Navbar />
    <Add />
    <Stack className={classes.Container}  direction='row' justifyContent="space-around">
     <SideBar sx={{position:'fixed'}} />
     <Content />
        </Stack>
        </Box>
  )
}
