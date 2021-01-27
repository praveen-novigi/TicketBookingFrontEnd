import React from 'react';
import '../App.css';
import Bot from '../assests/images/Bot.svg';
import OptionSelection from './OptionSelection';
import FlightList from './FlightList';
import MenuList from './MenuList';
import WeightList from './WeightList';

function BotChatBubble(props) {
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
          {props.opt === "1" && (<OptionSelection/>)}
          {props.opt === "2" &&(<FlightList/>)}
          {props.opt === "3" && (
            <div className="options">
              {props.options.map((m,i) => <div className="botOption" key={i}>{m}</div>)}
            </div>
          )}
          {props.opt === "4" && (
            <>
            <div className="fareDetails">
                <p className="fareDetailsHeading">Retail Fare</p>
                <ul className="fareMessageList">
                  <li className="fareMessage">INR 3000 if cancelled above 72 Hrs of flight departure</li>
                  <li className="fareMessage">INR 3500 if cancelled above 72 Hrs of flight departure</li>
                  <li className="fareMessage">100% cancellation charges within 4 hours of the flight departure time.</li>
                </ul>
                <p className="fareDetailsHeading">Corporate Fare</p>
                <ul className="fareMessageList">
                  <li className="fareMessage">Cancellation can be done before 1 Hr to the departure with Nil charges.</li>
                </ul>
            </div>
            {props.seatMap && <button className="seatMap">View Seat Map</button>}
            </>
          )}
          {props.opt === "6" &&(<WeightList/>)}
        <p className="Bottime">16:54</p>
        </div>
        {props.Blayout === true &&
        <div className="bigOption">
          {props.opt === "5" &&(<MenuList/>)}
           <p className="Bottime">16:54</p>
        </div>
        }
    </div>
  );
}

export default BotChatBubble;
