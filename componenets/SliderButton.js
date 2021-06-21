const SliderButton=(props)=>{

    return(
        <div id='ButtonContainer'>

            <input type='checkbox' id='Toggle' onChange={props.props}></input>
            <span className='slider'></span>
            <label className='switch'>
                Vaccines
            </label>

            <style jsx>
                {`
                #ButtonContainer{
                    position: absolute;
                    right:1vw;
                  
                    width:16vw;
                    height: 1.5vw;
                    font-size: 1vw;
                  
                    display: flex;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                  
                    background-color: rgba(2, 40, 138, 0.521);
                    border-radius: 30px;
                    color: white;
                  
                  }
                  
                  #ButtonContainer::before{
                    content:"Active Cases";
                    position: absolute;
                    top:0;
                    bottom:0;
                    right:1vw;
                    font-size: 1vw;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 2;
                  }
                  
                  .switch{
                    position: absolute;
                    top:0;
                    bottom:0;
                    left:0;
                    padding-left: 1vw;
                    font-size: 1vw;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 2;
                  
                  }
                  
                  input{
                    cursor: pointer;
                    position: absolute;
                    top: 0;
                    left: 0;
                    bottom: 0;
                    right:0;
                    width: 100%;
                    height: 100%;
                    z-index: 3;
                    opacity: 0;
                  }
                  
                  input:checked + .slider{
                    transform: translateX(8vw);
                    transition-duration: 0.5s;
                  }
                  
                  .slider{
                    position: absolute;
                    top:0;
                    bottom:0;
                    left:0px;
                    width:8vw;
                  
                    border-radius: 30px;
                  
                    background-color: rgba(0, 0, 255, 0.8);
                    transform: translateX(0);
                    transition-duration: 0.5s;
                  }
                
                `}
            </style>
        </div>
    )
}

export default SliderButton