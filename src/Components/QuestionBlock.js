import React,{useEffect, useState} from 'react';
import '../App.css';

function QuestionBlock(props){
    const [type, setType]= useState()
    const [saver, setsaver] = useState()
    const [classic, setclassic] = useState()
    const [max, setmax] = useState()
    const [arr, setarr] = useState()
    const [toggle, setToggle] = useState(false)
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
            <div style={{padding: '2%', textAlign: 'left',  display: 'grid', gridTemplateColumns : '1fr 19fr', cursor: 'pointer'}} onClick={()=>setToggle(!toggle)}>
                <div >{toggle?"<":">"}</div>
                <div>
                    <div style={{ display: 'grid', gridTemplateColumns : '1fr 19fr'}}>
                        <div>Q. </div>
                        <div>{props.question}</div>
                    </div>
                    <br/>
                    {toggle && (<div style={{ display: 'grid', gridTemplateColumns : '1fr 19fr'}}>
                        <div>A. </div>
                        <div>
                            {type === "text" && props.answer}
                            {type === "textArray" && props.answer && props.answer.length > 1 && 
                            props.answer.map((o,i)=>{
                                return(
                                    <>
                                    {o}
                                    <br/>
                                    <br/>
                                    </>
                                )
                            })
                            }
                            {type === "objectArray" && (
                                <ul className="fareMessageList">
                                {arr.map((m,i) => <><li className="fareMessage" key={i}>
                                    {m.Charges && m["Prior to Depature"] &&(`${m.Charges} if cancelled ${m["Prior to Depature"]} prior to flight departure`)}
                                    {m.Charges && m["Row No"] &&(`${m.Charges} for ${m["Row No"]}`)}
                                    {m.Size && m.Weight &&(`Dimension-${m.Size}; Weight-${m.Weight}`)}
                                    </li></>)}
                                
                              </ul>
                            )}
                            {type === "allObjectArray" && (<>
                            Tru Saver 
                                {saver && (<>
                                <ul className="fareMessageList">
                                {saver.map((m,i) => <><li className="fareMessage" key={i}>
                                    {m.Charges && m["Prior to Depature"] &&(`${m.Charges} if cancelled ${m["Prior to Depature"]} prior to flight departure`)}
                                    {m.Charges && m["Row No"] &&(`${m.Charges} for ${m["Row No"]}`)}
                                    {m.Size && m.Weight &&(`Dimension-${m.Size}; Weight-${m.Weight}`)}
                                    </li></>)}
                                
                              </ul>
                              </>)}
                              {classic && (<>
                              Tru Classic
                              <ul className="fareMessageList">
                                {classic.map((m,i) => <><li className="fareMessage" key={i}>
                                    {m.Charges && m["Prior to Depature"] &&(`${m.Charges} if cancelled ${m["Prior to Depature"]} prior to flight departure`)}
                                    {m.text &&(`${m.text}`)}
                                    {m.Size && m.Weight &&(`Dimension-${m.Size}; Weight-${m.Weight}`)}
                                    </li></>)}
                                
                              </ul>
                              </>)}
                              {max && (<>
                              Tru Max
                              <ul className="fareMessageList">
                                {max.map((m,i) => <><li className="fareMessage" key={i}>
                                    {m.Charges && m["Prior to Depature"] &&(`${m.Charges} if cancelled ${m["Prior to Depature"]} prior to flight departure`)}
                                    {m.text &&(`${m.text}`)}
                                    {m.Size && m.Weight &&(`Dimension-${m.Size}; Weight-${m.Weight}`)}
                                    </li></>)}
                                
                              </ul>
                              </>)}
                              </>
                            )}
                        </div>
                    </div>)}
                </div>
            </div>
            <hr/>
        </>
    )
}
export default QuestionBlock;