import React from 'react'
import { Snackbar, StylesProvider} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import userInfo from './userInfo';


export default function MessageNotification(props) {

    const { notify, setNotify } = props;

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setNotify({
            ...notify,
            isOpen: false
        })
    }


    return (
        <Snackbar
            open={notify.isOpen}
            autoHideDuration={3000}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            onClose={handleClose}>
            <Alert icon={false}
                style={{color:'black' , background:'rgba(255, 255, 255, 0.76)' , backdropFilter: 'blur(10px)'}}
                severity={notify.type}
                >
                    <div style={{display:'flex' , gap:'15px'}}>
                     <img src={notify.image} alt=""   style={{
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    marginRight: '30px',
    objectFit: 'cover',
  }} /> 
                    <div style={{display:'flex' , flexDirection:'column', gap:"5px"}}>
                    <h3 style={{textAlign:'center' , fontFamily:' Nunito ,sans-serif'}}> {notify.sender} </h3>
                    <h4 style={{textAlign:'center ' , fontFamily:' Nunito ,sans-serif'}}>{notify.message} </h4>
                    </div>
                    </div>
            </Alert>
        </Snackbar>
    )
}