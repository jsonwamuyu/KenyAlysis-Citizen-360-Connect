import { pollData } from "../../utils";
import PollCard from "./PollCard";

function ActivePolls(){
    return(
        <div className="w-full" id="active-polls">
            <div className="container">
                <h4>Active Polls</h4>
                <p className="text-sm">Participate in the polls and make your voice count.</p>
                <div>
                    {pollData.map((poll)=>{
                        return(<PollCard {...poll}/>)
                    })}
                </div>
            </div>
        </div>
    )
}

export default ActivePolls