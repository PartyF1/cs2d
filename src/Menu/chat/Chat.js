import { useEffect, useRef, useState } from "react"
import Message from "./message.js"
import "./chat.css"

let messages = [];

export default function Chat(props) {
   
   const { server, data } = props;
   const [state, setState] = useState();
   const input = useRef();
   const myRef = useRef(null);

   useEffect(() => {
      setTimeout(() => {
         getMessages();
      }, 1000)
   })

   async function getMessages() {
      messages = await server.getMessages();
      setState(!state);
   }
   
   function keyHandler(e) {
      if (e.key === "Enter") {
         sendMessage();
      }
   }

   async function sendMessage() {
      if (input.current.value) {
         await server.sendMessage(data.name, input.current.value);
         input.current.value = "";
      }
      executeScroll();
   }

   const executeScroll = () => myRef.current.scrollIntoView()

   return (
      <div className="chat-container">
         <div className="messages-field">
            {messages.map((element, index) => {
                  return (<Message key={index} message={element}></Message>)
            })}
            <div ref={myRef}></div>
         </div>
         <div className="chat-input">
            <input className="message-input" ref={input} onKeyPress={keyHandler} placeholder="Введите сообщение..."></input>
            <button className="sendBtn" onClick={sendMessage}></button>
         </div>
      </div>
   )
}