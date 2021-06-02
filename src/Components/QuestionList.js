import React,{useEffect, useState} from 'react';
import '../App.css';
import QuestionBlock from './QuestionBlock';

function QuestionList(props){
    return(
        props.list.map((o,i)=>{
            return (
                <QuestionBlock question={o.question} answer={o.answer}/>
                )
        })
    )
}
export default QuestionList;