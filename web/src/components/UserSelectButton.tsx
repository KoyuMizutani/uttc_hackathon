import React from 'react';
import { UserSelectDialog } from './index';

import Button from '@mui/material/Button';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


type User = {
   name: string
   id: string 
   color: string
};

type Props = {
   setUser: React.Dispatch<React.SetStateAction<User>>
};

const UserSelectButton = (props: Props) => {
  const [open, setOpen] = React.useState(false);


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button 
         sx={{color: 'white', mt:-10}} 
         variant="contained" 
         color='primary' 
         onClick={handleClickOpen} 
         startIcon={<AccountCircleIcon />}>
         Select User
      </Button>
      <UserSelectDialog
        open={open}
        setUser={props.setUser}      
        onClose={handleClose}
      />
    </div>
  );
};

export default UserSelectButton;