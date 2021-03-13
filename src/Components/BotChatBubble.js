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
import BookingDetails from '../Components/BookingDetails';
import SeatMap from './SeatMap';
import {userRequest} from '../helper/Backend.js';
import {addMessage} from '../Redux/actions/messageArrayActions';
import {useSelector, shallowEqual} from 'react-redux';
import {useDispatch} from 'react-redux';
import BaggageDetails from './BaggageDetails';

function BotChatBubble(props) {
  const messageStack = useSelector(state => state.messageArray.array, shallowEqual);
    const msglength = useSelector(state => state.messageArray.length, shallowEqual);
    const [msgLength, setMsgLength] = useState(messageStack.length);
    React.useEffect(()=>{
        console.log(messageStack,"messages");
        setMsgLength(messageStack.length)
    },[msglength])
    const dispatch = useDispatch();
    const sendMessage=(message)=>{
        const msg = messageStack;
        if(message !== "")
        {
        msg.unshift( {type:"User", message:message})
        userRequest(message).then((data) => {
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
                console.log(dataHandler,"opts")
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
                seat_Tru_Standard : dataHandler["Tru Standard"],
                seat_Tru_Classic : dataHandler["Tru Classic"],
                seat_Tru_Max_Corporate : dataHandler["Tru Max Corporate"],
                Fare: dataHandler.Fare,
                Seat:dataHandler.Seat
              }
                );
              dispatch(addMessage({
                array:msg,
                length:msg.length
            }))
            }
          });
        }
    }
  return (
    <div className="BotchatGrid">
        {/* Chat Box */}
        <div className="botDPGrid">
            <img src={Bot} className="BotDP"/>
        </div>
        <div className="BotchatBubble" style={props.opt === "1" ?{width: "46.66vw"}:{}}>
            {props.message}
        </div>
        
        {/* Extra Bot Feature */}
        <div className="option">
          {props.opt === "initialoptions" && (<OptionSelection/>)}
          {props.opt === "2" &&(<FlightList/>)}
          
          {/* faq Options */}
          
          {props.opt === "faqoptions" && (
            <div className="options">
              {props.options.map((m,i) => <div className="botOption" onClick={()=>{sendMessage(m.payload)}} key={i}>{m.title}</div>)}
            </div>
          )}
          
          {/* Seat Options */}

          {props.opt === "seatoptions" && (
            <div className="options">
              {props.options.map((m,i) => <div className="botOption" onClick={()=>{sendMessage(m.payload)}} key={i}>{m.title}</div>)}
            </div>
          )}
          {props.opt === "standard_seat" && (
            <>
            <div className="fareDetails">
                <p className="fareDetailsHeading">Tru Standard Seats</p>
                <ul className="fareMessageList">
                  {props.standard_seat.map((m,i) => <><li className="fareMessage" key={i}>{m.Charges} for {m["Row No"]}</li><br/></>)}
                </ul>
            </div>
            {props.seatMap && <button className="seatMap">View Seat Map</button>}
            </>
          )}
          {props.opt === "classic_seat" && (
            <>
            <div className="fareDetails">
                <p className="fareDetailsHeading">Tru Classic Seats</p>
                <ul className="fareMessageList">
                  {props.classic_seat.map((m,i) => <><li className="fareMessage" key={i}>{m.Charges} for {m["Row No"]}</li><br/></>)}
                </ul>
            </div>
            {props.seatMap && <button className="seatMap">View Seat Map</button>}
            </>
          )}
          {props.opt === "corporate_seat" && (
            <>
            <div className="fareDetails">
                <p className="fareDetailsHeading">Tru Corporate Seats</p>
                <ul className="fareMessageList">
                  {props.max_corp_seat.map((m,i) => <><li className="fareMessage" key={i}>{m.Charges} for {m["Row No"]}</li><br/></>)}
                </ul>
            </div>
            {props.seatMap && <button className="seatMap">View Seat Map</button>}
            </>
          )}
          {props.opt === "all_seat_charges" && (
            <>
            <div className="fareDetails">
                <p className="fareDetailsHeading">Tru Standard Seats</p>
                <ul className="fareMessageList">
                  {props.standard_seat.map((m,i) => <><li className="fareMessage" key={i}>{m.Charges} for {m["Row No"]}</li><br/></>)}
                </ul>
                <p className="fareDetailsHeading">Tru Classic Seats</p>
                <ul className="fareMessageList">
                  {props.classic_seat.map((m,i) => <><li className="fareMessage" key={i}>{m.Charges} for {m["Row No"]}</li><br/></>)}
                </ul>
                <p className="fareDetailsHeading">Tru Corporate Seats</p>
                <ul className="fareMessageList">
                  {props.max_corp_seat.map((m,i) => <><li className="fareMessage" key={i}>{m.Charges} for {m["Row No"]}</li><br/></>)}
                </ul>
            </div>
            {props.seatMap && <button className="seatMap">View Seat Map</button>}
            </>
          )}

          {/* Fare Options */}
          
          {props.opt === "fareoptions" && (
            <div className="options">
              {props.options.map((m,i) => <div className="botOption" onClick={()=>{sendMessage(m.payload)}} key={i}>{m.title}</div>)}
            </div>
          )}
          {props.opt === "tru_standard_fare" && (
            <>
            <div className="fareDetails">
                <p className="fareDetailsHeading">Tru Standard Fare Charges</p>
                <ul className="fareMessageList">
                  {props.fare.map((m,i) => <><li className="fareMessage" key={i}>{m.Particulars} : {m["Details"]}</li><br/></>)}
                </ul>
            </div>
            {props.seatMap && <button className="seatMap">View Seat Map</button>}
            </>
          )}
          {props.opt === "tru_classic_fare" && (
            <>
            <div className="fareDetails">
                <p className="fareDetailsHeading">Tru Classic Fare Charges</p>
                <ul className="fareMessageList">
                  {props.fare.map((m,i) => <><li className="fareMessage" key={i}>{m.Particulars} : {m["Details"]}</li><br/></>)}
                </ul>
            </div>
            {props.seatMap && <button className="seatMap">View Seat Map</button>}
            </>
          )}
          {props.opt === "tru_max_corp_fare" && (
            <>
            <div className="fareDetails">
                <p className="fareDetailsHeading">Tru Corporate Fare Charges</p>
                <ul className="fareMessageList">
                  {props.fare.map((m,i) => <><li className="fareMessage" key={i}>{m.Particulars} : {m["Details"]}</li><br/></>)}
                </ul>
            </div>
            {props.seatMap && <button className="seatMap">View Seat Map</button>}
            </>
          )}
          {props.opt === "all_fare_categories" && (
            <>
            <div className="fareDetails">
                <p className="fareDetailsHeading">Tru Standard Fare Charges</p>
                <ul className="fareMessageList">
                  {props.fare.map((m,i) => <><li className="fareMessage" key={i}>{m.Particulars} : {m["Details"]}</li><br/></>)}
                </ul>
            </div>
            {props.seatMap && <button className="seatMap">View Seat Map</button>}
            </>
          )}

          {/* Baggage Options */}

          {props.opt === "baggageoptions" && (
            <div className="options">
              {props.options.map((m,i) => <div className="botOption" onClick={()=>{sendMessage(m.payload)}} key={i}>{m.title}</div>)}
            </div>
          )}

          {/* General Options */}

          {props.opt === "generaloptions" && (
            <div className="options">
              {props.options.map((m,i) => <div className="botOption" onClick={()=>{sendMessage(m.payload)}} key={i}>{m.title}</div>)}
            </div>
          )}
          {props.opt === "prohibiteditemoptions" && (
            <div className="options">
              {props.options.map((m,i) => <div className="botOption" onClick={()=>{sendMessage(m.payload)}} key={i}>{m.title}</div>)}
            </div>
          )}

          {/* Cancellation Options */}

          {props.opt === "cancellationoptions" && (
            <div className="options">
              {props.options.map((m,i) => <div className="botOption" onClick={()=>{sendMessage(m.payload)}} key={i}>{m.title}</div>)}
            </div>
          )}
          {props.opt === "cancel_std_image" && (
            <>
            <div className="fareDetails">
                <p className="fareDetailsHeading">Retail Fare</p>
                <ul className="fareMessageList">
                  {props.cancellation.map((m,i) => <><li className="fareMessage" key={i}>{m.Charges} if cancelled {m["Prior to Depature"]} prior to flight departure</li><br/></>)}
                  <li className="fareMessage">100% cancellation charges within 4 hours of the flight departure time.</li>
                  <br/>
                </ul>
                <p className="fareDetailsHeading">Corporate Fare</p>
                <ul className="fareMessageList">
                  <li className="fareMessage">Cancellation can be done before 1 Hr to the departure with Nil charges.</li>
                </ul>
            </div>
            {props.seatMap && <button className="seatMap">View Seat Map</button>}
            </>
          )}
          {props.opt === "cancel_std_image2" && (
            <>
            <div className="fareDetails">
                <p className="fareDetailsHeading">Retail Fare</p>
                <ul className="fareMessageList">
                  {props.cancellation.map((m,i) => <><li className="fareMessage" key={i}>{m.Charges} if cancelled {m["Prior to Depature"]} prior to flight departure</li><br/></>)}
                  <li className="fareMessage">100% cancellation charges within 4 hours of the flight departure time.</li>
                  <br/>
                </ul>
                <p className="fareDetailsHeading">Corporate Fare</p>
                <ul className="fareMessageList">
                  <li className="fareMessage">Cancellation can be done before 1 Hr to the departure with Nil charges.</li>
                </ul>
            </div>
            {props.seatMap && <button className="seatMap">View Seat Map</button>}
            </>
          )}
          {props.opt === "cancel_classic_image" && (
            <>
            <div className="fareDetails">
                <p className="fareDetailsHeading">Retail Fare</p>
                <ul className="fareMessageList">
                  {props.cancellation.map((m,i) => <><li className="fareMessage" key={i}>{m.Charges} if cancelled {m["Prior to Depature"]} prior to flight departure</li><br/></>)}
                  <li className="fareMessage">100% cancellation charges within 4 hours of the flight departure time.</li>
                  <br/>
                </ul>
                <p className="fareDetailsHeading">Corporate Fare</p>
                <ul className="fareMessageList">
                  <li className="fareMessage">Cancellation can be done before 1 Hr to the departure with Nil charges.</li>
                </ul>
            </div>
            {props.seatMap && <button className="seatMap">View Seat Map</button>}
            </>
          )}
          {props.opt === "cancel_max_corp_image" && (
            <>
            <div className="fareDetails">
                <p className="fareDetailsHeading">Retail Fare</p>
                <ul className="fareMessageList">
                  {props.cancellation.map((m,i) => <><li className="fareMessage" key={i}>{m.Charges} if cancelled {m["Prior to Depature"]} prior to flight departure</li><br/></>)}
                  <li className="fareMessage">100% cancellation charges within 4 hours of the flight departure time.</li>
                  <br/>
                </ul>
                <p className="fareDetailsHeading">Corporate Fare</p>
                <ul className="fareMessageList">
                  <li className="fareMessage">Cancellation can be done before 1 Hr to the departure with Nil charges.</li>
                </ul>
            </div>
            {props.seatMap && <button className="seatMap">View Seat Map</button>}
            </>
          )}

          {/* Re-Issuance Options */}

          {props.opt === "changefeeoptions" && (
            <div className="options">
              {props.options.map((m,i) => <div className="botOption" onClick={()=>{sendMessage(m.payload)}} key={i}>{m.title}</div>)}
            </div>
          )}
          
          {props.opt === "reissuance_standard" && (
            <>
            <div className="fareDetails">
                <p className="fareDetailsHeading">Retail Fare</p>
                <ul className="fareMessageList">
                  {props.reissuance.map((m,i) => m.Charges !== undefined && <><li className="fareMessage" key={i}>{m.Charges} if re issued {m["Prior to Depature"]} prior to flight departure</li><br/></>)}
                  <li className="fareMessage">DOF stands for Difference Of Fare</li>
                  <br/>
                </ul>
            </div>
            {props.seatMap && <button className="seatMap">View Seat Map</button>}
            </>
          )}
          {props.opt === "reissuance_classic" && (
            <>
            <div className="fareDetails">
                <p className="fareDetailsHeading">Retail Fare</p>
                <ul className="fareMessageList">
                  {props.reissuance.map((m,i) => m.Charges !== undefined && <><li className="fareMessage" key={i}>{m.Charges} if re issued {m["Prior to Depature"]} prior to flight departure</li><br/></>)}
                  <li className="fareMessage">DOF stands for Difference Of Fare</li>
                  <br/>
                </ul>
            </div>
            {props.seatMap && <button className="seatMap">View Seat Map</button>}
            </>
          )}
          {props.opt === "reissuance_max_corp2" && (
            <>
            <div className="fareDetails">
                <p className="fareDetailsHeading">Retail Fare</p>
                <ul className="fareMessageList">
                  {props.reissuance.map((m,i) => m.Charges !== undefined && <><li className="fareMessage" key={i}>{m.Charges} if re issued {m["Prior to Depature"]} prior to flight departure</li><br/></>)}
                  <li className="fareMessage">DOF stands for Difference Of Fare</li>
                  <br/>
                </ul>
            </div>
            {props.seatMap && <button className="seatMap">View Seat Map</button>}
            </>
          )}
          {props.opt === "reissuance_standard2" && (
            <>
            <div className="fareDetails">
                <p className="fareDetailsHeading">Retail Fare</p>
                <ul className="fareMessageList">
                  {props.reissuance.map((m,i) => m.Charges !== undefined && <><li className="fareMessage" key={i}>{m.Charges} if re issued {m["Prior to Depature"]} prior to flight departure</li><br/></>)}
                  <li className="fareMessage">DOF stands for Difference Of Fare</li>
                  <br/>
                </ul>
            </div>
            {props.seatMap && <button className="seatMap">View Seat Map</button>}
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
        {props.Blayout === false ?<p className="Bottime">16:54</p>:""}
        </div>
        {props.Blayout === true &&
        <div className="bigOption">
          {props.opt === "5" &&(<MenuList/>)}
          {props.opt === "11" &&(<TicketSlider/>)}
          {props.opt === "12" &&(<BookingDetails/>)}
          {props.opt === "13" &&(<SeatMap/>)}
           <p className="Bottime">16:54</p>
        </div>
        }
    </div>
  );
}

export default BotChatBubble;
