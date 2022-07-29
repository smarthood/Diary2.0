import React from 'react';
import { makeStyles } from '@mui/styles';
import {Grid,Container, Card, CardMedia, Typography,CardContent, CardActions, Button, Box} from '@mui/material'
import Bg from '../images/card.png';
import { useState, useEffect } from 'react'
import {collection,orderBy,query,onSnapshot} from 'firebase/firestore'
import { db } from '../utils/firebase'

const useStyles = makeStyles((theme) => ({
    GridContainer: {
        padding: '20px 0',
        background: 'blue'
      },
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
export default function Content(){
const classes = useStyles();
const [notes,setNotes]=useState([])
useEffect(()=>{
        const noteRef = collection(db,"Notes")
        const q= query(noteRef, orderBy("date","desc"));
        onSnapshot(q,(snapshot)=>{
            const notes = snapshot.docs.map((doc)=>({
                id:doc.id,
                ...doc.data(),
            }));
            setNotes(notes);
            console.log(notes)
        })
    },[])
return(
<Box flex={6} component="div" sx={{ p: 3 }}>
        {notes.length === 0 ? (
          <Typography sx={{textAlign:"center"}}>Not written anything 😶</Typography>
          ):(
            notes.map(({id,title,description,date})=>
            <Container key={id} className={classes.GridCOntainer}  maxWidth='md'>
            <Grid container spacing={4}  >
              <Grid item xs={12} md={4}  sm={6}>
                <Card className={classes.Card}>
                  <CardMedia image={Bg}  className={classes.CardMedia} />
                  <CardContent>
                    <Typography gutterBottom variant='h6'>18/11/2001</Typography>
                    <Typography className={classes.title}>My Today Experiance</Typography>
                  </CardContent>
                  <CardActions>
                    <Button>View</Button>
                    <Button>Edit</Button>
                  </CardActions>
                </Card>
               </Grid>
               </Grid>
            </Container>)  
        )}
        </Box>
);
}