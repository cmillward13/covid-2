const Explanation=()=>{

    return(
        <div id='ExplanationBox'>
            <p id='ExplanationText'>This tool is only a <b>very crude</b> estimation of when the next steps to reopening may occur. <b>It simply forecasts a linear trend from the past 5 days' vaccination data.</b> This model does not account for the multiple other factors that the Ontario Government takes into consideration when determining when to advance. It does not attempt to predict the entire timeline of Ontario's COVID-19 closure. Moreover, the farther in the future it looks, the less accurate it becomes. This is simply a <i>"if we continue at this rate, this is where we'll be"</i>. Nothing smarter than that.</p>

            <style jsx>
                {`
                    #ExplanationBox{
                        
                        font-family: 'Inter', sans-serif;
                        font-size:0.8vw;

                        position: absolute;
                        right:1vw;
                        top:11vh;
                    
                        width:16vw;
                        height:25vh;
                    
                        background-color: rgba(255, 0, 0, 0.123);
                        border-radius: 5px;
                        border-color: rgba(255, 0, 0, 0.466);
                        border-style: solid;
                        border-width: 1px;
                    
                        overflow-y: auto;
                    }
                    ::-webkit-scrollbar-track{
                        -webkit-box-shadow: inset 0 0 6px rgba(255,0,0,0.1);
                    }
                    
                    ::-webkit-scrollbar{
                        width: 5px;
                        background-color: rgba(255, 0, 0, .2);
                    }
                    
                    ::-webkit-scrollbar-thumb{
                        border-radius: 10px;
                      background-color: rgba(202, 0, 0, 0.5);
                    }
                `}
            </style>
        </div>
    )
}

export default Explanation