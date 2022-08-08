import React from 'react';
import { makeStyles } from '@mui/styles';
import {Grid, Card, CardMedia, Typography,CardContent, CardActions, Button, Box, Stack, Drawer, Divider} from '@mui/material'
import { useState, useEffect } from 'react'
import {collection,orderBy,query,onSnapshot,deleteDoc,doc} from 'firebase/firestore'
import { db,auth,storage,logout } from '../utils/firebase'
import Navbar from '../components/Navbar'
import Add from '../components/Add'
import {  List, ListItem, ListItemButton, ListItemIcon,ListItemText } from '@mui/material';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import entry from '../images/enter.png'
import { toast } from 'react-toastify';
import { deleteObject, ref } from 'firebase/storage';
import { Logout, Search,Timeline,Home } from '@mui/icons-material';

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
      color: 'CaptionText'
    },
    FeaturesContainer: {
        height: '100vh',
        background: 'pink'
      }
}));
export default function Main(){
const classes = useStyles();
const [notes,setNotes]=useState([])
const [isDrawerOpen,setIsDrawerOpen] = useState(false)

const handleDelete=async(id,image)=>{
  try {
    await deleteDoc(doc(db,auth.currentUser.uid,id))
    const storageRef = ref(storage,image)
    await deleteObject(storageRef)
    toast("Entry deleted!",{type:"success"})
    }
     catch (e) {
      toast("Error :(",{type:"error"})
      console.log(e);
    }
  }
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
       <ListItemButton>
         <ListItemIcon>
           <AutoStoriesIcon />
         </ListItemIcon>
         <ListItemText primary="Album" />
       </ListItemButton>
     </ListItem>
     <ListItem  >
       <ListItemButton>
         <ListItemIcon>
           <Search />
         </ListItemIcon>
         <ListItemText primary="Search" />
       </ListItemButton>
     </ListItem>
     <ListItem  >
       <ListItemButton>
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
  <Box>
  <Navbar setIsDrawerOpen={setIsDrawerOpen}/>
    <Add />
     <Stack direction='row' justifyContent="space-between">
    <Box flex={1} sx={{background: "white",height: "100vh", boxShadow: 5,display: { xs: 'none', sm: 'block' } ,left: 0}}>
      <Box sx={{position: "fixed"}} >
    {Items}
      </Box>
  </Box>
  <Drawer anchor='left' open={isDrawerOpen} onClose={()=>setIsDrawerOpen(false)}>
    {Items}
  </Drawer>
<Box flex={10} p={3} component="div" maxWidth="md">
    <Grid  container spacing={4}  >
        {notes.length === 0 ? (
          <Box sx={{display:"flex",flexDirection: "column",alignItems: "center",width: "100%",height: "100vh"}}>
            <Box component="img" src={entry} alt="nothing" width="350px"></Box>
          <Typography >Not written anything 😶</Typography>
          </Box>
          ):(
            notes.map(({id,title,description,createAt,image})=>
              <Grid key={id}  item xs={12} md={4}  sm={6}>
                <Card className={classes.Card}>
                  <CardMedia image={image}  className={classes.CardMedia} />
                  <CardContent>
                    <Typography gutterBottom variant='h6'>{title}</Typography>
                    <Typography className={classes.title}>{createAt.toDate().toDateString()}</Typography>
                  </CardContent>
                  <CardActions>
                    <Button>View</Button>
                    <Button onClick={() => handleDelete(id,image)}>Delete</Button>
                  </CardActions>
                </Card>
               </Grid>)
        )}
        </Grid>
        </Box>
        </Stack>
        </Box>
);
}