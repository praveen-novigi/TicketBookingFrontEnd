import React,{useEffect, useState} from 'react';
import '../App.css';
import {addMessage} from '../Redux/actions/messageArrayActions';
import {useSelector, shallowEqual} from 'react-redux';
import {useDispatch} from 'react-redux';

function QuestionBlock(props){
    const [type, setType]= useState()
    const [saver, setsaver] = useState()
    const [classic, setclassic] = useState()
    const [max, setmax] = useState()
    const [arr, setarr] = useState()
    const Service = useSelector(state => state.todo);
    const messageStack = useSelector(state => state.messageArray.array, shallowEqual);
    const dispatch = useDispatch();
    const sendMessage=(message)=>{
        const msg = messageStack;
        if(message !== "")
        {
        msg.unshift( {type:"User", message:message})
                  msg.unshift(
                    { 
                    type:"Bot", 
                    opt:null, 
                    Blayout:false, 
                    answer:{type, answer:props.answer, arr, saver, classic, max},
                    parent: props.opt,
                    service: Service.service,
                  }
                  );
                dispatch(addMessage({
                  array:msg,
                  length:msg.length
              }))
        }
    }
    useEffect(()=>{
        if(typeof(props.answer) === "string"){
        setType("text");
        console.log(props.answer,"check")
    }
    else{
        if(typeof(props.answer[0]) === "string"){
            setType("textArray");
        }else{
            setType("objectArray")
            setarr(props.answer)
            if(props.answer[0].["Tru Classic"]){
                setType("allObjectArray");
                setclassic(props.answer[0].["Tru Classic"]);
                setsaver(props.answer[2].["Tru Saver"]);
                setmax(props.answer[1].["Tru Max"]);
            }
        }
    }},[])
    return(
        <>
            <div style={{padding: '2%', cursor: 'pointer', minHeight: '2.5rem', color: '#ff0100', fontSize: '0.9rem'}} onClick={()=>sendMessage(props.question)}>
                        <div>{props.question}</div>
            </div>
            <hr/>
        </>
    )
}
export default QuestionBlock;