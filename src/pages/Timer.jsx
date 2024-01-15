import { Box, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
function convertSecondsToHMS(totalSeconds) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = Math.floor(totalSeconds % 60);

  return { hours, minutes, seconds };
}
export const Shimmer= ()=> {
  return (
  <Box sx={{height:"100vh",pt:"3rem",bgcolor:"#F8F8F8",overflow:"hidden"}}>
      <Box
        sx={{

           height:"273px",
          
          
       mt:"3rem",
                  mx: "auto",
          maxWidth: "450px",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        overflow:"hidden",
          bgcolor:"white",
         
        }}
      >

      </Box>
    </Box>
  )
}
export const Timer = ({secondsLeft}) => {
    const nav=useNavigate();
    const history=useLocation();
  const [secondsleft, setSecondsLeft] = useState(secondsLeft);
   const {hours,minutes,seconds}=convertSecondsToHMS(secondsleft);
  useEffect(() => {
       let timeoutID;
       if (secondsleft) {
     timeoutID = setTimeout(() => {
         
      setSecondsLeft((prevTime) => prevTime-1);
    }, 1000);
}
   
    return () => {
     
      clearTimeout(timeoutID);
    };
  }, [secondsleft]);

  useEffect( ()=> {
    if (secondsleft === 0) {
       
         nav('/dashboard',{state:{...history.state}});
    }
  } , [secondsleft,nav,history])
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
            You have Registered successfully ! Dashboard will be available in  <br></br> {hours} Hr {minutes} Min {seconds} Sec
          </Typography>

        
        </Box>
        <Box height={"3rem"} sx={{width:"100%",bgcolor:"#3FBDED"}}></Box>
      </Box>
    </Box>
  );
};

export const Wrapper = () => {
  const history=useLocation();
  const [data,setData]=useState(null);
  const nav=useNavigate();
  useEffect(() => {
      const id =  history.state.id;
      fetch(`http://localhost:3001/status/${id}`)
        .then(response => response.json())
        .then(data => {
          setData(data);
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }, []); 

    useEffect( ()=> {
      if (data  && data.secondsleft === 0) {
         
           nav('/dashboard',{state:{...history.state}});
      }
    } , [data])

   return (
    <Box>
      {data ? <Timer secondsLeft={Math.ceil(data.secondsLeft)} ></Timer>:
      <Shimmer></Shimmer>}
    </Box>
   )
}
