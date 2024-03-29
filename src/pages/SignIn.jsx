import React, { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { Box, Button, Input, Stack, Typography } from "@mui/material";
import ErrorHandler from "../utils/ErrorHandler";

 

export const SignIn = () => {
  const nav = useNavigate();

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const [showAlert, setShowAlert] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}


const [data, setData] = useState(null); 

const sendData = async (body) => {
   
  try {
    const response = await fetch('http://localhost:3001/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',

      },

      body: JSON.stringify(body)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseData = await response.json();
    setData(responseData);
  } catch (error) {
    setShowAlert(true);
    setErrorMsg(error.message);
    setData(null);
  }
};

  const handleSignIn = async (e) => {
    e.preventDefault();

    const userData = {  email, password };


    if (!validateEmail(email)) {
        setShowAlert(true);
        setErrorMsg(`${email} is a valid email address.`);
        return ;
    } 

    if (password.length < 8) {
        setShowAlert(true);
        setErrorMsg('Enter a password of atleast 8 charactors')
        return;
    }

   sendData(userData);
    
 
  };
  useEffect ( ()=> {
    if (data) {
        nav('/timer',{state:{id:data.id}})
    }

  },[data])



  return (
    <div>
   
      <Box
        sx={{
      

          flexDirection: "row",

          display: "flex",
          backgroundSize: "cover",
         minHeight:"100vh",
          alignItems: "center",
          background: "white",
        }}
      >
  
        <Stack
          sx={{
            bgcolor: "white",
            m: "auto",
            border: "1px solid lightgray",
            flexDirection: "column",
            borderRadius: "20px",
      
            width: "400px",
          }}
        >
                 <ErrorHandler
                showAlert={showAlert}
                setShowAlert={setShowAlert}
                errorMsg={errorMsg}
              ></ErrorHandler>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              p: "1rem",
              mb: "2rem",
              borderBottom: "1px solid lightgray",
            }}
          >
            <Typography variant="h6" color="black" fontWeight="700">
             Login
            </Typography>
          </Box>
        
            <Box
              sx={{
                px: "2rem",
                py: "2rem",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  border: "1px solid ",
                  borderColor: "#B0B0B0",
                  width: "100%",
                  borderRadius: "10px",
                }}
              >
         
              
                <Box sx={{ width: "100%", borderBottom: "1px solid #B0B0B0" }}>
                  <Input
                    fullWidth
                    value={email}
                    disableUnderline={true}
                    sx={{ px: "1rem", py: "0.5rem" }}
                    type="email"
                    required="true"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Box>
                <Box sx={{ width: "100%" }}>
                  <Input
                    value={password}
                    disableUnderline={true}
                    sx={{ px: "1rem", py: "0.5rem" }}
                    fullWidth
                    required="true"
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Box>
              </Box>
            

              <Box
                sx={{
                  width: "100%",
                  p: "1rem",
                  pt: "2rem",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={handleSignIn}
                >
                Login
                </Button>
              </Box>
           
           
            </Box>
         
        </Stack>
      </Box>
    </div>
  );
};