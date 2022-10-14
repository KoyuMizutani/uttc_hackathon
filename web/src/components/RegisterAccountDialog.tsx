import React, { useState } from 'react';
import { StringToColor } from './index';
import axios from 'axios';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import AddIcon from '@mui/icons-material/Add';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';

type User = {
   name:  string
   id:    string 
   color: string
 };

type Props = {
   setUser:        React.Dispatch<React.SetStateAction<User>>
   accountRefresh: ()=>void
}

const RegisterAccountDialog = (props: Props) => {
   const [newAccountName, setNewAccountName] = useState("")
   const [open, setOpen] = useState(false);

   const handleClickOpen = () => {
      setOpen(true);
   };

   const handleClose = () => {
      setOpen(false);
   };

   const registerAccountHandle = (e :React.FormEvent<HTMLFormElement>) => {
      if (newAccountName !== "") {
         const data = {
            name:    newAccountName,
            color:   StringToColor(newAccountName) 
         };
         axios.post('http://localhost:8080/account', data)
         .then(response => {
            props.setUser({name: data.name, id: response.data, color: data.color})
         });
         handleClose()
         setOpen(false)
         props.accountRefresh()
         e.preventDefault()                
      } else {
         e.preventDefault()  
      }
    };

   return (
      <div>
         <ListItem button onClick={handleClickOpen}>
            <ListItemAvatar>
               <Avatar>
                  <AddIcon />
               </Avatar>
            </ListItemAvatar>
             <ListItemText primary="Create Account" />
         </ListItem>
         <Dialog open={open}>
            <DialogTitle sx={{mr: 15, ml: 15}}>Create Account</DialogTitle>
            <form onSubmit={registerAccountHandle}>
               <DialogContent>
                  <TextField
                     autoFocus
                     margin="dense"
                     value={newAccountName}
                     label="User Name (At most 30 letters)"
                     fullWidth
                     variant="standard"
                     onChange={(event)=>{setNewAccountName(event.target.value)}}
                  />
               </DialogContent>
               <DialogActions>
                  <Button onClick={handleClose}>Cancel</Button>
                  {newAccountName !== "" ? <Button type="submit">Register</Button> : <Button disabled>Add</Button>} 
               </DialogActions>
            </form>
         </Dialog>
      </div>
   );
};

export default RegisterAccountDialog;