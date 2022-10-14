import React, { useState, useEffect } from 'react';
import { MenuBar , Thread } from './index'
import axios from 'axios';

type User = {
   name:   string
   id:     string 
   color:  string
};

type Props = {
   user:    User
   setUser: React.Dispatch<React.SetStateAction<User>>
};

type Channel = {
  name:   string
  id:     string 
};

const Chat = (props: Props) => {

   const [nowChannel, setNowChannel] = useState<string>("00000000000000000000000001")
   const [channels, setChannels] = useState<Channel[]>([])
   const [isEditing, setIsEditing] = useState(false)

   useEffect(() => {
      axios.get('http://localhost:8080/channel')
      .then(res => {
         setChannels(res.data)
      })
   }, [nowChannel]);

   return (
      <div>
         <header>
            <MenuBar 
               user={props.user}
               setUser={props.setUser} 
               channels={channels}
               setChannels={setChannels}
               nowChannel={nowChannel}
               setNowChannel={setNowChannel}
               isEditing={isEditing} 
               setIsEditing={setIsEditing}
            /> 
         </header>
         <main>      
            <Thread user={props.user} nowChannel={nowChannel} isEditing={isEditing}/>
         </main>
      </div>
   );
};

export default Chat;
