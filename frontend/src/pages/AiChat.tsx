import { Link } from "react-router-dom";

function AiChat() {
  return (
    <div className="mt-8 flex flex-col gap-8">
      <div className="flex flex-row items-center justify-between">
        <h5>The Constitution of Kenya</h5>
        <div>
          <Link to="#" className="text-green-500 flex flex-row items-center gap-2">
           Download PDF</Link>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
      <div>
          <button className="cta-secondary">Click to get the summary</button>
          <p className="text-sm pt-4 w-full md:w-2xl">
            Your summary will appear here. this will be generated after you have
            clicked the button and see what you see. Make me believe in this office today.
          </p>
        </div>
        <form action="" className="w-full md:w-2xl">
          <textarea
            name=""
            id=""
            rows={4}
            placeholder="Ask followup question"
          ></textarea>
        </form>
        
      </div>
    </div>
  );
}

export default AiChat;
