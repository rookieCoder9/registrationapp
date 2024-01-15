import { Alert, Snackbar } from '@mui/material'
import React from 'react'

const ErrorHandler = ({showAlert,setShowAlert,errorMsg}) => {
  return (
    <Snackbar
    open={showAlert}
    autoHideDuration={6000}
    onClose={() => setShowAlert(false)}
  >
    <Alert
      onClose={() => setShowAlert(false)}
      severity="error"
      sx={{ width: "100%" }}
    >
      {errorMsg}
    </Alert>
  </Snackbar>
  )
}

export default ErrorHandler