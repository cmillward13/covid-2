import Link from 'next/link'
const Footer=(props)=>{

    
    if(props.props.page==='Cases'){
        var text =
            <div>
                <b>Source: </b>
                <Link href='https://data.ontario.ca/dataset/confirmed-positive-cases-of-covid-19-in-ontario'>Ontario Active Cases Statistics</Link>
            
            </div>
    }else{
        var text="The projections are just some dipshit's 10-second estimate. Please don't use this as basis for any important decisions."
    }

    return(
        <div id='Footer'>{text}
        
        <style jsx>
            {`
                font-family: 'Inter', sans-serif;
                position:fixed;
                width:100vw;
                bottom:1vh;
            
                text-align: center;
                font-size: 1vw;
            `}
        </style>
        </div>
    )
}

export default Footer