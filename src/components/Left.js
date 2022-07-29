import React ,{useState,useEffect} from 'react'
import '../styles/App.css'
import { Box } from '@mui/system'
import { AppBar, Button, ButtonGroup, IconButton, Stack, Toolbar, Typography } from '@mui/material'
import { PhotoCamera } from '@mui/icons-material'
import {Timestamp} from 'firebase/firestore';
export default function Left() {

  const today = new Date()
  var date = today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear();
  const handleClear=()=>{
    document.getElementById("frm").reset()
    document.getElementById('text-box').value = '';
    setFormData("")
  }
  const [formData,setFormData]=useState(
    {
      title: "",
      desc: "",
      image: "null",
      createdAt: Timestamp.now().toDate()
    }
  )
  const handleOnChange=(e)=>{
    setFormData({...formData,[e.target.name]:e.target.value})
  }
  const handleImageChange=(e)=>{
    setSelectedImage(e.target.file[0])
    setFormData({...formData,image:selectedImage});
  }
  const handleOnSubmit=()=>{
      if(!formData.title||!formData.desc||!formData.image){
        alert("Write all required field")
        return;
      }
  }
   const [imageUrl, setImageUrl] = useState(null);
  const [selectedImage,setSelectedImage]=useState(null)
  useEffect(() => {
    if (selectedImage) {
      setImageUrl(URL.createObjectURL(selectedImage));
    }
  }, [selectedImage]);
  console.log(imageUrl)
  return (
    <Box bgcolor="dodgerblue" minHeight="100vh">
      <Stack direction="row" justifyContent="space-between">
    <Box flex={8}>
    <AppBar sx={{color:"white",zIndex:"0"}} color="transparent" position="fixed" elevation="0" >
        <Toolbar sx={{ displey: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between'}}>
        <Typography variant='h5' sx={{fontFamily: 'Anton',fontSize: '30px'}}>TODAY'S ADVENTURE</Typography>
        <Typography sx={{marginRight:{sm: "5px",color: "black"}}}>{date}</Typography>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <Box 
      id="frm"
      component="form" sx={{
        paddingInline: "80px",
        display: 'flex',
        flexDirection: "column",
      }}>
        <Box sx={{display:"flex",justifyContent:"center",marginBottom: "20px"}}>
    <Button variant="contained" sx={{backgroundColor: "white",color: "black",'&:hover': {
      backgroundColor: 'white',
      color: 'black',
  }}} component="label" >
  Upload
  <input hidden accept="image/*" name="image" onChange={(e)=>handleImageChange(e)} type="file" />
</Button>
<IconButton color="primary" aria-label="upload picture" component="label">
  <PhotoCamera  sx={{color: "white"}}/>
</IconButton>
      </Box>
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
    <Box id="text_wrap" maxWidth="500px"  minHeight="100vh" p={3} flex={4} sx={{ boxShadow: 3,display: { xs: 'none', sm: 'block' }}}>
      <div className="lines">

      <Box component="div" sx={{display: "flex",justifyContent:"center"}}>
      <div class="img-tape img-tape--2">
    <Box
        component="img"
        sx={{
          height: 233,
          width: 250,
          maxHeight: {  md: 167 },
          maxWidth: { md: 250 },
          border: "5px solid white"
        }}
        alt="The house from the offer."
        src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2"
        />
        </div>
        </Box>
      <Box sx={{marginLeft:"15%"}}>
    <Typography sx={{fontFamily: 'Edu VIC WA NT Beginner',fontSize:"30px",textAlign:"center",textTransform:"capitalize"}}>{formData.title}</Typography>
    <Typography sx={{fontFamily:"Shadows Into Light",fontSize:"20px",marginTop:"10px"}}>{formData.desc}</Typography>
      </Box>
        </div>
    </Box>
      </Stack>
    </Box>
  )
}
