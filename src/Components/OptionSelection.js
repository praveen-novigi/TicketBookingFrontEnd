import React,{useState} from 'react';
import '../App.css';
import airplane from '../assests/images/airplane.svg';
import question from '../assests/images/question.svg';
import suitcase from '../assests/images/suitcase.svg';
import { useHistory} from "react-router-dom";
import {useDispatch} from 'react-redux';
import {selectTodo} from '../Redux/actions/todoActions';

function OptionSelection() {
    const [select,setSelect]=useState("");
    const dispatch = useDispatch();
  return (
    <div className="selectionGrid">
        <div className="airplaneMainBox" style={select === 'airplane' ?{background:"#ff0100",color:"white"}:{}} 
        onClick={()=>{
            dispatch(selectTodo({
                selected:true,
                service:"Flights"
            }))
            setSelect("airplane")}}>
            <div className="airplaneBox" style={select === 'airplane' ?{background:"white"}:{}}>
                <img src={airplane} className="airplane"/>
            </div>
            <p className="airplaneText">Flights</p>
        </div>
        <div className="questionMainBox" style={select === 'question' ?{background:"#ff0100",color:"white"}:{}} 
        onClick={()=>{
            dispatch(selectTodo({
                selected:true,
                service:"FAQs"
            }))
            setSelect("question")}}>
            <div className="questionBox" style={select === 'question' ?{background:"white"}:{}}>
                <img src={question} className="question"/>
            </div>
            <p className="questionText">FAQs</p>
        </div>
        <div  className="suitcaseMainBox" style={select === 'suitcase' ?{background:"#ff0100",color:"white"}:{}}  
        onClick={()=>{
            dispatch(selectTodo({
                selected:true,
                service:"Bookings"
            }))
            setSelect("suitcase")}}>
            <div  className="suitcaseBox" style={select === 'suitcase' ?{background:"white"}:{}}>
                <img src={suitcase} className="suitcase"/>
            </div>
            <p className="suitcaseText">Bookings</p>
        </div>
    </div>
  );
}

export default OptionSelection;
