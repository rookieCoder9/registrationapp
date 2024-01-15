import { Box, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';

export const Dashboard = () => {
    const history=useLocation();
    const [data,setData]=useState(null);
    useEffect(() => {
        const id =  history.state.id;
        fetch(`http://localhost:3001/user/${id}`)
          .then(response => response.json())
          .then(data => {
            setData(data);
          })
          .catch(error => {
            console.error('Error:', error);
          });
      }, []); 
  return (
   <Box>
      <Stack sx={{width:"80%",mx:"auto",p:{lg:"2rem",xl:"2rem",xs:"1rem",s:"1rem"}}}>
        <Box>
         <Typography variant='h4' fontWeight={800}> Dashboard</Typography>
         </Box>
         <Box sx={{width:"20%",mx:"auto"}}>
            <img style={{width:"100%"}}  alt='profile-img' src='https://www.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-600nw-2281862025.jpg'></img>
         </Box>
         <Box>
            { data ?
            <Box sx={{textAlign:"center"  }}>
                
            <Typography variant='h6'> Name : {data.user.username} </Typography>
            <Typography variant='h6'> Email : {data.user.email} </Typography>
            <Typography variant='h6'> Phone : {data.user.phone} </Typography>
            <Typography variant='h6'> Pasword : {data.user.password} </Typography>
            </Box>
            : 
            <Typography> Loading</Typography>
}
         </Box>
      </Stack>
   </Box>
  )
}

