const Milestones=()=>{

    return(
        <div className='Milestones'>
            <h1>Milestones</h1>

            <table>
                <tbody>            
                    <th className='Step'></th>
                    <th>At Least One Dose⁺</th>
                    <th>Fully Vaccinated⁺</th>
                    <tr className='OldStep'>
                        <th className='Step'>Step 1</th>
                        <td>60%</td>
                        <td>0%</td>
                    </tr>
                    <tr className='OldStep'>
                        <th className='Step'>Step 2</th>
                        <td>70%</td>
                        <td>20%</td>
                    </tr>
                    <tr className='OldStep'>
                        <th className='Step'>Step 3</th>
                        <td>70-80%</td>
                        <td>25%</td>
                    </tr>
                    <tr className='OldStep'>
                        <th className='Step'>Next Phase</th>
                        <td>80%</td>
                        <td>75%</td>
                    </tr>
                </tbody>
            </table>
            <p id='daysBetween'>⁺Of eligible pupolation (12+ years old)<br></br>*Must be in each stage for minimum 21 days before progression</p>


        <style jsx>
            {`
                margin:0px;
                font-family: 'Inter', sans-serif;
                
                .Milestones{
                    border-style:solid;
                    border-width:1px;
                    border-radius:5px;
                    height:33vh;
                    overflow:hidden;
                }

                h1{
                    padding-left: .5vw;
                    font-size: 1.75vw;
                    text-decoration:underline;
                  }

                p{
                    margin: 0px;
                    line-height: 1.1;
                    text-align: left;
                    
                    position: absolute;
                    font-size: .75vw;
                    top:27vh;
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
                    text-align: center;
                }
                .OldStep{
                    text-decoration:line-through;
                    text-decoration-color: rgba(0,0,0,1)

                }
              `}
        </style>

        </div>
    )
}

export default Milestones