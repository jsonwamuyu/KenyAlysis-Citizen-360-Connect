import { useEffect, useState } from "react";
import PollCard from "./PollCard";

const Polls = () => {
  interface Poll {
    id: string;
    title: string;
    description: string;
    expiry_date: string;
    option_yes: string;
    option_no: string;
    option_not_sure: string;
    hasVoted: boolean;
  }

  const [polls, setPolls] = useState<Poll[]>([]);
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
        const data = await response.json();
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
