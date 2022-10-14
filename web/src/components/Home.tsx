import React from 'react';
import { UserSelectButton } from './index';

type User = {
   name: string
   id: string 
   color: string
};

type Props = {
   setUser: React.Dispatch<React.SetStateAction<User>>
};

const Home = (props: Props) => {

   return (
      <div className="homeContents">
         <div className="title">
            <h1>Slack</h1>
         </div> 
         <UserSelectButton setUser={props.setUser} />
      </div>
   );
};

export default Home;
