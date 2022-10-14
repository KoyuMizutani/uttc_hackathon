import React, { useState } from 'react';
import { AddChannelDialog } from './index';
import '../assets/styles/styles.css';

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Grid3x3Icon from '@mui/icons-material/Grid3x3';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';

type User = {
   name:    string
   id:      string 
   color:   string
}

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
}

const SideMenuBar = (props: Props) => {

   const [sideState, setSideState] = useState(false);

   const toggleDrawer =
      (open: boolean) =>
      (event: React.KeyboardEvent | React.MouseEvent) => {
         if (
            event.type === 'keydown' &&
            ((event as React.KeyboardEvent).key === 'Tab' ||
            (event as React.KeyboardEvent).key === 'Shift')
         ) {
            return;
         }
       setSideState(open);
    };

   const list = () => (
      <Box>
         <Box
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
         >
            <List>
               <h4 className="sideMenuBarTitle">Channels</h4>
               {props.channels.map((channel, index) => (
                  <ListItem key={channel.id} onClick={()=>{props.setNowChannel(channel.id)}} disablePadding>
                     <ListItemButton>
                        <ListItemIcon>           
                           {channel.id === props.nowChannel ? <AlternateEmailIcon /> : <Grid3x3Icon />}
                        </ListItemIcon>
                        <ListItemText primary={channel.name} />
                     </ListItemButton>
                  </ListItem>
               ))}
            </List>  
         </Box>
         <Divider />
         <AddChannelDialog setNowChannel={props.setNowChannel} toggleDrawer={toggleDrawer}/>
      </Box>
   );

   return (
      <div className="SideMenuBarButton"> 
         <React.Fragment>
            <Button onClick={toggleDrawer(true)} sx={{ color: "white" }}>
               <MenuIcon /> 
            </Button>
            <Drawer
               open={sideState}
               onClose={toggleDrawer(false)}
            >
            {list()}
            </Drawer>
         </React.Fragment>
      </div>
   );
};

export default SideMenuBar;
