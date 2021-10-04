import{Line} from 'react-chartjs-2'
import ReactDOM from 'react-dom'

const CasesChart=(props)=>{

    const size=props.props.size

    //FUNCTIONS
    function backDate(lastDate,totalNeeded){
        var dateArr =[];
        var final= new Date(lastDate);
        var temp = new Date(final.getTime())
        var first= new Date(temp.setDate(temp.getDate()-totalNeeded))

        var curr=first;
        while(curr<=final){
            dateArr.push(curr.toDateString().slice(4))
            curr= new Date(curr.setDate(curr.getDate()+1))
        }
        
        return dateArr
    }

    var getData=async()=>{

        //get all desired data objects
        const objs=(await props.props.data.result.records)

        //Get all health units
        const PHUs=[... new Set(objs.map(item=>item.PHU_NAME))].slice(1,-1).sort()

        //Get each PHU's active cases at each date
        var refDate=new Date(2021,0,8);
        var temp=PHUs.map((a,index)=>[{label:a,data:objs.filter(item=>{return item.PHU_NAME===a && new Date(item.FILE_DATE)>refDate}).map(i=>i.ACTIVE_CASES),hidden:true,borderColor:props.props.colors[index],fill:true}])

        //Make Datasets
        var datasets=[];
        var defaultShown=['CITY OF HAMILTON','MIDDLESEX-LONDON'] //health unites of interest
        for(let i=0; i<temp.length; i++){
            //only show london and hamilton
            if(defaultShown.includes(temp[i][0].label)){temp[i][0].hidden=false} //choose which ones we want displayed default
            datasets.push(temp[i][0])
        }

        //get all dates
        var lastDate=objs[objs.length-1].FILE_DATE
        var dates = backDate(lastDate,datasets[0].data.length-1)

        //Make Data for Chart
        const data={
            labels:dates,
            datasets:datasets
        }

        const options={
            maintainAspectRatio: false,
            responsive:true,
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
                        font:{
                            size:size.width*.01,
                            familt:'Inter'
                        }
                    },
                    title:{
                        text:'Active Cases',
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
                    text:"Ontario's Active COVID-19 Cases in 2021",
                    font:{
                        size:size.width*0.02,
                        family:'Inter'
                    },
                },
                legend:{
                    display:true,
                    position:'right',
                    labels:{
                        usePointStyle:true,
                        font:{
                            size:size.height*0.01,
                            family:'Inter',
                        },
                        fontColor:'rgb(0,0,0)',
                        boxWidth:5
                    },
                    onHover: function(event,legendItem){
                        var ci = this.chart;
                        var hoveredDatasetIndex = legendItem.datasetIndex;

                        ci.legend.legendItems[hoveredDatasetIndex].lineWidth=2
                        ci.legend.legendItems[hoveredDatasetIndex].fontColor=(ci.legend.legendItems[hoveredDatasetIndex].hidden ?'rgba(13, 204, 0, 1)':'rgba(255,2,0,1)')
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

        const element=
            <Line 
            className='CasesChart' 
            data={data}
            options={options}
            />;

        ReactDOM.render(element,document.getElementById('CasesChartArea'))
    }
    
    getData();
    
    return(
        <div id='CasesChartArea'>
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

                #CasesChart{
                    overflow:scroll
                }

                #CasesChartArea{
                        position: fixed;
                        top:11vh;
                        right:1vw;
                        left:1vw;

                        height:84vh;

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

export default CasesChart
