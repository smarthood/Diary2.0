import React from 'react';
import { makeStyles } from '@mui/styles';
import {Grid, Card, CardMedia, Typography,CardContent, CardActions, Button, Box, Stack, Divider, Paper} from '@mui/material'
import { useState, useEffect } from 'react'
import {collection,orderBy,query,onSnapshot,deleteDoc,doc} from 'firebase/firestore'
import { db,auth,storage,logout } from '../utils/firebase'
import Navbar from '../components/Navbar'
import Add from '../components/Add'
import {  List, ListItem, ListItemButton, ListItemIcon,ListItemText,DialogTitle,DialogContent,DialogContentText,DialogActions,Dialog } from '@mui/material';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import entry from '../images/enter.png'
import { ToastContainer,toast } from 'react-toastify';
import { deleteObject, ref } from 'firebase/storage';
import { Logout,Timeline,Home } from '@mui/icons-material';
import DrawerComponent from '../components/DrawerComponent';
import LeftBar from '../components/LeftBar';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import TimeLine from './Timeline';
import Album from './Album';


const useStyles = makeStyles((theme) => ({
      Card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
      },
      CardMedia: {
        padding: '26.25%'
      },
    CardContent: {
      flexGrow: 1
    },
    title: {
      fontFamily: 'Source Sans Pro',
      color: 'CaptionText',
      textTransform:"capitalize"
    },
    FeaturesContainer: {
        height: '100vh',
        background: 'pink'
      }
}));
export default function Main(){
const classes = useStyles();
const [isTLDrawerOpen,setTLDrawerOpen]=useState(false)
const [isALDrawerOpen,setALDrawerOpen]=useState(false)
const [data,setData]=useState([])
const [notes,setNotes]=useState([])
const [isDrawerOpen,setIsDrawerOpen] = useState(false)
const [open, setOpen] = useState(false);
const theme = useTheme();
const handleDelete=async(id,image)=>{
  if (window.confirm('Are you sure you wish to delete this item?')){
  try {
    await deleteDoc(doc(db,auth.currentUser.uid,id))
    const storageRef = ref(storage,image)
    await deleteObject(storageRef)
    toast("Entry deleted!",{type:"success"})
    }
     catch (e) {
      toast("Error :(",{type:"error"})
      console.log(e);
    }}
  }
  const handleClickOpen = (id) => {
    const res=notes.find((item)=>{
      return item.id===id
    })
    setData(res)
    setOpen(true);
  };
       const handleClose = () => {
    setOpen(false);
  };
  const tdata = notes.reverse()
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
const Items = (<List>
  <ListItem >
       <ListItemButton>
         <ListItemIcon>
           <Home />
         </ListItemIcon>
         <ListItemText primary="Home " />
       </ListItemButton>
     </ListItem>
     <ListItem >
       <ListItemButton onClick={()=>setALDrawerOpen(true)} >
         <ListItemIcon>
           <AutoStoriesIcon />
         </ListItemIcon>
         <ListItemText primary="Album" />
       </ListItemButton>
     </ListItem>
     <ListItem  >
       <ListItemButton onClick={()=>setTLDrawerOpen(true)}>
         <ListItemIcon>
           <Timeline />
         </ListItemIcon>
         <ListItemText primary="Timeline" />
       </ListItemButton>
     </ListItem>
     <Divider />
     <ListItem >
       <ListItemButton onClick={logout}>
         <ListItemText primary="Logout" />
         <ListItemIcon>
           <Logout />
         </ListItemIcon>
       </ListItemButton>
     </ListItem>
     </List>)
useEffect(()=>{
        const noteRef = collection(db,auth.currentUser.uid)
        const q= query(noteRef, orderBy("createAt","desc"));
        onSnapshot(q,(snapshot)=>{
            const note = snapshot.docs.map((doc)=>({
                id:doc.id,
                ...doc.data(),
            }));
            setNotes(note);
        })
    },[])
return(
  <Paper>
  <Navbar setIsDrawerOpen={setIsDrawerOpen}/>
  <ToastContainer/>
    <Add />
    <TimeLine  isTLDrawerOpen={isTLDrawerOpen} setTLDrawerOpen={setTLDrawerOpen} tdata={tdata} />
    <Album  isALDrawerOpen={isALDrawerOpen} setALDrawerOpen={setALDrawerOpen} tdata={tdata} />
    <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        >
        <DialogTitle id="responsive-dialog-title" sx={{textTransform:"capitalize"}}>
          {data.title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
           {data.description}
          </DialogContentText>
        </DialogContent>
        <Box sx={{display:"flex",justifyContent:"center",alignItems:"center"}}>
        <Box component="img" src={data.image} sx={{width:{xs:"90%" ,md:"auto"}, height: {xs:"auto",md:"400px"},padding:"20px"}}/> 
        </Box>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
           Close
          </Button>
        </DialogActions>
      </Dialog>
     <Stack direction='row' justifyContent="space-between">
   <LeftBar Items={Items} />
  <DrawerComponent Items={Items} isDrawerOpen={isDrawerOpen} setIsDrawerOpen={setIsDrawerOpen}/>
<Box flex={10} p={3} component="div" maxWidth="md">
    <Grid  container spacing={4}  >
        {notes.length === 0 ? (
          <Box sx={{display:"flex",flexDirection: "column",alignItems: "center",width: "100%",height: "100vh"}}>
            <Box component="img" src={entry} alt="nothing" width="350px" loading='lazy'></Box>
          <Typography >Not written anything yet? 😶</Typography>
          </Box>
          ):(
            notes.slice(0).reverse().map(({id,title,description,createAt,image})=>
            <Grid key={id}  item xs={12} md={4}  sm={6}>
                <Card className={classes.Card}>
                  <CardMedia image={image}  className={classes.CardMedia} />
                  <CardContent>
                    <Typography gutterBottom variant='h6' sx={{textTransform:"capitalize"}}>{title}</Typography>
                    <Typography className={classes.title}>{createAt.toDate().toDateString()}</Typography>
                  </CardContent>
                  <CardActions>
                    <Button onClick={()=>handleClickOpen(id)}>View</Button>
                    <Button onClick={() => handleDelete(id,image)}>Delete</Button>
                  </CardActions>
                </Card>
               
               </Grid>))}
        </Grid>
        </Box>
        </Stack>
        </Paper>
);
}