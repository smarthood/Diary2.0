import React from 'react';
import '../styles/star.css'
import { Box, Typography,Button, Fade } from '@mui/material'
import { useEffect } from 'react'
import { useState } from 'react'
import { FcGoogle } from "react-icons/fc"
import { auth, singInWithGoogle, logout } from "../utils/firebase"
import Main from '../pages/Main';
import { GitHub, Instagram } from '@mui/icons-material';

export default function Home(){
    const [user, setUser] = useState(null);
    const [username, setUsername] = useState("");
    const[checked,setChecked] = useState(false)
    useEffect(()=>{
        setChecked(true)
    },[])
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
          if (authUser) {
            // user logged in
            // console.log(authUser);
            setUser(authUser);
    
            if (authUser.displayName) {
              // if they already have a username, don't do anything
            } else {
              // if they don't have a firebase displayName, set it to their username
              return authUser.updateProfile({
                displayName: username,
              });
            }
          } else {
            // user logged out
            setUser(null);
          }
        });
        return () => {
          // cleanup the listener
          unsubscribe();
        };
      }, [username, user]);
return(
  <div>
  {auth.currentUser ? (
    <Main />
    ):(
<div className="starContainer">
  <Box sx={{width:"100%",display:"flex",justifyContent:"flex-end" ,color:"white",right:"10px",padding:"10px 20px 0 0"}}>
    <a href="https://www.instagram.com/renold_dickson/">
    <Instagram />
    </a>
    <Box sx={{paddingInline:"10px"}}>
      <a href="https://github.com/smarthood">
    <GitHub />
      </a>
    </Box>
  </Box>
<div className="star"></div>
<div className="meteor-1"></div>
<div className="meteor-2"></div>
<div className="meteor-3"></div>
<div className="meteor-4"></div>
<div className="meteor-5"></div>
<div className="meteor-6"></div>
<div className="meteor-7"></div>
<div className="meteor-8"></div>
<div className="meteor-9"></div>
<div className="meteor-10"></div>
<div className="meteor-11"></div>
<div className="meteor-12"></div>
<div className="meteor-13"></div>
<div className="meteor-14"></div>
<div className="meteor-15"></div>
<Box>
    <Fade in={checked} {...(checked?{timeout:3000}:{})} collapsedHeight={50}>
    <Box sx={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",height:"100vh"}}>
        <Typography sx={{fontSize:"2rem",color:"white",textAlign:"center"}}>Start Write Your<span className='diary-text'> Diary</span> </Typography>
        <Button startIcon={<FcGoogle />} onClick={user ? logout : singInWithGoogle} variant="contained" sx={{background:"white",color:"black",marginTop:"30px"}}>
        {auth.currentUser && auth.currentUser.displayName ? (
                <span>Logout</span>
              ) : (
                <span>Sign in with Google</span>
              )}
        </Button>
    </Box>
    </Fade>
    </Box>
</div>)}
</div>
);
}