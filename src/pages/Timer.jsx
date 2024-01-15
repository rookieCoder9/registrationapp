import { Box, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const Timer = () => {
    const nav=useNavigate();
    const history=useLocation();
  const [seconds, setSeconds] = useState(10);
  useEffect(() => {
       let timeoutID;
       if (seconds) {
     timeoutID = setTimeout(() => {
         
      setSeconds((prevTime) => prevTime-1);
    }, 1000);
}
   
    return () => {
     
      clearTimeout(timeoutID);
    };
  }, [seconds]);

  useEffect( ()=> {
    if (seconds === 0) {
       
         nav('/dashboard',{state:{...history.state}});
    }
  } , [seconds,nav,history])
  return (
    <Box sx={{height:"100vh",pt:"3rem",bgcolor:"#F8F8F8",overflow:"hidden"}}>
      <Box
        sx={{

          
       mt:"3rem",
                  mx: "auto",
          maxWidth: "450px",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        overflow:"hidden",
          bgcolor:"white",
         
        }}
      >
             <Box sx={{px:"2rem",textAlign:"center",py:"1rem"}}>
            <Typography  variant="h5"> Hang Tight ! </Typography>
         </Box>
         <Box sx={{p:"2rem",textAlign:"center"}}>
          <Typography  variant="h6">
            You have Registered successfully ! <br></br> You will be redirected to
            Dashboard in {seconds} seconds.
          </Typography>

        
        </Box>
        <Box height={"3rem"} sx={{width:"100%",bgcolor:"#3FBDED"}}></Box>
      </Box>
    </Box>
  );
};
