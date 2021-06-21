import {useState} from 'react'
import SliderButton from './SliderButton'
const Banner=(props)=>{

    return(
        <div id='Banner'>

            <b>Ontario Vaccine Tracker</b>
            <SliderButton props={props.props}></SliderButton>
            
            <style jsx>
                {`
                position:absolute;
                top:0px;
                left:0px;
                right:0px;
                height:10vh;

                font-size: 5vh;
                line-height: 5vh;
                text-align: center;
              
                display: flex;
                align-items: center;
                justify-content: center;
                font-family: 'Inter', sans-serif;

                background-color:black;
                color:white;
                `}
            </style>
        </div>
    )
}

export default Banner