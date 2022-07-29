import React from 'react';
import { makeStyles } from '@mui/styles';
import { styled } from '@mui/material/styles';
import { Box, List, ListItem, ListItemButton, ListItemIcon,ListItemText, Typography } from '@mui/material';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import GradeIcon from '@mui/icons-material/Grade';
import TimelineIcon from '@mui/icons-material/Timeline';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import Switch, { SwitchProps } from '@mui/material/Switch';


const useStyles = makeStyles((theme) => ({

}));
export default function SideBar(){
  const Items =(
    <List>
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
                <AutoStoriesIcon />
              </ListItemIcon>
              <ListItemText primary="Album" />
            </ListItemButton>
          </ListItem>
          <ListItem >
            <ListItemButton>
              <ListItemIcon>
                <TimelineIcon />
              </ListItemIcon>
              <ListItemText primary="Timeline " />
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
  )
  
const classes = useStyles();

return(
    <Box  flex={1} p={2} position="fixed" sx={{ boxShadow: 3,display: { xs: 'none', sm: 'block' } ,left: 0,height:'100vh'}}>
     {Items}
  </Box>
);
}