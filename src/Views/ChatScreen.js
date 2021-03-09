import React, { useState } from 'react';
import '../App.css';
import menu from '../assests/images/menu.svg';
import homeActive from '../assests/images/homeActive.svg';
import settings from '../assests/images/settings.svg';
import BG2 from '../assests/images/BG2.svg';
import BG1 from '../assests/images/BG1.svg';
import microphone from '../assests/images/microphone.svg';
import sendLogo from '../assests/images/airplaneWhite.svg';
import User from '../assests/images/user.svg';
import BotChatBubble from '../Components/BotChatBubble';
import UserChatBubble from '../Components/UserChatBubble';
import {shallowEqual, useSelector} from 'react-redux';
import debounce from "lodash/debounce";
import TypingBubble from '../Components/Typing Bubble';
import whiteSeat from '../assests/images/whiteSeat.svg';
import whiteSetting from '../assests/images/whiteSetting.svg';
import whiteCancel from '../assests/images/whiteCancel.svg';
import whiteMeal from '../assests/images/whiteMeal.svg';
import whiteAirplane from '../assests/images/whiteAirplane.svg';
import whiteBaggage from '../assests/images/whiteBaggage.svg';
import whiteCheckIn from '../assests/images/whiteCheckIn.svg';
import whiteLogout from '../assests/images/whiteLogout.svg';
import whiteHelp from '../assests/images/whiteHelp.svg';
import whiteHome from '../assests/images/whiteHome.svg';
import activeHome from '../assests/images/activeHome.svg';
import activeSeat from '../assests/images/activeSeat.svg';
import activeSetting from '../assests/images/activeSetting.svg';
import activeCancel from '../assests/images/activeCancel.svg';
import activeMeal from '../assests/images/activeMeal.svg';
import activeAirplane from '../assests/images/activeAirplane.svg';
import activeBaggage from '../assests/images/activeBaggage.svg';
import activeCheckIn from '../assests/images/activeCheckIn.svg';
import activeLogout from '../assests/images/activeLogout.svg';
import activeHelp from '../assests/images/activeHelp.svg';
import logo from '../assests/images/landLOGO.svg';
import {userRequest} from '../helper/Backend.js';
import {useDispatch} from 'react-redux';
import {addMessage} from '../Redux/actions/messageArrayActions';

function ChatScreen() {
    const messageStack = useSelector(state => state.messageArray.array, shallowEqual);
    const msglength = useSelector(state => state.messageArray.length, shallowEqual);
    const [msgLength, setMsgLength] = useState(messageStack.length);
    React.useEffect(()=>{
        console.log(messageStack,"messages");
        setMsgLength(messageStack.length)
        console.log(messageStack.length)
        if(messageStack.length % 2 !== 0){
            console.log()//need to initiate a reload here
        }
    },[msglength])
    const opts=["Bookings","Cancellation","Seats","Meals","Web-Checkin","Baggage"]
    const Service = useSelector(state => state.todo);
    const [message, setMessage]=useState("");
    const [isTyping, setIsTyping]=useState(false);
    const [showMenu, setShowMenu]=useState(false);
    const dispatch = useDispatch();
    const sendMessage=()=>{
        const msg = messageStack;
        if(message !== "")
        {
        msg.unshift( {type:"User", message:message})
        userRequest(message).then((data) => {
            if (data)if(data.error) {
              console.log(data.error, "err");
              dispatch(addMessage({
                array:msg,
                length:msg.length
            }))
            } else {
                const dataHandler = data[0].custom[0];
              msg.unshift(
                { type:"Bot", opt:dataHandler.type, Blayout:false, message:dataHandler.text});
              dispatch(addMessage({
                array:msg,
                length:msg.length
            }))
            }
            setIsTyping(false);
            setMessage("");
          });
        }
    }
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
        {showMenu && <>
        <div className="landBG">
            <img src={BG1} style={{width:"100vw"}}/>
        </div>
        <div className="landOPAC"/>
        </>}
        {showMenu ? 
        (<>
        <div className="landContentBox" style={{height:"100vh",overflowY:"auto"}}>
            <div className="menuView">
                <div className="menuUser">
                    <img src={User} className="menuUserDP"/>
                    <div className="menuUserDetails">
                        <p style={{fontSize:"18px", fontWeight:"bold"}}>Avni Sharma</p>
                        <p>User Since: 23/02/12</p>
                    </div>
                </div>
                <div className="menuLine"/> 
                <div className="menuListT i">
                    <div className="opt" style={{background:"white", color:"#ff0100"}}>
                        <img src={homeActive}/>
                        <p>Home</p>
                    </div>
                    <div className="opt">
                        <img src={whiteSetting}/>
                        <p>Settings</p>
                    </div>
                </div>
                <div className="menuLine"/> 
                <div className="menuListT ii">
                    <div className="opt">
                        <img src={whiteAirplane}/>
                        <p>Bookings</p>
                    </div>
                    <div className="opt">
                        <img src={whiteCancel}/>
                        <p>Cancellation</p>
                    </div>
                    <div className="opt">
                        <img src={whiteSeat}/>
                        <p>Seats</p>
                    </div>
                    <div className="opt">
                        <img src={whiteMeal}/>
                        <p>Meal</p>
                    </div>
                    <div className="opt">
                        <img src={whiteCheckIn}/>
                        <p>Web Checkin</p>
                    </div>
                    <div className="opt">
                        <img src={whiteBaggage}/>
                        <p>Baggage</p>
                    </div>
                </div>
                <div className="menuLine"/> 
                <div className="menuListT i">
                    <div className="opt">
                        <img src={whiteHelp}/>
                        <p>Help</p>
                    </div>
                    <div className="opt">
                        <img src={whiteLogout}/>
                        <p>Logout</p>
                    </div>
                </div>
                <div className="menuLine"/> 
                <div className="menuLogoT">
                    <img src={logo} style={{width:"38.933vw", opacity:"0.4"}}/>
                </div>
            </div>
        </div></>) : 
        (<>
        <div className="landBG">
            <img src={BG2} style={{width:"122vw"}}/>
        </div>
        <div className="landOPAC"/>
        <div className="landContentBox">
            <div className="topBar">
                <img src={menu} className="menu" onClick={()=>{setShowMenu(true)}}/>
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
                <div className="scrollBox" style={{height:"80.6798vh",
                        paddingLeft:"9.6vw",
                        display:"grid",
                        gridTemplateColumns:"1fr 1fr",
                        gridTemplateRows:"4.6798vh 63.5467vh 8.866vh",
                        paddingTop:"1.4631vh"
                        },Service.selected ?{height:"80.6798vh"}:{}}>
                    {isTyping && <TypingBubble/>}
                    {/* {Service.selected &&(<>
                    <BotChatBubble opt="13" Blayout={true} message="What else may I assist you with further?"/>
                    <BotChatBubble opt="12" Blayout={true} message="What else may I assist you with further?"/>
                    <BotChatBubble opt="11" Blayout={true} message="What else may I assist you with further?"/>
                    <BotChatBubble opt="10" Blayout={false} message="What else may I assist you with further?"/>
                    <BotChatBubble opt="9" Blayout={false} message="What else may I assist you with further?"/>
                    <BotChatBubble opt="8" Blayout={false} message="Thank You. Please select number of passengers."/>
                    <BotChatBubble opt="7" Blayout={false} message="What else may I assist you with further?"/>
                    <BotChatBubble opt="3" Blayout={false} options={opts} message="What else may I assist you with further?"/>
                    <BotChatBubble opt="6" Blayout={false} message="What else may I assist you with further?"/>
                    <UserChatBubble message={"I would like to check extra baggage fares."}/>
                    <BotChatBubble opt="3" Blayout={false} options={opts} message={"Passengers can do web check-In until 4 hour prior to the departure of their flight. What else may I assist you with further?"}/>
                    <UserChatBubble message={"What is the latest by which I can do web check-in?"}/>
                    <BotChatBubble opt="3" Blayout={false} options={opts} message="What else may I assist you with further?"/>
                    <BotChatBubble opt="5" Blayout={true} message="What else may I assist you with further?"/>
                    <UserChatBubble message={"I would like to check out the meals and fares."}/>
                    <BotChatBubble opt="3" Blayout={false} options={opts} message="What else may I assist you with further?"/>
                    <BotChatBubble seatMap={true} opt="4" Blayout={false} message={`The Fares for Seat Selection are as follows:`}/>
                    <UserChatBubble message={"I would like to know fares for seat selection."}/>
                    <BotChatBubble opt="3" Blayout={false} options={opts} message="What else may I assist you with further?"/>
                    <BotChatBubble opt="4" Blayout={false} message={`Sure. Bookings can be made before 1 hour to the schedule departure. How may I help with you with further?`}/>
                    <UserChatBubble message="I would like to know the cancellation charges for Air Asia"/>
                    <BotChatBubble opt="3" Blayout={false} options={opts} message={`Sure. Bookings can be made before 1 hour to the schedule departure. How may I help with you with further?`}/>
                    <UserChatBubble message="What is the latest by which you can book a ticket?"/>
                    <BotChatBubble opt="3" Blayout={false} options={opts} message={`Thank you for choosing Air Asia Airlines. How may I help with you with further?`}/>
                    <BotChatBubble opt="2" Blayout={false} message="Which flight do you have your query with?"/>
                    <UserChatBubble message="I want to enquire about a flight"/></>)}
                    <BotChatBubble opt="initialoptions" Blayout={false} message="Hi Avni, What can I help you with?"/> */}
                    
                    {
                        messageStack&&msgLength>0&&messageStack.map((o,i)=>
                        
                            (o.type==="Bot"?<BotChatBubble 
                            opt={o.opt} 
                            options={o.menu} 
                            Blayout={o.Blayout} 
                            message={o.message} 
                            cancellation={o.Cancellation} 
                            reissuance={o.ReIssuance} 
                            baggage={o.BaggageDetails}
                            standard_seat={o.seat_Tru_Standard}
                            classic_seat={o.seat_Tru_Classic}
                            max_corp_seat={o.seat_Tru_Max_Corporate}
                            seatMap={(o.opt === "standard_seat" || o.opt === "classic_seat" || o.opt === "corporate_seat")?true:false}/>
                            :<UserChatBubble message={o.message}/>)
                        )
                    }
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
                        <div className="sendButton" onClick={()=>sendMessage()}>
                            <img src={sendLogo} className="sendLogo"/>
                        </div>
                    </div>
        </div></>)}
    </div>
  );
}

export default ChatScreen;
