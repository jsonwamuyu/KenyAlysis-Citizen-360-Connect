// import AiChat from "../../pages/AiChat";
// import { pollData } from "../../utils";
// import PollCard from "./PollCard";

// function ActivePolls() {
//   return (
//     <div className="w-full" id="active-polls">
//       <div className="container">
//         <h3>Active Polls</h3>
//         <p className="text-sm pb-2">
//           <strong>You can ONLY vote ONCE.</strong> Participate in the polls and
//           make your voice count.
//         </p>
//         <div>
//           {pollData.map((poll) => {
//             return <PollCard key={poll.id} {...poll} />;
//           })}
//         </div>

//         <AiChat />
//       </div>
//     </div>
//   );
// }

// export default ActivePolls;

import PollCard from "./PollCard";

const Polls = () => {
  // Example Poll Data (Would come from API in real usage)
  const pollData = [
    {
      title: "Do you support the new Finance Bill 2025?",
      description:
        "Vote on whether you support or oppose the proposed Finance Bill for 2025.",
      expiryDate: "2025-12-31",
      optionYes: "Yes, I support",
      optionNo: "No, I oppose",
      optionNotSure: "Not Sure",
      votes: { yes: 120, no: 80, notSure: 50 },
    },
    {
      title: "Do you support the Adani deals.",
      description: "Vote on whether you support or oppose this deal.",
      expiryDate: "2025-12-31",
      optionYes: "Yes, I support",
      optionNo: "No, I oppose",
      optionNotSure: "Not Sure",
      votes: { yes: 1, no: 1, notSure: 1 },
    },
  ];

  return (
    <div className=" bg-gray-100 py-24" id="active-polls">
      <div className="container space-y-8">
        <div className="pb-4">
          <h3>Active Polls</h3>
          <p className="text-sm">
            <strong>You can ONLY vote ONCE</strong>. Make your vote count
          </p>
        </div>
        <div className="flex flex-col space-y-8">
          {pollData.map((poll) => {
            return <PollCard key={poll.title} {...poll} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Polls;
