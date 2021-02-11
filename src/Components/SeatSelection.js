import React,{useEffect, useState} from 'react';
import '../App.css';
import economyIN from '../assests/images/greyEconomy.svg';
import economy from '../assests/images/activeEconomy.svg';
import premiumEconomyIN from '../assests/images/greyPremiumEconomy.svg';
import premiumEconomy from '../assests/images/activePremiumEconomy.svg';
import businessIN from '../assests/images/greyBusiness.svg';
import business from '../assests/images/activeBusiness.svg';

function SeatSelection() {
    const[select, setSelect]=useState("");
    return (
        <div className="seatBox">
            <div className="seatOption" style={select === "economy" ? {color:"#ff0100"}:{}} onClick={()=>setSelect("economy")}>
                <img src={select === "economy" ? economy : economyIN} style={{justifySelf:"center",alignSelf:"center", width:"6.38133vw"}}/>
                <p>Economy</p>
            </div>
            <div className="seatOption" style={select === "premiumeconomy" ? {color:"#ff0100"}:{}} onClick={()=>setSelect("premiumeconomy")}>
                <img src={select === "premiumeconomy" ? premiumEconomy : premiumEconomyIN} style={{justifySelf:"center",alignSelf:"center", width:"9.28266vw"}}/>
                <p>Premium Economy</p>
            </div>
            <div className="seatOption"  style={select === "business" ? {color:"#ff0100"}:{}} onClick={()=>setSelect("business")}>
                <img src={select === "business" ? business : businessIN} style={{justifySelf:"center",alignSelf:"center", width:"9.848vw"}}/>
                <p>Economy</p>
            </div>
        </div>
  );
}

export default SeatSelection;
