import React from 'react';
import '../App.css';
import Bot from '../assests/images/Bot.svg';
import OptionSelection from './OptionSelection';

function BotChatBubble() {
  return (
    <div className="BotchatGrid">
        {/* Chat Box */}
        <div className="botDPGrid">
            <img src={Bot} className="BotDP"/>
        </div>
        <div className="BotchatBubble">
            Hi Avni, What can I help you with?
        </div>
        
        {/* Extra Bot Feature */}
        <div className="option">
            <OptionSelection/>
        <p className="Bottime">16:54</p>
        </div>
    </div>
  );
}

export default BotChatBubble;
