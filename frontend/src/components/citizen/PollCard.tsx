import { useState } from "react";
import API from "../../utils/API/axiosInstance";

const PollCard = ({
  id,
  title,
  description,
  expiry_date,
  option_yes,
  option_no,
  option_not_sure,
  hasVoted,
}) => {
  const [voted, setVoted] = useState(hasVoted);
  const [votes, setVotes] = useState({
    yes: option_yes,
    no: option_no,
    notSure: option_not_sure,
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleVote = async (voteOption) => {
    if (voted) return; // Prevent multiple votes

    setLoading(true);
    try {
      const response = await API.post(`/polls/${id}/vote`, {
        vote: voteOption,
      });
      setMessage(response.data.message);

      // Update local vote count dynamically
      setVotes((prev) => ({
        ...prev,
        [voteOption]: prev[voteOption] + 1,
      }));

      setVoted(true); // Disable buttons after voting
    } catch (error) {
      setMessage("Error submitting vote. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-sm p-6 rounded-sm">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-sm text-gray-600 py-2">{description}</p>
      <p className="text-sm font-semibold text-red-400">
        Expires: {new Date(expiry_date).toLocaleDateString()}
      </p>

      <div className="mt-4 flex flex-row gap-2">
        <button
          className={`py-2 px-4 rounded ${
            voted
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-500 hover:bg-green-600 text-white"
          }`}
          onClick={() => handleVote("yes")}
          disabled={voted || loading}
        >
          {voted ? "Already Voted" : `Vote Yes (${votes.yes})`}
        </button>

        <button
          className={`py-2 px-4 rounded ${
            voted
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-red-500 hover:bg-red-600 text-white"
          }`}
          onClick={() => handleVote("no")}
          disabled={voted || loading}
        >
          {voted ? "Already Voted" : `Vote No (${votes.no})`}
        </button>

        <button
          className={`py-2 px-4 rounded ${
            voted
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gray-500 hover:bg-gray-600 text-white"
          }`}
          onClick={() => handleVote("notSure")}
          disabled={voted || loading}
        >
          {voted ? "Already Voted" : `Not Sure (${votes.notSure})`}
        </button>
      </div>

      <div className="pt-2">
        {message && (
          <p className="text-sm mt-2 text-gray-700">{message}</p>
        )}
      </div>
    </div>
  );
};

export default PollCard;
