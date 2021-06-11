import React, {useState} from 'react';
import '../App.css';
import Bot from '../assests/images/Bot.svg';
import OptionSelection from './OptionSelection';
import FlightList from './FlightList';
import MenuList from './MenuList';
import WeightList from './WeightList';
import TicketBooking from './TicketBooking';
import Passengers from './Passengers';
import SeatSelection from './SeatSelection';
import TicketBookingFinal from './TicketBookingFinal';
import TicketSlider from '../Components/TicketSlider';
import DoubleTicketSlider from '../Components/DoubleTicketSlider';
import BookingDetails from '../Components/BookingDetails';
import SeatMap from './SeatMap';
import {userRequest} from '../helper/Backend.js';
import {addMessage} from '../Redux/actions/messageArrayActions';
import {useSelector, shallowEqual} from 'react-redux';
import {useDispatch} from 'react-redux';
import BaggageDetails from './BaggageDetails';
import TruJetSeatMap from './TruJetSeatMap';
import SearchTab from './SearchTab';
import QuestionSlider from './QuestionSlider';

function BotChatBubble(props) {
  const Service = useSelector(state => state.todo);
  const messageStack = useSelector(state => state.messageArray.array, shallowEqual);
    const msglength = useSelector(state => state.messageArray.length, shallowEqual);
    const [msgLength, setMsgLength] = useState(messageStack.length);
    React.useEffect(()=>{
        setMsgLength(messageStack.length)
    },[msglength])
    const dispatch = useDispatch();
    const sendMessage=async(message,hist)=>{
        const msg = messageStack;
        if(message === "Go Back"){
          msg.unshift({type:"User", message:message});
          dispatch(addMessage({
            array:msg,
            length:msg.length
        }));
        if(props.opt === "cancellationoptions" || props.opt === "changefeeoptions" || props.opt === "seatoptions" ||
        props.opt === "fareoptions" || props.opt === "mealoptions" ||props.opt === "baggageoptions" ||
        props.opt === "specialservices" || props.opt === "webcheckinoptions" || props.opt === "generaloptions" ||
        props.opt === "refundfaqoptions" ){
          userRequest("Go Back to Initial options").then((data) => {
            if (data)if(data[0].custom === undefined) {
                console.log(data[0].text, "err");
                          msg.unshift(
                            { type:"Bot", message:data[0].text});
                          dispatch(addMessage({
                            array:msg,
                            length:msg.length
                        }))
            } else {
                const dataHandler = data[0].custom[0];
              msg.unshift(
                { 
                type:"Bot", 
                opt:dataHandler.type, 
                Blayout:false, 
                message:dataHandler.text, 
                menu:dataHandler.buttons, 
                Cancellation:dataHandler.Cancellation,
                ReIssuance:dataHandler.Reissuance,
                BaggageDetails: dataHandler["Baggage Data"],
                seat_Tru_Standard : dataHandler["Tru Saver"],
                seat_Tru_Classic : dataHandler["Tru Classic"],
                seat_Tru_Max_Corporate : dataHandler["Tru Max"],
                Fare: dataHandler.Fare,
                Seat:dataHandler.Seat, 
                contact:dataHandler.number,
                service: Service.service,
                });
              dispatch(addMessage({
                array:msg,
                length:msg.length
            }))
            }
          });
        }
        else{
            let i =2;
          while(true){
            if(msg[i].type === "Bot"){
              if(msg[1].parent){
                if(msg[1].parent === msg[i].opt){
                  break
                }
              }
              else{
              break;}
            }
            i++;
          }
          msg.unshift(msg[i]);
        }
        dispatch(addMessage({
            array:msg,
            length:msg.length
          })); 
        }
        else if( message === "View Seat Map"){
          msg.unshift( {type:"User", message:message});
          dispatch(addMessage({
              array:msg,
              length:msg.length
          }));
        msg.unshift(
            { 
            type:"Bot", 
            opt:"13", 
            Blayout:false,
            message:"Here is your Seat Map",
            service: Service.service,
            parent: hist,
          });
        dispatch(addMessage({
            array:msg,
            length:msg.length
        })); 
        }
        else if(message !== "")
        {
        msg.unshift( {type:"User", message:message})
        userRequest(message).then((data) => {
            if (data)if(data[0].custom === undefined) {
              msg.unshift(
                { type:"Bot", message:data[0].text,
                parent: hist});
              dispatch(addMessage({
                array:msg,
                length:msg.length
            }))
            } else {
                if(data[0].custom[0].qna && data[0].custom[0].qna.length > 0){
                  const dataHandler = data[0].custom[0].qna[data[0].custom[0].qna.length - 1];
                  console.log(dataHandler,message,"opts")
                  msg.unshift(
                    { 
                    type:"Bot", 
                    opt:data[0].custom[0].type ? data[0].custom[0].type : dataHandler.type,
                    Blayout:true, 
                    message:data[0].custom[0].text ? data[0].custom[0].text : dataHandler.text, 
                    questionArray: data[0].custom[0].qna,
                    parent: hist,
                  }
                  );
                dispatch(addMessage({
                  array:msg,
                  length:msg.length
              }))
              }
             
                else{
                  const dataHandler = data[0].custom[0];
                  console.log(dataHandler,message,"opts")
                  msg.unshift(
                    { 
                    type:"Bot", 
                    opt:dataHandler.type, 
                    Blayout:false, 
                    message:dataHandler.text, 
                    menu:dataHandler.buttons, 
                    Cancellation:dataHandler.Cancellation,
                    ReIssuance:dataHandler.Reissuance,
                    BaggageDetails: dataHandler["Baggage Data"],
                    seat_Tru_Standard : dataHandler["Tru Saver"],
                    seat_Tru_Classic : dataHandler["Tru Classic"],
                    seat_Tru_Max_Corporate : dataHandler["Tru Max"],
                    Fare: dataHandler.Fare,
                    Seat:dataHandler.Seat,
                    contact:dataHandler.number,
                    parent: hist,
                    service: Service.service,
                  }
                  );
                dispatch(addMessage({
                  array:msg,
                  length:msg.length
              }))
            }
            }
          });
        }
    }
    const goHome=(e)=>{
      e.preventDefault()
      const msg = messageStack;
            msg.unshift(
              {
                      type:"Bot", 
                      opt:"initialoptions", 
                      Blayout:false, 
                      message:[
                        "Hi! Welcome to TruJet. We are #Trulyfriendly.",
                        "I am your AI powered assistant and I am glad to assist you."
                    ], 
                      menu:[{
                        "payload": "FAQs",
                        "title": "FAQs"
                    }], 
                      Cancellation:undefined,
                      ReIssuance:undefined,
                      BaggageDetails: undefined,
                      seat_Tru_Standard : undefined,
                      seat_Tru_Classic : undefined,
                      seat_Tru_Max_Corporate : undefined,
                      Fare: undefined,
                      Seat:undefined
              });
            dispatch(addMessage({
              array:msg,
              length:msg.length
          }))
      }
  return (
    <div className="BotchatGrid">
        {/* Chat Box */}
        <div className="botDPGrid">
            <img src={Bot} className="BotDP"/>
        </div>
        {(props.message || props.contact || props.link  || props.answer ) &&
        (<div className="BotchatBubble" 
        style={props.opt !== null && props.opt === "1" ?{width: "46.66vw"}:{}}
        >
            {props.message && (typeof(props.message) === "string" ? props.message : props.message.map((m,i)=>(<>
            <p key={i}>{m}</p>
            
            </>)))}
            {props.contact !== undefined ? (<div>
            <br/>
            <hr style={{border: "dotted 1px #ff0100"}}/>
            <br/>
            Contact : <a  style={{color:"#ff0100", fontWeight:"bold"}} href={`tel:${props.contact}`}>{` ${props.contact}`}</a>
            <br/>
            {props.link&&(<><hr style={{border: "dotted 1px #ff0100", marginTop: '1rem'}}/>
            <br/>
            Link : <a  style={{color:"#ff0100", fontWeight:"bold", marginTop: '1rem'}} href={`${props.link}`}>{` ${props.link}`}</a>
            <br/></>)}</div>):""}
            {props.answer && (
              (<div>
                <div>
                    {props.answer.type === "text" && props.answer.answer}
                    {props.answer.type === "object" && props.answer.answer[0].custom[0].text}
                    {props.answer.type === "textArray" && props.answer.answer && props.answer.answer.length > 1 && 
                    props.answer.answer.map((o,i)=>{
                        return(
                            <>
                            {o}
                            <br/>
                            <br/>
                            </>
                        )
                    })
                    }
                    {props.answer.type === "objectArray" && (
                        <ul className="fareMessageList">
                        {props.answer.arr.map((m,i) => <><li className="fareMessage" key={i}>
                            {m.Charges && m["Prior to Depature"] &&(`${m.Charges} if cancelled ${m["Prior to Depature"]} prior to flight departure`)}
                            {m.Charges && m["Row No"] &&(`${m.Charges} for ${m["Row No"]}`)}
                            {m.Size && m.Weight &&(`Dimension-${m.Size}; Weight-${m.Weight}`)}
                            </li></>)}
                        
                      </ul>
                    )}
                    {props.answer.type === "allObjectArray" && (<>
                        {props.answer.saver && (<>
                          Tru Saver 
                        <ul className="fareMessageList">
                        {props.answer.saver.map((m,i) => <><li className="fareMessage" key={i}>
                            {m.Charges && m["Prior to Depature"] &&(`${m.Charges} if cancelled ${m["Prior to Depature"]} prior to flight departure`)}
                            {m.Charges && m["Row No"] &&(`${m.Charges} for ${m["Row No"]}`)}
                            {m.Size && m.Weight &&(`Dimension-${m.Size}; Weight-${m.Weight}`)}
                            </li></>)}
                        
                      </ul>
                      </>)}
                      {props.answer.classic && (<>
                      Tru Classic
                      <ul className="fareMessageList">
                        {props.answer.classic.map((m,i) => <><li className="fareMessage" key={i}>
                            {m.Charges && m["Prior to Depature"] &&(`${m.Charges} if cancelled ${m["Prior to Depature"]} prior to flight departure`)}
                            {m.text &&(`${m.text}`)}
                            {m.Size && m.Weight &&(`Dimension-${m.Size}; Weight-${m.Weight}`)}
                            </li></>)}
                        
                      </ul>
                      </>)}
                      {props.answer.max && (<>
                      Tru Max
                      <ul className="fareMessageList">
                        {props.answer.max.map((m,i) => <><li className="fareMessage" key={i}>
                            {m.Charges && m["Prior to Depature"] &&(`${m.Charges} if cancelled ${m["Prior to Depature"]} prior to flight departure`)}
                            {m.text &&(`${m.text}`)}
                            {m.Size && m.Weight &&(`Dimension-${m.Size}; Weight-${m.Weight}`)}
                            </li></>)}
                        
                      </ul>
                      </>)}
                      </>
                    )}
                </div>
            </div>)
            )}
        </div>)}
        
        {/* Extra Bot Feature */}
        <div className="option">
          {props.opt === '0' && <SearchTab/>}
          {props.opt === "initialoptions" && (<OptionSelection/>)}
          {props.opt === "2" &&(<FlightList/>)}
          
          {/* faq Options */}
          
          {props.opt === "faqoptions" && (
            <div className="options">
              {props.options.map((m,i) => <div className="botOption" onClick={()=>{sendMessage(m.payload,props.opt)}} key={i}>{m.title}</div>)}
            </div>
          )}
          
          {/* Seat Options */}

          
          {props.opt === "standard_seat" && props.seat && (
            <>
            <div className="fareDetails">
                <p className="fareDetailsHeading">Tru Standard Seats</p>
                <ul className="fareMessageList">
                  {props.seat.map((m,i) => <><li className="fareMessage" key={i}>{m.Charges} for {m["Row No"]}</li></>)}
                </ul>
            </div>
            {props.seatMap && <button className="seatMap" onClick={()=>{sendMessage("View Seat Map",props.opt)}}>View Seat Map</button>}
            </>
          )}
          {props.opt === "classic_seat" && props.seat &&(
            <>
            <div className="fareDetails">
                <p className="fareDetailsHeading">Tru Classic Seats</p>
                <ul className="fareMessageList">
                  {props.seat.map((m,i) => <><li className="fareMessage" key={i}>{m.text}</li></>)}
                </ul>
            </div>
            {props.seatMap && <button className="seatMap" onClick={()=>{sendMessage("View Seat Map",props.opt)}}>View Seat Map</button>}
            </>
          )}
          {props.opt === "corporate_seat" && props.seat && (
            <>
            <div className="fareDetails">
                <p className="fareDetailsHeading">Tru Corporate Seats</p>
                <ul className="fareMessageList">
                  {props.seat.map((m,i) => <><li className="fareMessage" key={i}>{m.text}</li></>)}
                </ul>
            </div>
            {props.seatMap && <button className="seatMap" onClick={()=>{sendMessage("View Seat Map",props.opt)}}>View Seat Map</button>}
            </>
          )}
          {props.opt === "all_seat_charges" && (
            <>
            <div className="fareDetails">
                {props.standard_seat && (<><p className="fareDetailsHeading">Tru Standard Seats</p>
                <ul className="fareMessageList">
                  {props.standard_seat.map((m,i) => <><li className="fareMessage" key={i}>{m.Charges} for {m["Row No"]}</li></>)}
                </ul></>)}
                {props.classic_seat && (<><p className="fareDetailsHeading">Tru Classic Seats</p>
                <ul className="fareMessageList">
                  {props.classic_seat.map((m,i) => <><li className="fareMessage" key={i}>{m.text}</li></>)}
                </ul></>)}
                {props.max_corp_seat &&(<><p className="fareDetailsHeading">Tru Corporate Seats</p>
                <ul className="fareMessageList">
                  {props.max_corp_seat.map((m,i) => <><li className="fareMessage" key={i}>{m.text}</li></>)}
                </ul></>)}
            </div>
            {props.seatMap && <button className="seatMap" onClick={()=>{sendMessage("View Seat Map",props.opt)}}>View Seat Map</button>}
            </>
          )}

          {/* Fare Options */}
          
          {props.opt === "fareoptions" && (
            <div className="options">
              {props.options.map((m,i) => <div className="botOption" onClick={()=>{sendMessage(m.payload,props.opt)}} key={i}>{m.title}</div>)}
            </div>
          )}
          {props.opt === "tru_standard_fare" && props.fare && (
            <>
            <div className="fareDetails">
                <p className="fareDetailsHeading">Tru Standard Fare Charges</p>
                <ul className="fareMessageList">
                  {props.fare.map((m,i) => <><li className="fareMessage" key={i}>{m.Particulars} : {m["Details"]}</li></>)}
                </ul>
            </div>
            {props.seatMap && <button className="seatMap" onClick={()=>{sendMessage("View Seat Map",props.opt)}}>View Seat Map</button>}
            </>
          )}
          {props.opt === "tru_classic_fare" && props.fare && (
            <>
            <div className="fareDetails">
                <p className="fareDetailsHeading">Tru Classic Fare Charges</p>
                <ul className="fareMessageList">
                  {props.fare.map((m,i) => <><li className="fareMessage" key={i}>{m.Particulars} : {m["Details"]}</li></>)}
                </ul>
            </div>
            {props.seatMap && <button className="seatMap" onClick={()=>{sendMessage("View Seat Map",props.opt)}}>View Seat Map</button>}
            </>
          )}
          {props.opt === "tru_max_corp_fare" && props.fare && (
            <>
            <div className="fareDetails">
                <p className="fareDetailsHeading">Tru Corporate Fare Charges</p>
                <ul className="fareMessageList">
                  {props.fare.map((m,i) => <><li className="fareMessage" key={i}>{m.Particulars} : {m["Details"]}</li></>)}
                </ul>
            </div>
            {props.seatMap && <button className="seatMap" onClick={()=>{sendMessage("View Seat Map",props.opt)}}>View Seat Map</button>}
            </>
          )}
          {props.opt === "all_fare_categories" && (
            <>
            <div className="fareDetails">
                <p className="fareDetailsHeading">Tru Standard Fare Charges</p>
                <ul className="fareMessageList">
                  {props.standard_seat && props.standard_seat.map((m,i) => <><li className="fareMessage" key={i}>{m.Particulars} : {m["Details"]}</li></>)}
                </ul>
                <p className="fareDetailsHeading">Tru Classic Fare Charges</p>
                <ul className="fareMessageList">
                  {props.classic_seat && props.classic_seat.map((m,i) => <><li className="fareMessage" key={i}>{m.Particulars} : {m["Details"]}</li></>)}
                </ul>
                <p className="fareDetailsHeading">Tru Max Corporate Fare Charges</p>
                <ul className="fareMessageList">
                  {props.max_corp_seat && props.max_corp_seat.map((m,i) => <><li className="fareMessage" key={i}>{m.Particulars} : {m["Details"]}</li></>)}
                </ul>
            </div>
            {props.seatMap && <button className="seatMap" onClick={()=>{sendMessage("View Seat Map",props.opt)}}>View Seat Map</button>}
            </>
          )}

          {/* Baggage Options */}

          

          {/* General Options */}

          {props.opt === "prohibiteditemoptions" && (
            <div className="options">
              {props.options.map((m,i) => <div className="botOption" onClick={()=>{sendMessage(m.payload,props.opt)}} key={i}>{m.title}</div>)}
            </div>
          )}

          {/* Cancellation Options */}

          
          {props.opt === "cancel_std_image" && props.cancellation &&(
            <>
            <div className="fareDetails">
                <p className="fareDetailsHeading">Cancellation Charges</p>
                <ul className="fareMessageList">
                  {props.cancellation.map((m,i) => <><li className="fareMessage" key={i}>{m.Charges} if cancelled {m["Prior to Depature"]} prior to flight departure</li></>)}
                  
                </ul>
                <p className="fareDetailsHeading">Cancellation Important Note</p>
                <ul className="fareMessageList">
                  <li className="fareMessage">Cancellation can be done before 1 Hr to the departure with Nil charges.</li>
                </ul>
            </div>
            {props.seatMap && <button className="seatMap" onClick={()=>{sendMessage("View Seat Map",props.opt)}}>View Seat Map</button>}
            </>
          )}
          {props.opt === "cancel_std_image2" && props.cancellation &&(
            <>
            <div className="fareDetails">
                <p className="fareDetailsHeading">Cancellation Charges</p>
                <ul className="fareMessageList">
                  {props.cancellation.map((m,i) => <><li className="fareMessage" key={i}>{m.Charges} if cancelled {m["Prior to Depature"]} prior to flight departure</li></>)}
                  <li className="fareMessage">100% cancellation charges within 4 hours of the flight departure time.</li>
                  
                </ul>
                <p className="fareDetailsHeading">Cancellation Important Note</p>
                <ul className="fareMessageList">
                  <li className="fareMessage">Cancellation can be done before 1 Hr to the departure with Nil charges.</li>
                </ul>
            </div>
            {props.seatMap && <button className="seatMap" onClick={()=>{sendMessage("View Seat Map",props.opt)}}>View Seat Map</button>}
            </>
          )}
          {props.opt === "cancel_classic_image" && props.cancellation  &&(
            <>
            <div className="fareDetails">
                <p className="fareDetailsHeading">Cancellation Charges</p>
                {props.cancellation&&(<ul className="fareMessageList">
                  {props.cancellation.map((m,i) => <><li className="fareMessage" key={i}>{m.Charges} if cancelled {m["Prior to Depature"]} prior to flight departure</li></>)}
                  <li className="fareMessage">100% cancellation charges within 4 hours of the flight departure time.</li>
                  
                </ul>)}
                <p className="fareDetailsHeading">Cancellation Important Note</p>
                <ul className="fareMessageList">
                  <li className="fareMessage">Cancellation can be done before 1 Hr to the departure with Nil charges.</li>
                </ul>
            </div>
            {props.seatMap && <button className="seatMap" onClick={()=>{sendMessage("View Seat Map",props.opt)}}>View Seat Map</button>}
            </>
          )}
          {props.opt === "cancel_max_corp_image" && props.cancellation  &&(
            <>
            <div className="fareDetails">
                <p className="fareDetailsHeading">Cancellation Charges</p>
                <ul className="fareMessageList">
                  {props.cancellation.map((m,i) => <><li className="fareMessage" key={i}>{m.Charges} if cancelled {m["Prior to Depature"]} prior to flight departure</li></>)}
                  <li className="fareMessage">100% cancellation charges within 4 hours of the flight departure time.</li>
                  
                </ul>
                <p className="fareDetailsHeading">Cancellation Important Note</p>
                <ul className="fareMessageList">
                  <li className="fareMessage">Cancellation can be done before 1 Hr to the departure with Nil charges.</li>
                </ul>
            </div>
            {props.seatMap && <button className="seatMap" onClick={()=>{sendMessage("View Seat Map",props.opt)}}>View Seat Map</button>}
            </>
          )}
          {props.opt === "all_cancellation_charges" && (
            <>
            <div className="fareDetails">
                {props.standard_seat &&(<><p className="fareDetailsHeading"> TRU Standard Cancellation Charges</p>
                <ul className="fareMessageList">
                  {props.standard_seat.map((m,i) => <><li className="fareMessage" key={i}>{m.Charges} if cancelled {m["Prior to Depature"]} prior to flight departure</li></>)}
                  
                </ul></>)}
                {props.classic_seat &&(<><p className="fareDetailsHeading"> TRU Classic Cancellation Charges</p>
                <ul className="fareMessageList">
                  {props.classic_seat.map((m,i) => <><li className="fareMessage" key={i}>{m.text}</li></>)}
                  
                </ul></>)}
                {props.max_corp_seat &&(<><p className="fareDetailsHeading"> TRU Max Corporate Cancellation Charges</p>
                <ul className="fareMessageList">
                  {props.max_corp_seat.map((m,i) => <><li className="fareMessage" key={i}>{m.text}</li></>)}
                </ul></>)}
            </div>
            {props.seatMap && <button className="seatMap" onClick={()=>{sendMessage("View Seat Map",props.opt)}}>View Seat Map</button>}
            </>
          )}

          { props.answer && props.answer.type && props.answer.type === "object" && (
            <div className="options">
              {props.answer.answer[0].custom[0].buttons.map((m,i) => <div className="botOption" onClick={()=>{sendMessage(m.payload,props.opt)}} key={i}>{m.title}</div>)}
            </div>
          )}
          {/* Re-Issuance Options */}

          {props.opt === "changefeeoptions" && (
            <div className="options">
              {props.options.map((m,i) => <div className="botOption" onClick={()=>{sendMessage(m.payload,props.opt)}} key={i}>{m.title}</div>)}
            </div>
          )}
          
          
          {props.opt === "reissuance_standard" && props.reissuance && (
            <>
            <div className="fareDetails">
                {props.reissuance && (<><p className="fareDetailsHeading">Re-Issuance Charges</p>
                <ul className="fareMessageList">
                  {props.reissuance.map((m,i) => m.Charges !== undefined && <><li className="fareMessage" key={i}>{m.Charges} if re issued {m["Prior to Depature"]} prior to flight departure</li></>)}
                  <li className="fareMessage">DOF stands for Difference Of Fare</li>
                  
                </ul></>)}
            </div>
            {props.seatMap && <button className="seatMap" onClick={()=>{sendMessage("View Seat Map",props.opt)}}>View Seat Map</button>}
            </>
          )}
          {props.opt === "reissuance_classic" && props.reissuance && (
            <>
            <div className="fareDetails">
                {props.reissuance && (<><p className="fareDetailsHeading">Re-Issuance Charges</p>
                <ul className="fareMessageList">
                  {props.reissuance.map((m,i) => m.Charges !== undefined && <><li className="fareMessage" key={i}>{m.Charges} if re issued {m["Prior to Depature"]} prior to flight departure</li></>)}
                  <li className="fareMessage">DOF stands for Difference Of Fare</li>
                  
                </ul></>)}
            </div>
            {props.seatMap && <button className="seatMap" onClick={()=>{sendMessage("View Seat Map",props.opt)}}>View Seat Map</button>}
            </>
          )}
          {props.opt === "reissuance_max_corp2" && props.reissuance && (
            <>
            <div className="fareDetails">
                {props.reissuance && (<><p className="fareDetailsHeading">Re-Issuance Charges</p>
                <ul className="fareMessageList">
                  {props.reissuance.map((m,i) => m.Charges !== undefined && <><li className="fareMessage" key={i}>{m.Charges} if re issued {m["Prior to Depature"]} prior to flight departure</li></>)}
                  <li className="fareMessage">DOF stands for Difference Of Fare</li>
                  
                </ul></>)}
            </div>
            {props.seatMap && <button className="seatMap" onClick={()=>{sendMessage("View Seat Map",props.opt)}}>View Seat Map</button>}
            </>
          )}
          {props.opt === "reissuance_standard2" && props.reissuance && (
            <>
            <div className="fareDetails">
                {props.reissuance && (<><p className="fareDetailsHeading">Re-Issuance Charges</p>
                <ul className="fareMessageList">
                  {props.reissuance.map((m,i) => m.Charges !== undefined && <><li className="fareMessage" key={i}>{m.Charges} if re issued {m["Prior to Depature"]} prior to flight departure</li></>)}
                  <li className="fareMessage">DOF stands for Difference Of Fare</li>
                  
                </ul></>)}
            </div>
            {props.seatMap && <button className="seatMap" onClick={()=>{sendMessage("View Seat Map",props.opt)}}>View Seat Map</button>}
            </>
          )}
          {props.opt === "all_reissuance_charges" && (
            <>
            <div className="fareDetails">
                {props.standard_seat && (<><p className="fareDetailsHeading">Re-Issuance Standard Charges</p>
                <ul className="fareMessageList">
                  {props.standard_seat.map((m,i) => m.Charges !== undefined && <><li className="fareMessage" key={i}>{m.Charges} if re issued {m["Prior to Depature"]} prior to flight departure</li></>)}
                  <li className="fareMessage">DOF stands for Difference Of Fare</li>
                  
                </ul></>)}
                {props.classic_seat && (<><p className="fareDetailsHeading">Re-Issuance Classic Charges</p>
                <ul className="fareMessageList">
                  {props.classic_seat.map((m,i) => m.Charges !== undefined && <><li className="fareMessage" key={i}>{m.Charges} if re issued {m["Prior to Depature"]} prior to flight departure</li></>)}
                  <li className="fareMessage">DOF stands for Difference Of Fare</li>
                  
                </ul></>)}
                {props.max_corp_seat &&(<><p className="fareDetailsHeading">Re-Issuance Max Corporate Charges</p>
                <ul className="fareMessageList">
                  {props.max_corp_seat.map((m,i) => m.text !== undefined && <><li className="fareMessage" key={i}>{m["text"]}</li></>)}
                  
                </ul></>)}
            </div>
            {props.seatMap && <button className="seatMap" onClick={()=>{sendMessage("View Seat Map",props.opt)}}>View Seat Map</button>}
            </>
          )}
          {props.opt === "checkinbaggage" &&(<BaggageDetails data={props.baggage}/>)}
          {props.opt === "cabinbaggage" &&(<BaggageDetails data={props.baggage}/>)}
          {props.opt === "baggageallowance" &&(<BaggageDetails data={props.baggage}/>)}
          {props.opt === "6" &&(<WeightList/>)}
          {props.opt === "7" &&(<TicketBooking/>)}
          {props.opt === "8" &&(<Passengers/>)}
          {props.opt === "9" &&(<SeatSelection/>)}
          {props.opt === "10" &&(<TicketBookingFinal/>)}
          {props.opt === "5" &&(<MenuList/>)}
          {props.opt === "12" &&(<BookingDetails/>)}
          {props.opt === "13" &&(<TruJetSeatMap/>)}
          {props.Blayout === false && props.opt !== "faqoptions" && props.opt !== "initialoptions" && props.service === "FAQs"?
          <button className="goBackButton" onClick={()=>{sendMessage("Go Back",props.opt)}}>Go Back</button>:""}
          {props.Blayout === false && props.opt !== "faqoptions" && props.opt !== "initialoptions" && props.service !== "FAQs"?
          <button className="goBackButton" onClick={goHome}>Go Back</button>:""}
        
        </div>
        {props.Blayout === true &&
        <div className="bigOption">
          {props.opt === "cancellationoptions" && (
            <>
            {props.qarray && props.qarray.length > 0 && (<QuestionSlider opt={props.opt} qarray={props.qarray}/>)}
            {props.options && props.options.length > 0 && (<div className="options">
              {props.options.map((m,i) => <div className="botOption" onClick={()=>{sendMessage(m.payload,props.opt)}} key={i}>{m.title}</div>)}
            </div>)}
            </>
          )}
          {props.opt === "seatoptions" && (
            <>
            {props.qarray && props.qarray.length > 0 && (<QuestionSlider opt={props.opt} qarray={props.qarray}/>)}
            {props.options && props.options.length > 0 && (<div className="options">
              {props.options.map((m,i) => <div className="botOption" onClick={()=>{sendMessage(m.payload,props.opt)}} key={i}>{m.title}</div>)}
            </div>)}
            </>
          )}
          {props.opt === "baggageoptions" && (
            <>
            {props.qarray && props.qarray.length > 0 && (<QuestionSlider opt={props.opt} qarray={props.qarray}/>)}
            {props.options && props.options.length > 0 && (<div className="options">
              {props.options.map((m,i) => <div className="botOption" onClick={()=>{sendMessage(m.payload,props.opt)}} key={i}>{m.title}</div>)}
            </div>)}
            </>
          )}
          {props.opt === "specialservices" && (
           <>
           {props.qarray && props.qarray.length > 0 && (<QuestionSlider opt={props.opt} qarray={props.qarray}/>)}
           {props.options && props.options.length > 0 && (<div className="options">
             {props.options.map((m,i) => <div className="botOption" onClick={()=>{sendMessage(m.payload,props.opt)}} key={i}>{m.title}</div>)}
           </div>)}
           </>
          )}
          {props.opt === "refundfaqoptions" && (
           <>
           {props.qarray && props.qarray.length > 0 && (<QuestionSlider opt={props.opt} qarray={props.qarray}/>)}
           {props.options && props.options.length > 0 && (<div className="options">
             {props.options.map((m,i) => <div className="botOption" onClick={()=>{sendMessage(m.payload,props.opt)}} key={i}>{m.title}</div>)}
           </div>)}
           </>
          )}
          {props.opt === "generaloptions" && (
           <>
           {props.qarray && props.qarray.length > 0 && (<QuestionSlider opt={props.opt} qarray={props.qarray}/>)}
           {props.options && props.options.length > 0 && (<div className="options">
             {props.options.map((m,i) => <div className="botOption" onClick={()=>{sendMessage(m.payload,props.opt)}} key={i}>{m.title}</div>)}
           </div>)}
           </>
          )}
          {props.opt === "webcheckinoptions" && (
           <>
           {props.qarray && props.qarray.length > 0 && (<QuestionSlider opt={props.opt} qarray={props.qarray}/>)}
           {props.options && props.options.length > 0 && (<div className="options">
             {props.options.map((m,i) => <div className="botOption" onClick={()=>{sendMessage(m.payload,props.opt)}} key={i}>{m.title}</div>)}
           </div>)}
           </>
          )}
          {props.opt === "11" &&(<TicketSlider/>)}
          {props.opt === "14" &&(<DoubleTicketSlider/>)}
          { props.service === 'FAQs' || props.opt === "cancellationoptions"  || props.opt === "webcheckinoptions" || props.opt === "seatoptions" || props.opt === "baggageoptions" || props.opt === "specialservices" || props.opt === "refundfaqoptions" || props.opt === "generaloptions" || props.opt === "refundfaqoptions" ? (<button className="goBackButton" style={{width:"calc(80.46667*0.230rem)"}} onClick={()=>{sendMessage("Go Back",props.opt)}}>Go Back</button>):""}
           
        </div>
        }
    </div>
  );
}

export default BotChatBubble;
