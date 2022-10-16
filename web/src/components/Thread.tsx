import React, { useState, useEffect, useCallback } from 'react';
import { AvatarIcon } from './index';

import axios from 'axios';

import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import DoneIcon from '@mui/icons-material/Done';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';



type User = {
   name:    string
   id:      string 
   color:   string
};

type Message = {
   content:   string
   id:        string
   sender:    string
   channel:   string
   date:      string
   edited:    boolean
};


type Props = {
   user:         User
   nowChannel:   string
   isEditing:    boolean
};

const Thread = (props: Props) => {

   const [accounts, setAccounts] = useState<User[]>([]);
   const [messages, setMessages] = useState<Message[]>([]);
   const [text, setText] = useState("");
   const [selectedMessageId, setSelectedMessageId] = useState("");

   function classifyByChannel() {
      axios.get('http://localhost:8080/message')
      .then(res => {
         setMessages(res.data?.filter((message :Message) => {
            return message.channel===props.nowChannel
         }))
      })
   };

   function messageRefresh() {
      classifyByChannel()
   };

   function accountRefresh() {
      axios.get('http://localhost:8080/account')
      .then(res => {
         setAccounts(res.data)
      })
   };

   useEffect(() => {
      messageRefresh()
      setText("")
   }, [props.nowChannel]);

   useEffect(() => {
      accountRefresh()
   }, [accounts]);

   useEffect(() => {
      accountRefresh()
   }, []);

   // --------------------------------------------メッセージ送信系--------------------------------------------
   function sendHandle(e: React.FormEvent<HTMLFormElement>) {
      if (text !== "") {
         const data = {
            content:  text,
            sender:   props.user.id,
            channel:  props.nowChannel
         };
         axios.post('http://localhost:8080/message', data)
         .then(response => {
            console.log('response body:', response.data);
            messageRefresh()
         });
         setText("")
         scrollToBottomOfList()
         e.preventDefault()       
      } else {
         e.preventDefault()
      };
   };

   const sendMessageBar = () => {
      return (
         <div className="submit">   
            <Box sx={{display: 'flex'}}>
               <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, height: 80, textAlign: 'center'}} elevation={15}>
                  <form onSubmit={sendHandle}>
                     <TextField sx={{ mt:1.6, width:650 }} label="Messages" value={text} onChange={(event)=>{setText(event.target.value)}} />
                     <Button disabled={text.length == 0} sx={{mt:2.7, ml:1.5}} type="submit" variant="contained" endIcon={<SendIcon />}>
                        Send
                     </Button>
                  </form>
               </Paper>
            </Box>
         </div>
      );
   };



  // --------------------------------------------メッセージ編集系--------------------------------------------
   function editHandle(message: string, messageId: string) {
      setText(message)
      setSelectedMessageId(messageId)
   };

   const editMessageBar = () => {
      
      function changeHandle(e :React.FormEvent<HTMLFormElement>) {
         const data = {
            content:   text,
            id:        selectedMessageId,
         };
         axios.put('http://localhost:8080/message', data)
         .then(response => {
            console.log('response body:', response.data);
            setText("")
            setSelectedMessageId("")
            messageRefresh() 
         });
         e.preventDefault()
      };

      return (
         <div className="submit">   
            <Box sx={{display: 'flex'}}>
               <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, height: 80, textAlign: 'center'}} elevation={10}>           
                     {(selectedMessageId === "") ?
                        <></>
                     :
                     (
                        <form onSubmit={changeHandle}>
                           <TextField sx={{ mt:1.6, width:650 }} label="Edit Message" value={text} onChange={(event)=>{setText(event.target.value)}} />
                           <Button sx={{mt:2.6, ml:1}} type="submit" variant="contained" endIcon={<SendIcon />}>Update</Button> 
                        </form>
                     )}
               </Paper>
            </Box>
         </div>
      );
   };

   const editMenu = (message: Message) => {
      return (
         <div className="messageMenu">
            <Stack direction="row" spacing={1}>
               <Chip
                  label="Edit"
                  onClick={()=>editHandle(message.content, message.id)}
                  onDelete={()=>editHandle(message.content, message.id)}
                  deleteIcon={<DoneIcon />}
                  size="small"
               />
               <Chip
                  label="Delete"
                  onClick={()=>deleteHandle(message.id)}
                  onDelete={()=>deleteHandle(message.id)}
                  deleteIcon={<DeleteIcon />}
                  size="small"
               />
            </Stack>
         </div>
      );
   };

   const deleteHandle = (messageId: string) => {
      const deleteId = {
         id: messageId   
      };
      axios.delete('http://localhost:8080/message', {data: deleteId})
      .then(response => {
         console.log('response body:', response.data);
         messageRefresh();
      });
   };

   // --------------------------------------------スレッドで扱うメソッド--------------------------------------------
   type SenderInfo = {
      senderName:    string
      senderColor:   string
   };

   function returnSenderInfo(senderId: string) :SenderInfo {
      const senderInfo = accounts.find(function(account) {return account.id === senderId});
      return senderInfo ? {senderName: senderInfo.name, senderColor: senderInfo.color} : {senderName: "unknown", senderColor : ""};
   };

   const ref = React.createRef<HTMLDivElement>()
   const scrollToBottomOfList = useCallback(() => {
      ref!.current!.scrollIntoView({
         behavior: 'smooth',
         block: 'end',
      })
   }, [ ref ]);

   function displayTextform() {
      return props.isEditing ? editMessageBar() : sendMessageBar()
   };



  // --------------------------------------------スレッド本体-------------------------------------------- 
   return(
      <div>
         <h1 className="channel">Threads</h1>
         {/* <Button onClick={scrollToBottomOfList}>最新のメッセージへ</Button> */}
         <div className="thread">
            {messages?.map((message: Message, index: number) => (
               <li key={index}>
                  <div>
                     <div className="messageInfo">
                        <AvatarIcon accountName={returnSenderInfo(message.sender).senderName} accountColor={returnSenderInfo(message.sender).senderColor}/>
                        <a className="senderName">{returnSenderInfo(message.sender).senderName}</a>
                        <a className="sendDate">{message.date}</a>
                        {message.edited ? <a className="alreadyEdited">(Edited)</a> : null}
                        {(props.isEditing && props.user.id === message.sender) ? editMenu(message) : null}
                     </div>
                     <div className="messageContents">
                        <a>{message.content}</a> 
                     </div>
                  </div>
               </li>
             ))}
             <br />
         </div>
         <div ref={ref}>
            {displayTextform()}
         </div>
      </div>
   );
};
  
export default Thread;