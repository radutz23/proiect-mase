import React, { useEffect, useState,useRef,useContext } from 'react';
import './chat-app.css';
import { AuthContext } from '../auth/AuthContext';


export function ChatApp(){
    const messagesUrl = 'http://localhost:3001/messages';
    const [chatMsg, setChatMsg] = useState([]);
    const [chatUser, setChatUser] = useState([]);
    const { auth, logOut } = useContext(AuthContext);
    const [message, setMessage] = useState('');


    useEffect(() => {
        fetch(messagesUrl)
          .then((response) => response.json())
          .then((messagesFromServer) => {
            setChatMsg(messagesFromServer);
          });
      }, []);

      const handleSubmit = (e) => {
        e.preventDefault();
      
        // Create a new message object with the "mesaj" key
        const newMessage = {
            mesaj: message,
            sender: auth?.user?.email || 'Unknown Sender', // Use user's email if available, or 'Unknown Sender' as a fallback
          };

        fetch('http://localhost:3001/messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newMessage),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log('New message added:', data);
          })
          .catch((error) => {
            console.error('Error adding new message:', error);
          });
        setMessage('');

        fetch(messagesUrl)
        .then((response) => response.json())
        .then((messagesFromServer) => {
          setChatMsg(messagesFromServer);
        //   setChatUser(messagesFromServer);
        });
    
        
      };
      

    return(
<>
<div className='chat-background'>
<h1 className='chat-title'>CATCH UP WITH US!</h1>

<ul className='chat-logs'>
        {chatMsg.map((actualChatMsg) => {
          return (
          <div className='message-card'>
            <p className='chat-msg-owner'>{actualChatMsg.sender}:</p>
            <p className='chat-msg' key={actualChatMsg.id}>

               {actualChatMsg.mesaj}
            </p>
          </div>
          
          );
        })}
</ul>

<div className='message-area'>
<input type='text' className='message-input'
value={message}
onChange={(e) => setMessage(e.target.value)}
placeholder="Enter your message"
></input>

<button className='message-send' onClick={handleSubmit}>Send</button>

</div>
</div>

</>
    );
}