import React, { useState, useEffect } from 'react';
import { AvatarIcon, RegisterAccountDialog } from './index';

import axios from 'axios';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';


type User = {
   name:  string
   id:    string 
   color: string
 };

type Props = {
   open:      boolean;
   setUser:   React.Dispatch<React.SetStateAction<User>>;
   onClose:   (value: User) => void;
}

const UserSelectDialog = (props: Props) => {

   const [accounts, setAccounts] = useState<User[]>([]);

   function accountRefresh() {
      axios.get('http://localhost:8080/account')
      .then(res => {
         setAccounts(res.data)
      }) 
   }

   useEffect(() => {
      accountRefresh()
   }, []);

   const handleListItemClick = (account: User) => {
      props.setUser(account)
      props.onClose(account);
   };

   return (
      <Dialog onClose={props.onClose} open={props.open}>
         <DialogTitle>Select Your Account</DialogTitle>
         <List sx={{ pt: 0 }}>
            {accounts.map((account) => (
               <ListItem button onClick={() => handleListItemClick(account)} key={account.id}>
               <AvatarIcon accountName={account.name} accountColor={account.color} /> 
               <ListItemText sx={{ml: 2}} primary={account.name} />
               </ListItem>
            ))}
            <RegisterAccountDialog setUser={props.setUser} accountRefresh={accountRefresh}/>
         </List>   
      </Dialog>
   );
};

export default UserSelectDialog;