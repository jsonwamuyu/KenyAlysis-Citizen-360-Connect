// import PollCard from "./PollCard";

// const Polls = () => {
//   // Example Poll Data (Would come from API in real usage)
//   const pollData = [
//     {
//       title: "Do you support the new Finance Bill 2025?",
//       description:
//         "Vote on whether you support or oppose the proposed Finance Bill for 2025.",
//       expiryDate: "2025-12-31",
//       optionYes: "Yes, I support",
//       optionNo: "No, I oppose",
//       optionNotSure: "Not Sure",
//       votes: { yes: 120, no: 80, notSure: 50 },
//     },
//     {
//       title: "Do you support the Adani deals.",
//       description: "Vote on whether you support or oppose this deal.",
//       expiryDate: "2025-12-31",
//       optionYes: "Yes, I support",
//       optionNo: "No, I oppose",
//       optionNotSure: "Not Sure",
//       votes: { yes: 1, no: 1, notSure: 1 },
//     },
//   ];

//   return (
//     <div className=" bg-gray-100 py-24" id="active-polls">
//       <div className="container space-y-8">
//         <div className="pb-4">
//           <h3>Active Polls</h3>
//           <p className="text-sm">
//             <strong>You can ONLY vote ONCE</strong>. Make your vote count
//           </p>
//         </div>
//         <div className="flex flex-col space-y-8">
//           {pollData.map((poll) => {
//             return <PollCard key={poll.title} {...poll} />;
//           })}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Polls;


import { useEffect, useState } from "react";
import PollCard from "./PollCard";

const Polls = () => {
  const [polls, setPolls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPolls = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/polls/get-all-polls", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Ensure the user is authenticated
          },
        });
        console.log("Polls API Response:", response.json); // ✅ Check the response
        const data = await response.json();
        console.log(data)
        if (response.ok) {
          setPolls(data);
        } else {
          setError(data.message || "Failed to fetch polls");
        }
      } catch (err) {
        setError("Error fetching polls. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchPolls();
  }, []);
  // console.log(polls)

  return (
    <div className="bg-gray-100 py-24" id="active-polls">
      <div className="container space-y-8">
        <div className="pb-4">
          <h3>Active Polls</h3>
          <p className="text-sm">
            <strong>You can ONLY vote ONCE</strong>. Make your vote count.
          </p>
        </div>

        {/* Show Loading State */}
        {loading && <p>Loading polls...</p>}

        {/* Show Error Message if Any */}
        {error && <p className="text-red-500">{error}</p>}

        {/* Display Polls */}
        <div className="flex flex-col sm:grid sm:grid-cols-2 gap-8">
          {polls.length > 0 ? (
            polls.map((poll) => <PollCard key={poll.id} {...poll} />)
          ) : (
            <p>No active polls available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Polls;
