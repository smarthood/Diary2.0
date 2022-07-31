import React from 'react';
import { makeStyles } from '@mui/styles';
import {Grid, Card, CardMedia, Typography,CardContent, CardActions, Button, Box, Stack} from '@mui/material'
import { useState, useEffect } from 'react'
import {collection,orderBy,query,onSnapshot} from 'firebase/firestore'
import { db } from '../utils/firebase'
import Navbar from './Navbar'
import Add from './Add'
import {  List, ListItem, ListItemButton, ListItemIcon,ListItemText } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import GradeIcon from '@mui/icons-material/Grade';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import HomeIcon from '@mui/icons-material/Home';
import entry from '../images/enter.png'

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
      fontFamily: 'Anton',
      color: 'grey'
    },
    FeaturesContainer: {
        height: '100vh',
        background: 'pink'
      }
}));
export default function Main(){
const classes = useStyles();
const [notes,setNotes]=useState([])
useEffect(()=>{
        const noteRef = collection(db,"Notes")
        const q= query(noteRef, orderBy("createAt","desc"));
        onSnapshot(q,(snapshot)=>{
            const note = snapshot.docs.map((doc)=>({
                id:doc.id,
                ...doc.data(),
            }));
            setNotes(note);
            console.log(note)
        })
    },[])
return(
  <Box>
  <Navbar />
    <Add />
     <Stack direction='row' justifyContent="space-between">
    <Box flex={1} p={2}  sx={{background: "white",height: "100vh", boxShadow: 3,display: { xs: 'none', sm: 'block' } ,left: 0}}>
      <Box sx={{position: "fixed"}} >
    <List>
       <ListItem >
            <ListItemButton>
              <ListItemIcon>
                <HomeIcon />
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
                <CalendarMonthIcon />
              </ListItemIcon>
              <ListItemText primary="calendar" />
            </ListItemButton>
          </ListItem>
          <ListItem >
            <ListItemButton>
              <ListItemIcon>
                <GradeIcon />
              </ListItemIcon>
              <ListItemText primary="Important" />
            </ListItemButton>
          </ListItem>
          </List>
          </Box>
  </Box>
<Box flex={7} p={3} component="div" maxWidth="md">
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
                    <Typography gutterBottom variant='h6'>{createAt.toDate().toDateString()}</Typography>
                    <Typography className={classes.title}>{title}</Typography>
                  </CardContent>
                  <CardActions>
                    <Button>View</Button>
                    <Button>Delete</Button>
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