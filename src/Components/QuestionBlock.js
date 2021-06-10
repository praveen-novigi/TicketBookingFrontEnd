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
                    opt:props.answer && props.answer.length > 0 && props.answer[0] && props.answer[0].custom && props.answer[0].custom[0] && props.answer[0].custom[0].type? `${props.answer[0].custom[0].type}QnA` :null, 
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
        console.log(props.answer)
        if(typeof(props.answer) === "string"){
        setType("text");
    }
    else if(props.answer instanceof Array){
        if(typeof(props.answer[0]) === "string"){
            setType("textArray");
        }
        else if(props.answer[0].custom)
        {
            setType("object");
        }
        else{
            setType("objectArray")
            setarr(props.answer)
            if(props.answer[0].["Tru Classic"]){
                setType("allObjectArray");
                setclassic(props.answer[0].["Tru Classic"]);
                setsaver(props.answer[2].["Tru Saver"]);
                setmax(props.answer[1].["Tru Max"]);
            }
        }
    }
    },[])
    return(
        <>
            <div style={{ cursor: 'pointer', minHeight: '2rem', color: '#ff0100', fontSize: '0.9rem', display: 'grid', alignContent:'center'}} onClick={()=>sendMessage(props.question)}>
                        <div>{props.question}</div>
            </div>
            <hr className="questionDivider"/>
        </>
    )
}
export default QuestionBlock;