import React ,{useState} from 'react'
import profile from '../images/boy.jpeg' 
import '../styles/App.css'
import Right from './Right'
import { Link } from 'react-router-dom'
import { Box } from '@mui/system'
import { AppBar, Button, ButtonGroup, IconButton, Stack, Toolbar, Typography } from '@mui/material'
import { PhotoCamera } from '@mui/icons-material'
import {Timestamp} from 'firebase/firestore';
export default function Left() {
  const today = new Date()
  var date = today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear();
  const handleClear=()=>{
    setFormData("")
  }
  const [formData,setFormData]=useState(
    {
      title: "",
      desc: "",
      image: "",
      createdAt: Timestamp.now().toDate()
    }
  )
  const handleOnChange=(e)=>{
    setFormData({...formData,[e.target.name]:e.target.value})
  }
  const handleImageChange=(e)=>{
    setFormData({...formData,image:e.target.file[0]});
  }
  const handleOnSubmit=()=>{
      if(!formData.title||!formData.desc||!formData.image){
        alert("Write all required field")
        return;
      }
  }
  return (
    <Box bgcolor="dodgerblue" minHeight="100vh">
      <Stack direction="row" justifyContent="space-between">
    <Box flex={8}>
    <AppBar sx={{color:"white",zIndex:"0"}} color="transparent" position="static" elevation="0" >
        <Toolbar sx={{ displey: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between'}}>
        <Typography variant='h5' sx={{fontFamily: 'Anton',fontSize: '30px'}}>TODAY'S ADVENTURE</Typography>
        <Typography sx={{marginRight:{sm: "5%"}}}>{date}</Typography>
        </Toolbar>
      </AppBar>
      <Box 
      id="frm"
      component="form" sx={{
        paddingInline: "80px",
        display: 'flex',
        flexDirection: "column",
      }}>
     <input type="text" className="input" name="title" placeholder="Title here....." value={formData.title} onChange={(e)=>handleOnChange(e)}/>
      <textarea  id="text-box" cols="30" name="desc" placeholder="How is your day today?" rows="10" value={formData.desc} onChange={(e)=>handleOnChange(e)}></textarea>
      <ButtonGroup variant="container" sx={{marginTop:"20px"}}>
      <Button  sx={{backgroundColor: "white",'&:hover': {
      backgroundColor: '#d5dfe0',
      color: 'black',
  }}} onClick={handleOnSubmit} >SUBMIT</Button> 
  <Button sx={{backgroundColor: "tomato",color: "white",'&:hover': {
      backgroundColor: 'red',
      color: 'black',
  }}} onClick={handleClear}>CLEAR</Button>
  </ButtonGroup>
      </Box>
    </Box>
    <Box bgcolor="white" minHeight="100vh" p={3} flex={3} sx={{ boxShadow: 3,display: { xs: 'none', sm: 'block' }}}>
      <Box sx={{display:"flex",justifyContent:"center"}}>
    <Button variant="outlined" component="label" >
  Upload
  <input hidden accept="image/*" name="image" onChange={(e)=>handleImageChange(e)} type="file" />
</Button>
<IconButton color="primary" aria-label="upload picture" component="label">
  <input hidden accept="image/*" type="file" />
  <PhotoCamera />
</IconButton>
      </Box>
    <Typography sx={{fontFamily: 'Edu VIC WA NT Beginner',fontSize:"30px",textAlign:"center",textTransform:"capitalize"}}>{formData.title}</Typography>
    <Typography sx={{fontFamily:"Shadows Into Light",fontSize:"20px",textTransform:"fir"}}>{formData.desc}</Typography>
    </Box>
      </Stack>
    </Box>
  )
}
