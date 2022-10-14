import React from 'react';
import Avatar from '@mui/material/Avatar';

type Props = {
   accountName:    string
   accountColor:   string
};

const AvatarIcon = (props: Props) => {

   function stringAvatar(props: Props) {
      return {
         sx: {
           bgcolor: props.accountColor
         },
         children: props.accountName.slice(0, 1)
      };
   };

   return (
      <Avatar {...stringAvatar(props)} />
   );
};

export default AvatarIcon;