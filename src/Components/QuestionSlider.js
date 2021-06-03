import React,{useEffect, useState} from 'react';
import '../App.css';
import next from '../assests/images/whiteNextArrow.svg';
import prev from '../assests/images/whitePrevArrow.svg';
import {useDispatch} from 'react-redux';
import Slider from "react-slick";
import QuestionList from './QuestionList';
import QuestionBlock from './QuestionBlock';


function Arrow(props) {
    let className = props.type === "next" ? "nextArrow" : "prevArrow";
    className += " arrow";
    const char = props.type === "next" ? "👉" : "👈";
    return (
      <div className={className} onClick={props.onClick} style={{display:"grid"}}>
        <img src={ props.type === "next" ? next : prev} style={{justifySelf:"center", alignSelf:"center"}}/>
      </div>
    );
  }

  
 function QuestionSlider(props) {
  const topRef = React.useRef(null)

  const scrollToTop = async() => {
      await setViewAll(true)
      topRef.current?.scrollIntoView({ behavior: "smooth" })
  }
    const flights = props.qarray
    const noOfFlights=3;
    const [totalFlights, setTotalFlights]=useState(flights.length);
    const [viewAll, setViewAll]=useState(false);
    const [lastPage, setLastPage]=useState(flights.length % noOfFlights);
    const [noPage, setNoPage]=useState(flights.length - (flights.length % noOfFlights));
    const sliderArray =(flights) =>{
        const slider=[];
        for(let i=0;i<noPage;i++){
            var ar=[];
            for(let j=0;j<noOfFlights;j++){
                if(flights[i*noOfFlights + j] !== undefined)
                
                    ar.push(flights[i*noOfFlights + j])
            }
            if(ar.length !== 0)
                slider.push(ar);
        }
        var Lar=[];
        for(let z=(noPage*noOfFlights);z<totalFlights;z++){
            if(flights[z] !== undefined){
                Lar.push(flights[z]);
                if(z === (lastPage - 1)){
                    slider.push(Lar);
                }
            }
        }
        return slider
    }
    const list=sliderArray(flights);
    const [activeSlide,setActiveSlide]=useState(null);
    const dispatch = useDispatch();
    const settings = {
        afterChange: (current, next) => setActiveSlide(next),
        className: 'center',
        // centerMode: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        speed: 500,
        swipeToSlide: true,
        arrows: true,
        dots: true,
        focusOnSelect: true,
        nextArrow:<Arrow type="next" />,
        prevArrow:<Arrow type="prev" />,
        appendDots: dots => (
            <div>
              <button key={dots} className="viewAllFlights" onClick={()=>scrollToTop()}>View All</button>
            </div>
          ),
          customPaging: i => (
            i+1
          )
      };
    return (
        <div>
        <div className="ticketSlider">
        {!viewAll && (<Slider {...settings}>
        {list.map((li,i)=>{
                return (
                    <div className="questionList">
                    <QuestionList opt={props.opt} className="item" list={li}/>
                    </div>
                )
            })}
        </Slider>)}
        {viewAll && (<>
        <div ref={topRef}/>
        <div className="questionList" style={{margin: 'auto'}}>
          {
          flights.map((o,i)=>{return(<>
              <QuestionBlock opt={props.opt} question={o.question} answer={o.answer}/>
          </>)
          })
        }
        </div>
        <div>
        <button className="viewAllFlights" onClick={()=>setViewAll(false)}>View Less</button>
      </div>
      </>
        )
        }
      </div>
        </div>
    );
}

export default QuestionSlider;
