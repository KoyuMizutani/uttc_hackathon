import React, { useState } from 'react'
import { Home, Chat } from './components/index'
import './App.css'

const App = () => {
   const [user, setUser] = useState({name: "", id: "", color: ""});
   return (
      <div>
         { user.id === "" ? <Home setUser={setUser}/> : <Chat user={user} setUser={setUser}/> }
      </div>
   )
}

export default App;
