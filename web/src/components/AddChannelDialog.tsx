import React, { useState } from 'react';
import axios from 'axios';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

type Props = {
   setNowChannel:   React.Dispatch<React.SetStateAction<string>>
   toggleDrawer:    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => void
}

const AddChannelDialog = (props: Props) => {
   const [newChannelName, setNewChannelName] = useState("")
   const [open, setOpen] = useState(false);

   const handleClickOpen = () => {
      setOpen(true);
   };

   const handleClose = () => {
      setOpen(false);
   };

   const addChannelHandle = (e :React.FormEvent<HTMLFormElement>) => {
      if (newChannelName !== "") {
         const data = {
            name:   newChannelName
         };
         axios.post('http://localhost:8080/channel', data)
         .then(response => {
            props.setNowChannel(response.data)
         });
         handleClose()
         e.preventDefault()                
      } else {
         e.preventDefault()  
      }
    };

   return (
      <div>
         <List>
            <ListItem disablePadding>
               <ListItemButton  onClick={handleClickOpen}>
                  <ListItemIcon>
                     <LibraryAddIcon />
                  </ListItemIcon> 
                  <ListItemText primary={"Add Channels"} />
               </ListItemButton>
            </ListItem>
         </List>
         <Dialog open={open}>
            <DialogTitle sx={{mr: 15, ml: 15}}>Create Channel</DialogTitle>
            <form onSubmit={addChannelHandle}>
               <DialogContent>
                  <DialogContentText>
                     New Channel:"{newChannelName}"
                  </DialogContentText>
                  <TextField
                     autoFocus
                     margin="dense"
                     value={newChannelName}
                     label="Channel Name"
                     fullWidth
                     variant="standard"
                     onChange={(event)=>{setNewChannelName(event.target.value)}}
                  />
               </DialogContent>
               <DialogActions>
                  <Button onClick={handleClose}>Cancel</Button>
                  {newChannelName !== "" ? <Button type="submit" onClick={props.toggleDrawer(false)}>Add</Button> : <Button disabled>Add</Button>} 
               </DialogActions>
            </form>
         </Dialog>
      </div>
   );
};

export default AddChannelDialog;