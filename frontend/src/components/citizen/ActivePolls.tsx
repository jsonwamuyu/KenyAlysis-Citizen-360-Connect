import AiChat from "../../pages/AiChat";
import { pollData } from "../../utils";
import PollCard from "./PollCard";

function ActivePolls() {
  return (
    <div className="w-full" id="active-polls">
      <div className="container">
        <h3>Active Polls</h3>
        <p className="text-sm pb-2">
          <strong>You can ONLY vote ONCE.</strong> Participate in the polls and
          make your voice count.
        </p>
        <div>
          {pollData.map((poll) => {
            return <PollCard key={poll.id} {...poll} />;
          })}
        </div>

        <AiChat />
      </div>
    </div>
  );
}

export default ActivePolls;
