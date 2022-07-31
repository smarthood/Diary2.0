import React from 'react';
import { makeStyles } from '@mui/styles';
import Star from './Star';
import { Box } from '@mui/system';
import { Collapse, CssBaseline, Typography } from '@mui/material';

const useStyles = makeStyles((theme) => ({

}));
export default function Home(){
const classes = useStyles();
return(
<Box>
<Star />
<CssBaseline />
<Collapse in={checked} {...(checked?{timeout:1000}:{})} collapsedHeight={50}>
<Typography>Start Write Your<br /><span> Diary </span>Today</Typography>
</Collapse>
</Box>
);
}