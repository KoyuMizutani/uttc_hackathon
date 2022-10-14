import React from 'react';
import { SideMenuBar, AccountMenu } from './index';
import '../assets/styles/styles.css';

import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

type User = {
   name:    string
   id:      string 
   color:   string
};

type Channel = {
   name:   string
   id:     string 
};

type Props = {
   user:            User
   setUser:         React.Dispatch<React.SetStateAction<User>>
   channels:        Channel[]
   setChannels:     React.Dispatch<React.SetStateAction<Channel[]>> 
   nowChannel:      string
   setNowChannel:   React.Dispatch<React.SetStateAction<string>>
   isEditing:       boolean
   setIsEditing:    React.Dispatch<React.SetStateAction<boolean>>
}

const MenuBar = (props: Props) => {
   return (
      <Box className="MenuBar">
         <AppBar>
            <Toolbar>
               <SideMenuBar 
                  user={props.user} 
                  setUser={props.setUser}
                  channels={props.channels}
                  setChannels={props.setChannels}
                  nowChannel={props.nowChannel}
                  setNowChannel={props.setNowChannel} 
               />
               <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  Slack
               </Typography>
               <FormControlLabel 
                  control={<Switch onClick={() => props.setIsEditing(props.isEditing ? false : true)} color="default"/>} 
                  label="Edit"
               />
               <AccountMenu user={props.user} setUser={props.setUser}/>
            </Toolbar>
         </AppBar>
      </Box>
   );
};

export default MenuBar;