import ReactDOM from 'react-dom'
import {Line} from 'react-chartjs-2'

const VaccineChart = (props)=>{

    const size=props.props.size

    var getData=async()=>{

        //get all desired data objects
        var objs=(await props.props.data.result.records).filter(a=>{return a.Agegroup==="Adults_18plus"})

        //get all dates
        var dates=objs.map(a=>new Date(a.Date.concat("T00:00:00")).toDateString().slice(4))
        
        //get % individuals partially vaccinated
        const partiallyVaxx=objs.map(a=>(a.Percent_at_least_one_dose*100))
        
        //get % individuals fully vaccinated
        const fullyVaxx=objs.map(a=>(a.Percent_fully_vaccinated*100))
        
        //Functions
        const diff=arr=>arr.slice(1).map((n,i)=>n-arr[i])
        const avg = arr=>arr.reduce((a,b)=> a + b,0)/arr.length
        const addDays=(date,days)=>{
            var temp = new Date(date)
            return new Date(temp.setDate(temp.getDate()+days))
        }
        // const max=(obj)=>{return (obj.full>obj.atLeast ? obj.full:obj.atLeast)}
        
        const getDates=(startDate,endDate)=>{
            var dateArr =[];
            var final= new Date(endDate);
            var curr = new Date(startDate);
           
            while(curr<final){
                curr=addDays(curr,1)
                dateArr.push(new Date(curr).toDateString().slice(4));
            }
            return dateArr;
        }

        //Get growth rate
        const fullSlope=avg(diff(fullyVaxx.slice(-5))) //avg growth rate of fully vaxx
        const partSlope=avg(diff(partiallyVaxx.slice(-5))) //avg growth rate of partially vaxx

        //Best Case (21 Day marks)
        var G2day= new Date(2021,5,30)
        var G3day=addDays(G2day,21)

        //Step 2 Predictions
        const projectedStep2Dates=getDates(dates.slice(-1),G3day)
        dates.push(...projectedStep2Dates)

        var projectedStep2Full=partiallyVaxx.map(a=>null) //empty data for trendline
        var projectedStep2FullTrendline=projectedStep2Dates.map((e,i)=>{return((i+1)*fullSlope)+fullyVaxx.slice(-1)[0]});
        projectedStep2Full.push(...projectedStep2FullTrendline)
        var projectedStep2Part=partiallyVaxx.map(a=>null) //empty data for trendline
        var projectedStep2PartTrendline=projectedStep2Dates.map((e,i)=>{return((i+1)*partSlope)+partiallyVaxx.slice(-1)[0]});
        projectedStep2Part.push(...projectedStep2PartTrendline)

        //21 days after step 3 begins
        const t21days=addDays(dates.slice(-1),21)
        const extraDays=getDates(dates.slice(-1),t21days)
        dates.push(...extraDays)

        var projected21Part=projectedStep2Full.map(a=>null)
        var projected21PartTrendline=extraDays.map((e,i)=>{return((i+1)*partSlope)+projectedStep2PartTrendline.slice(-1)[0]});
        projected21Part.push(...projected21PartTrendline)

        var projected21Full=projectedStep2Full.map(a=>null)
        var projected21FullTrendline=extraDays.map((e,i)=>{
            var projected=((i+1)*fullSlope)+projectedStep2FullTrendline.slice(-1)[0]
            if(projected>projected21PartTrendline[i]){
                return projected21PartTrendline[i]
            }else{return projected}
        });
        projected21Full.push(...projected21FullTrendline)

        


        var data = {
            labels:dates,
            datasets: [
              {
                  label: 'Current At Least One Dose',
                  data:partiallyVaxx,
                  fill:true,
                  backgroundColor: 'rgba(0, 0, 0, 0.1)',
                  borderColor: 'rgba(0, 0, 0, 0.3)',
              },
              {
                label: 'Current Fully Vaccinated',
                data: fullyVaxx,
                fill: true,
                backgroundColor: 'rgba(0, 0, 0, 0.1)',
                borderColor: 'rgba(0, 0, 0, 1)',
                
              },
              {
                  label:'Step 2 Projections - At Least One Dose',
                  data:projectedStep2Part,
                  borderColor:'rgba(255, 247, 5, 0.3)',
                  backgroundColor:'rgba(255, 247, 5, 0.3)',
                  fill:true,
                  hidden:false
              },
              {
                  label:'Step 2 Projections - Fully Vaccinated',
                  data:projectedStep2Full,
                  borderColor:'rgba(255, 247, 5, 1)',
                  backgroundColor:'rgba(255, 247, 5, 0.3)',
                  fill:true,
                  hidden:false
              },
              {
                label:'Step 3 Projections - At Least One Dose',
                data:projected21Part,
                borderColor:'rgba(36, 199, 4, 0.3)',
                backgroundColor:'rgba(36, 199, 4, 0.2)',
                fill:true,
                hidden:false
              },
              {
                label:'Step 3 Projections - Fully Vaccinated',
                data:projected21Full,
                borderColor:'rgba(36, 199, 4, 1)',
                backgroundColor:'rgba(36, 199, 4, 0.2)',
                fill:true,
                hidden:false
              },
            ],
          };
        
        //If we're in that stage
        if(new Date()>= G3day){data.datasets.splice(2,2)}
            
        const options={
            maintainAspectRatio: false,
            scales:{
                x:{
                    grid:{
                        display:false,
                    },
                    ticks:{
                        autoskip:true,
                        maxTicksLimit:15,
                        font:{
                            size:size.width*0.01,
                            family:'Inter'
                        }
                    }
                },
                y:{
                    min:0,
                    grid:{
                        display:true,
                    },
                    ticks:{
                        callback:(value)=>{
                            return value+"%"
                        },
                        font:{
                            size:size.width*.01,
                            familt:'Inter'
                        }
                    },
                    title:{
                        text:'Share of Adult Pupulation Vaccinated',
                        display:true,
                        font:{
                            family:'Inter',
                            size:size.height*0.02
                        }
                    }
                    
                }
            },
            plugins:{
                title:{
                    display:true,
                    text:"Ontario's Vaccination Progress",
                    font:{
                        size:size.width*0.015,
                        family:'Inter'
                    },
                },
                legend:{
                    display:true,
                    position:'right',
                    labels:{
                        usePointStyle:true,
                        font:{
                            size:size.width*0.008,
                            family:'Inter',
                        },
                        boxWidth:5
                    },
                    onHover: function(event,legendItem){
                        var ci = this.chart;
                        var hoveredDatasetIndex = legendItem.datasetIndex;

                        ci.legend.legendItems[hoveredDatasetIndex].lineWidth=2
                        ci.legend.legendItems[hoveredDatasetIndex].fontColor=(ci.legend.legendItems[hoveredDatasetIndex].hidden ?'rgb(0,255,0)':'rgb(255,2,0)')
                        ci.render();
                    },
                    onLeave:function(event,legendItem){
                        var ci = this.chart;
                        var hoveredDatasetIndex = legendItem.datasetIndex

                        ci.legend.legendItems[hoveredDatasetIndex].lineWidth=1
                        ci.legend.legendItems[hoveredDatasetIndex].fontColor='rgb(0,0,0)'
                        ci.render();
                    },
                },
                tooltip:{
                    intersect:false,
                    mode:'index',
                    position:'nearest'
                }
            },
            elements:{
                point:{
                    radius:1.5,
                    hoverRadius:5,
                    hoverBorderColor:'rgb(0,0,0)'
                }
            }
        }


        const element=<Line 
            className='DosesChart' 
            data={data}
            options={options}
            />;

        ReactDOM.render(element, document.getElementById('DosesChartArea'));
    }

    getData();

    return(        
    
    <div id='DosesChartArea'>
        <div id='FetchingData'>
            Fetching Data
            <span id='arrow1'>↓</span>
            <span id='arrow2'>↓</span>
            <span id='arrow3'>↓</span>
            <span id='arrow4'>↓</span>
            <span id='arrow5'>↓</span>
        </div>

        <style jsx>
            {`  
            #DosesChartArea{
                    position: fixed;
                    top:11vh;
                    right:1vw;

                    height:84vh;
                    width:77vw;

                    border-style: solid;
                    border-width: 1px;
                    border-radius: 5px;

                    font-family: 'Inter', sans-serif;
                    background-color: white;

                    z-index: -1;
                }

                #FetchingData{
                    top:50;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    height:85vh;
                }

                @keyframes arrows {
                    0%{
                        color:rgba(0,0,${255/2},1)
                    }
                    25%{
                        color: rgba(0, 0, ${255}, 0.8);
                        transform: translateY(20px);
                    }
                    50% {
                    }
                    75% {
                        color: rgba(0,0,0,1);
                        transform: translateY(-20px);
                    }
                    100%{
                        color:rgba(0,0,${255/2},1);
                    }
                }
                #arrow1{
                    --delay: 0s;
                    animation: arrows 1s var(--delay) infinite ease-in;
                }
                #arrow2{
                    --delay: 0.1s;
                    animation: arrows 1s var(--delay) infinite ease-in;
                }
                #arrow3{
                    --delay: 0.2s;
                    animation: arrows 1s var(--delay) infinite ease-in;
                }
                #arrow4{
                    --delay: 0.3s;
                    animation: arrows 1s var(--delay) infinite ease-in;
                }
                #arrow5{
                    --delay: 0.4s;
                    animation: arrows 1s var(--delay) infinite ease-in;
                }
            `}
        </style>
    </div>
    )
}

export default VaccineChart


