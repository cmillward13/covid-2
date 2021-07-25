const Rules=()=>{


    return(
        <div className='Rules'>
            <h1>Rules</h1>

            <table>
                <tbody>
                    <th className='Step'></th>
                    <th className='Rule'>Public Health Rules</th>
                    <tr id='OldRules'>
                        <th className='Step'>Step 1</th>
                        <td>Outdoor dining with 4-person table limit, non-essential retail at 15% capacity
                        </td>
                    </tr>
                    <tr id='OldRules'>
                        <th className='Step' id='Step2Rules'>Step 2</th>
                        <td>Outdoor sports leagues, personal Care Services</td>
                    </tr>
                    <tr id='CurrentRules'>
                        <th className='Step'>Step 3</th>
                        <td>Gyms, indoor dining, indoor sports, libraries, etc.</td>
                    </tr>
                    <tr>
                        <th className='Step'>Next Phase</th>
                        <td>TBD??</td>
                    </tr>
                </tbody>
            </table>

            <p id='RulesPlus'>*More info found in Sources links (below)</p>

            <style jsx>
                {`
                    font-family: 'Inter', sans-serif;
                    margin:0px;

                    .Rules{
                        border-style:solid;
                        border-width:1px;
                        border-radius:5px;
                        height:38vh;

                        margin-top:1vh;
                    }
                    .Rule{
                        width: 16vw;
                      }
                    h1{
                        padding-left: .5vw;
                        font-size: 1.75vw;
                        text-decoration:underline;
                      }
    
                    p{
                        margin: 0px;
                        text-align: left;
                        
                        position: absolute;
                        font-size: .75vw;
                        top:70vh;
                        padding-left: 5px;
                        padding-right: 5px;
                    }
                    th{
                        width:8vw;
                        font-size: 0.9vw;
                        text-align: centre;
                    }
                    td{
                        font-size: 0.9vw;
                        text-align: left;
                    }

                    .Step{
                        width:4vw;
                        vertical-align:top;
                    }
                    #CurrentRules{
                        border-radius:10px;
                        box-shadow:1px 1px 20px rgba(0,100,255,.5);
                        -webkit-box-shadow:1px 1px 20px rgba(0,100,255,.5);
                    }
                    #OldRules{
                        text-decoration:line-through;
                        text-decoration-color: rgba(0,0,0,1)
                    }
                `}
            </style>
        </div>
    )
}

export default Rules