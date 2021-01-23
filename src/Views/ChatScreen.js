import React, { useState } from 'react';
import '../App.css';
import menu from '../assests/images/menu.svg';
import homeActive from '../assests/images/homeActive.svg';
import settings from '../assests/images/settings.svg';
import BG2 from '../assests/images/BG2.svg';
import microphone from '../assests/images/microphone.svg';
import sendLogo from '../assests/images/airplaneWhite.svg';
import BotChatBubble from '../Components/BotChatBubble';
import UserChatBubble from '../Components/UserChatBubble';
import {useSelector} from 'react-redux';
import debounce from "lodash/debounce";
import TypingBubble from '../Components/Typing Bubble';

function ChatScreen() {
    const Service = useSelector(state => state.todo);
    const [message, setMessage]=useState("");
    const [isTyping, setIsTyping]=useState(false)
    const handleTyping =debounce(() => {
        setIsTyping(false);
      }, 1000);
    const handleChange=(e)=>{
        setMessage(e.target.value);
        setIsTyping(true);
        handleTyping()
    }
  return (
    <div className="container">
        <div className="landBG">
            <img src={BG2} style={{width:"122vw"}}/>
        </div>
        <div className="landOPAC"/>
        <div className="landContentBox">
            <div className="topBar">
                <img src={menu} className="menu"/>
                <div className="topBarBox">
                    <div className="buttonBox">
                        <img src={homeActive} className='home' onClick={()=>alert('hi')}/>
                        <img src={settings} className='settings'/>
                    </div>
                </div>
            </div>
            <div className="greet">
                <p style={{fontSize:"36px",fontFamily:"Roboto"}}>Hi, Anvi</p>
                <p>Good Evening. My name is Novigi, your personal assistant.</p>
            </div>
            <div className="chatBox" style={Service === "selected"?{height:"88.3vmax",marginTop:"-16.536946vmax"}:{}}>
                <div className="scrollBox" style={Service === "selected"?{maxHeight:"74.6798vmax"}:{}}>
                    {isTyping && <TypingBubble/>}
                    <UserChatBubble/>
                    <BotChatBubble/>
                </div>
            </div>
            <div className="typeLayout">
                        <input className="inputBox" 
                        type="text" 
                        value={message} 
                        placeholder="Type your message..."
                        onChange={handleChange}
                        />
                        <div className="recordButton">
                            <img src={microphone} className="recordLogo"/>
                        </div>
                        <div className="sendButton">
                            <img src={sendLogo} className="sendLogo"/>
                        </div>
                    </div>
        </div>
    </div>
  );
}

export default ChatScreen;
