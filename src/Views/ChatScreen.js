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
import FlightList from '../Components/FlightList';

function ChatScreen() {
    const opts=["Bookings","Cancellation","Seats","Meals","Web-Checkin","Baggage"]
    const Service = useSelector(state => state.todo);
    const [message, setMessage]=useState("");
    const [isTyping, setIsTyping]=useState(false)
    const handleTyping =debounce(() => {
        setIsTyping(false);
      },5000);
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
            {!(Service.selected) && (<div className="greet">
                <p style={{fontSize:"4.4334vh",fontFamily:"Roboto"}}>Hi, Anvi</p>
                <p>Good Evening. My name is Novigi, your personal assistant.</p>
            </div>)}
            <div className="chatBox" style={Service.selected ?{height:"88.3vh",marginTop:"1.4631vh"}:{}}>
                <div className="scrollBox" style={Service.selected ?{height:"75.6798vh"}:{}}>
                    {isTyping && <TypingBubble/>}
                    {Service.selected &&(<>
                    <BotChatBubble opt="3" options={opts} message="What else may I assist you with further?"/>
                    <BotChatBubble opt="6" message="What else may I assist you with further?"/>
                    <UserChatBubble message={"I would like to check extra baggage fares."}/>
                    <BotChatBubble opt="3" options={opts} message={"Passengers can do web check-In until 4 hour prior to the departure of their flight. What else may I assist you with further?"}/>
                    <UserChatBubble message={"What is the latest by which I can do web check-in?"}/>
                    <BotChatBubble opt="3" options={opts} message="What else may I assist you with further?"/>
                    <BotChatBubble opt="5" Blayout={true} message="What else may I assist you with further?"/>
                    <UserChatBubble message={"I would like to check out the meals and fares."}/>
                    <BotChatBubble opt="3" options={opts} message="What else may I assist you with further?"/>
                    <BotChatBubble seatMap={true} opt="4" message={`The Fares for Seat Selection are as follows:`}/>
                    <UserChatBubble message={"I would like to know fares for seat selection."}/>
                    <BotChatBubble opt="3" options={opts} message="What else may I assist you with further?"/>
                    <BotChatBubble opt="4" message={`Sure. Bookings can be made before 1 hour to the schedule departure. How may I help with you with further?`}/>
                    <UserChatBubble message="I would like to know the cancellation charges for Air Asia"/>
                    <BotChatBubble opt="3" options={opts} message={`Sure. Bookings can be made before 1 hour to the schedule departure. How may I help with you with further?`}/>
                    <UserChatBubble message="What is the latest by which you can book a ticket?"/>
                    <BotChatBubble opt="3" options={opts} message={`Thank you for choosing Air Asia Airlines. How may I help with you with further?`}/>
                    <BotChatBubble opt="2" message="Which flight do you have your query with?"/>
                    <UserChatBubble message="I want to enquire about a flight"/></>)}
                    <BotChatBubble opt="1" message="Hi Avni, What can I help you with?"/>
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
