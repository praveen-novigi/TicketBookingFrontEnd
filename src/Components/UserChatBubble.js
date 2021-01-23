import React from 'react';
import '../App.css';
import User from '../assests/images/user.svg';

function UserChatBubble() {
  return (
    <div className="UserchatGrid">
        {/* Chat Box */}
        <div className="UserDPGrid">
            <img src={User} className="UserDP"/>
        </div>
        <div className="UserchatBubble">
        I want to enquire about a flight
        </div>
        
        <p className="Usertime">16:54</p>
    </div>
  );
}

export default UserChatBubble;
