import React ,{useState} from 'react'
import '../styles/App.css'
import { Box } from '@mui/system'
import { AppBar, Button, ButtonGroup, Drawer, IconButton, LinearProgress, Stack, Toolbar, Typography } from '@mui/material'
import { ArrowBack, PhotoCamera } from '@mui/icons-material'
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import {addDoc, collection, Timestamp} from 'firebase/firestore';
import {getDownloadURL, ref, uploadBytesResumable} from 'firebase/storage'
import { storage } from '../utils/firebase'
import { ToastContainer, toast } from 'react-toastify';
import { db,auth } from '../utils/firebase'
import 'react-toastify/dist/ReactToastify.css';
import {Link} from 'react-router-dom'

export default function Left() {
  const [isDrawerOpen,setIsDrawerOpen]=useState(false)
const [progressBar,setProgressBar]=useState(0)
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
      image: "",
      createdAt: Timestamp.now().toDate()
    }
  )
  const handleOnChange=(e)=>{
    setFormData({...formData,[e.target.name]:e.target.value})
  }
  const handleImageChange=(e)=>{
    setImageUrl(URL.createObjectURL(e.target.files[0]))
    setFormData({...formData,image:e.target.files[0]});
  }
  const handleOnSubmit=()=>{
      if(!formData.title||!formData.desc||!formData.image){
        alert("Write all required field")
        return;
      }
      const storageref = ref(storage,`/images/${Date.now()}${formData.image.name}`);
      const uploadImage=uploadBytesResumable(storageref,formData.image)
      uploadImage.on("state_changed",
      (snapshot)=>{
        const progressPercent = Math.round((snapshot.bytesTransferred/snapshot.totalBytes)*100);
        setProgressBar(progressPercent)
      },
      (err)=>{
        console.log(err)
      },
      ()=>{
        setFormData({
          title: "",
          desc: "",
          image: null
        });
        getDownloadURL(uploadImage.snapshot.ref)
        .then((url)=>{
          const notesRef = collection(db,auth.currentUser.uid);
          addDoc(notesRef,{
            title: formData.title,
            description: formData.desc,
            image: url,
            createAt: Timestamp.now().toDate() 
          })
          .then(()=>{
            setProgressBar(0);
          })
          .catch((err)=>{
            toast("Error in submission",{type: "error"});
          })
        })
      })
  }
   const [imageUrl, setImageUrl] = useState("https://c4.wallpaperflare.com/wallpaper/974/841/151/kimi-no-na-wa-minimalism-wallpaper-preview.jpg");
  return (
    <Box bgcolor="dodgerblue" minHeight="100vh" overflow={'hidden'}>
     <LinearProgress variant="determinate" color="warning" value={progressBar} />
      <Stack direction="row" justifyContent="space-between">
    <Box flex={8}>
    <AppBar sx={{color:"white",zIndex:"0"}} color="transparent" position="static" elevation="0" >
        <Toolbar sx={{ displey: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between'}}>
             <Link to="/">
       <Box sx={{zIndex:"50000"}}>
      <IconButton sx={{position: "absolute",left:"10px",top:"10px"}}>
        <ArrowBack />
      </IconButton>
      </Box>
      </Link>
        <Button variant="container" onClick={()=>setIsDrawerOpen(true)} sx={{background:"white",color:"black",display:{md:"none"},marginRight:"10px"}}>
          Preview
        </Button>
        </Toolbar>
      </AppBar>
        <ToastContainer/>
        <Box sx={{width:{xs:"100vw",md:"100%"},paddingLeft:{xs:"10%"}}}>
      <Box 
      id="frm"
      component="form" sx={{
        paddingInline:{md:"80px",xs:"0"},
        display: 'flex',
        flexDirection: "column",
        marginRight: {xs:"80px"},
        maxWidth:"100%",
      }}>
     <input type="text" className="input" name="title" placeholder="Title here....." value={formData.title} onChange={(e)=>handleOnChange(e)}/>
      <textarea  id="text-box" cols="30" name="desc" placeholder="How is your day today?" rows="10" value={formData.desc} onChange={(e)=>handleOnChange(e)}></textarea>
        <Box sx={{display:"flex",justifyContent:"flex-start",marginTop: "20px"}}>
    <Button variant="contained" sx={{backgroundColor: "white",color: "black",'&:hover': {
      backgroundColor: 'white',
      color: 'black',
  }}} component="label" >
  Upload
  <input hidden accept="image/*" name="image" onChange={handleImageChange} type="file" />
</Button>
<IconButton color="primary" aria-label="upload picture" component="label">
  <PhotoCamera  sx={{color: "white"}}/>
</IconButton>
      </Box>
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
    </Box>
    <Drawer anchor='right' open={isDrawerOpen} onClose={()=>setIsDrawerOpen(false)}>
      <Box>
      <IconButton onClick={()=>setIsDrawerOpen(false)} sx={{position: "absolute",left:"10px",top:"10px"}}>
        <ClearOutlinedIcon />
      </IconButton>
      </Box>
    <Box id="text_wrap" maxWidth="500px"  minHeight="100vh" p={3} flex={4} sx={{ boxShadow: 3}}>
      <Box component="div" className="lines">
      <Typography sx={{margin:{sm: "15px 15px 0 0",color: "black"},textAlign: "right"}}>{date}</Typography>
      <Typography sx={{fontFamily: 'Edu VIC WA NT Beginner',fontSize:"30px",textAlign:"center",textTransform:"capitalize"}}>{formData.title}</Typography>
      <Box component="div" sx={{display: "flex",justifyContent:"center"}}>
      <div className="img-tape img-tape--2">
    <Box
        component="img"
        sx={{
          height: "auto",
          width: 250,
          border: "5px solid white",
          marginInline:5
        }}
        alt="The house from the offer."
        src={imageUrl}
        />
        </div>
        </Box>
      <Box sx={{marginLeft:"15%"}}>
    <Typography sx={{fontFamily:"Shadows Into Light",fontSize:"20px",marginTop:"10px"}}>{formData.desc}</Typography>
      </Box>
        </Box>
    </Box>
  </Drawer>
    <Box id="text_wrap" maxWidth="500px"  minHeight="100vh" p={3} flex={4} sx={{ boxShadow: 3,display: { xs: 'none', md: 'block',sm: 'none' }}}>
      <div className="lines">
      <Typography sx={{margin:{sm: "15px 15px 0 0",color: "black"},textAlign: "right"}}>{date}</Typography>
      <Typography sx={{fontFamily: 'Edu VIC WA NT Beginner',fontSize:"30px",textAlign:"center",textTransform:"capitalize"}}>{formData.title}</Typography>
      <Box component="div" sx={{display: "flex",justifyContent:"center"}}>
      <div className="img-tape img-tape--a">
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
        src={imageUrl}
        />
        </div>
        </Box>
      <Box sx={{marginLeft:"15%"}}>
    <Typography sx={{fontFamily:"Shadows Into Light",fontSize:"20px",marginTop:"10px"}}>{formData.desc}</Typography>
      </Box>
        </div>
    </Box>
      </Stack>
    </Box>
  )
}
