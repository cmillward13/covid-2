import Milestones from "./Milestones"
import Rules from "./Rules"
import Sources from "./Sources"

const LeftBar=()=>{

    return(
        <div>
            <Milestones></Milestones>
            <Rules></Rules>
            <Sources></Sources>

        <style jsx>
            {`
                position:absolute;
                top:11vh;
                left:1vh;
                bottom:5vh;
                width:20vw;

                border:solid;
                border-width:0px;
                
                .Milestones{
                    background-color:red;
                }
            `}
        </style>
        </div>    
    )
}

export default LeftBar