import ReactDOM from 'react-dom'
import {Line} from 'react-chartjs-2'
import {useEffect, useState} from 'react'

const VaccineChart = (props)=>{

    const size=props.props.size

    var getData=async()=>{

        //get all desired data objects
        var objs=(await props.props.data.result.records).filter(a=>{return a.Agegroup==="Adults_18plus"})


        //get all dates
        var dates=objs.map(a=>new Date(a.Date).toDateString().slice(4))
        
        //get % individuals partially vaccinated
        const partiallyVaxx=objs.map(a=>(a.Percent_at_least_one_dose*100))
        
        //get % individuals fully vaccinated
        const fullyVaxx=objs.map(a=>(a.Percent_fully_vaccinated*100))

        ///////////PREDICTIONS/////////
        const StartDate=new Date(2021,5,11) //START DATE OF STEP 1
        const Goal2={atLeast:70,full:20}
        const Goal3={atLeast:80,full:25}
        
        //Functions
        const diff=arr=>arr.slice(1).map((n,i)=>n-arr[i])
        const avg = arr=>arr.reduce((a,b)=> a + b,0)/arr.length
        const addDays=(date,days)=>{
            var temp = new Date(date)
            return new Date(temp.setDate(temp.getDate()+days))
        }
        const max=(obj)=>{return (obj.full>obj.atLeast ? obj.full:obj.atLeast)}
        
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
        var G2day=addDays(StartDate,21)
        var G3day=addDays(G2day,21)
        

        // index of Start date
        const startDateindex=dates.indexOf(StartDate.toDateString().slice(4))
        
        //GOAL #2
        const tG2 ={ //Time to goal #2
            atLeast:Math.ceil((Goal2.atLeast-partiallyVaxx[startDateindex])/partSlope), //how much more we need divided by how much we gain each day
            full:Math.ceil((Goal2.full-fullyVaxx[startDateindex])/fullSlope)
        }

        var estStep2=addDays(StartDate,max(tG2))

        if(estStep2>G2day){ //if vaccination rate is slower than idea
            G2day=addDays(estStep2,14) //set predicted date
            G3day=addDays(G2day,21)
        }

        var projectedStep2Dates=getDates(dates.slice(-1),G2day)
        dates.push(...projectedStep2Dates)
            
        var projectedStep2Full=partiallyVaxx.map(a=>null) //empty data for trendline
        var projectedStep2FullTrendline=projectedStep2Dates.map((e,i)=>{return((i+1)*fullSlope)+fullyVaxx.slice(-1)[0]}) 
        var projectedStep2Part=partiallyVaxx.map(a=>null)
        var projectedStep2PartTrendline=projectedStep2Dates.map((e,i)=>{return((i+1)*partSlope)+partiallyVaxx.slice(-1)[0]});
        projectedStep2Full.push(...projectedStep2FullTrendline) //put it all into one
        projectedStep2Part.push(...projectedStep2PartTrendline)

        //GOAL 3
        const tG3={
            part:Math.ceil((Goal3.part-projectedStep2PartTrendline.slice(-1))/partSlope), //difference from end of Goal 1 predictions
            full:Math.ceil((Goal3.full-projectedStep2FullTrendline.slice(-1))/fullSlope)            
        }
        
        var estStep3=addDays(projectedStep2Dates.slice(-1),max(tG3))
        if(estStep3>G3day){
            G3day=addDays(estStep3,14)
        }

        const projectedStep3Dates=getDates(dates.slice(-1),G3day)
        dates.push(...projectedStep3Dates)

        var projectedStep3Full=projectedStep2Full.map(a=>null)
        var projectedStep3FullTrendline=projectedStep3Dates.map((e,i)=>{return((i+1)*fullSlope)+projectedStep2FullTrendline.slice(-1)[0]});

        projectedStep3Full.push(...projectedStep3FullTrendline)
        var projectedStep3Part=projectedStep2Full.map(a=>null)
        var projectedStep3PartTrendline=projectedStep3Dates.map((e,i)=>{return((i+1)*partSlope)+projectedStep2PartTrendline.slice(-1)[0]});
        projectedStep3Part.push(...projectedStep3PartTrendline)

        //21 days after step 3 begins
        const t21days=addDays(dates.slice(-1),21)
        const extraDays=getDates(dates.slice(-1),t21days)
        dates.push(...extraDays)

        var projected21Part=projectedStep3Full.map(a=>null)
        var projected21PartTrendline=extraDays.map((e,i)=>{return((i+1)*partSlope)+projectedStep3PartTrendline.slice(-1)[0]});
        projected21Part.push(...projected21PartTrendline)

        var projected21Full=projectedStep3Full.map(a=>null)
        var projected21FullTrendline=extraDays.map((e,i)=>{
            var projected=((i+1)*fullSlope)+projectedStep3FullTrendline.slice(-1)[0]
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
                  label:'Step 1 Projections - At Least One Dose',
                  data:projectedStep2Part,
                  backgroundColor:'rgba(235, 152, 52, 0.3)',
                  borderColor:'rgba(235, 152, 52, 0.3)',
                  fill:true
              },
              {
                  label:'Step 1 Projections - Fully Vaccinated',
                  data:projectedStep2Full,
                  backgroundColor:'rgba(235, 152, 52, 0.3)',
                  borderColor:'rgba(235, 152, 52, 1)',
                  fill:true
              },
              {
                  label:'Step 2 Projections - At Least One Dose',
                  data:projectedStep3Part,
                  borderColor:'rgba(255, 247, 5, 0.3)',
                  backgroundColor:'rgba(255, 247, 5, 0.3)',
                  fill:true,
                  hidden:false
              },
              {
                  label:'Step 2 Projections - Fully Vaccinated',
                  data:projectedStep3Full,
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


