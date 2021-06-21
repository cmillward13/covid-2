import Link from 'next/link'
const Sources=()=>{


    return(
        <div className='Sources'>
            <h1>Sources</h1>

            <Link href='https://www.ontario.ca/page/reopening-ontario'>
                <a>Ontario Reopening Plan</a>
            </Link>
            <br></br>
            <Link href='https://data.ontario.ca/dataset/covid-19-vaccine-data-in-ontario'>
                <a>Ontario Vaccination Statistics
                </a>
            </Link>


            <style jsx>
                {`
                    font-family: 'Inter', sans-serif;
                    margin:0px;

                    .Sources{
                        border-style:solid;
                        border-width:1px;
                        border-radius:5px;
                        height:10.5vh;

                        margin-top:1vh;
                    }
                    h1{
                        padding-left: .5vw;
                        font-size: 1.25vw;
                        text-decoration:underline;
                      }
                    a{
                        font-size:.9vw;
                        padding-left: 5px;
                        padding-right: 5px;
                    }
                `}
            </style>
        </div>
    )

}

export default Sources