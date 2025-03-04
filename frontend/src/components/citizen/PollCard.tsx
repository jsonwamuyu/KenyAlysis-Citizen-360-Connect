import { useState, useEffect } from "react";
import axios from "axios";
import API from "../../utils/API/axiosInstance";

interface PollCardParams {
  title: string;
  description: string;
  expiryDate: string;
  optionYes: string;
  optionNo: string;
  optionNotSure: string;
  votes: string;
}
const PollCard = ({
  title,
  description,
  expiryDate,
  optionYes,
  optionNo,
  optionNotSure,
  votes,
}: PollCardParams) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleVote = async () => {
    if (!selectedOption) {
      setMessage("Please select an option before voting.");
      return;
    }

    setLoading(true);
    try {
      // API request to submit the vote
      const response = await API.post(`http://localhost:8080/api/polls/vote`, {
        poll_id: id,
        option: selectedOption,
      });

      setMessage(response.data.message);
    } catch (error) {
      setMessage("Error submitting vote. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const totalVotes = votes.yes + votes.no + votes.notSure;

  return (
    <div className="bg-white shadow-sm rounded-sm p-8 w-full gap-8 flex flex-col">
      <div className="w-full">
        {/* Poll Title */}
        <h4 className="text-lg font-semibold text-gray-900">{title}</h4>
        <p className="text-sm text-gray-600 mb-4">{description}</p>

        {/* Expiry Date */}
        <p className="text-xs text-red-500">
          Expires on: {new Date(expiryDate).toDateString()}
        </p>
      </div>

      <div className="w-full flex flex-col  sm:flex-row gap-16">
        <div className="sm:w-1/3">
          {/* Poll Options */}
          <div className=" space-y-2 ">
            {[
              { label: optionYes, value: "yes", count: votes.yes },
              { label: optionNo, value: "no", count: votes.no },
              { label: optionNotSure, value: "not_sure", count: votes.notSure },
            ].map((option, index) => (
              <label
                key={index}
                className={`flex items-center gap-2 border rounded-md p-2 cursor-pointer ${
                  selectedOption === option.value
                    ? "border-green-500 bg-green-50"
                    : "border-gray-300"
                }`}
              >
                <input
                  type="radio"
                  name="pollVote"
                  value={option.value}
                  className="hidden"
                  onChange={() => setSelectedOption(option.value)}
                />
                <span className="w-4 h-4 border border-gray-400 rounded-full flex justify-center items-center">
                  {selectedOption === option.value && (
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  )}
                </span>
                {option.label}
              </label>
            ))}

            {/* Vote Button */}
            <button
              onClick={handleVote}
              className={`mt-4 w-full py-2 px-4 rounded-sm outline-none border-none cursor-pointer text-white ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700"
              }`}
              disabled={loading}
            >
              {loading ? "Submitting..." : "Vote Now"}
            </button>
          </div>

          {/* Message Display */}
          {message && (
            <p className="text-sm text-center mt-2 text-gray-700">{message}</p>
          )}
        </div>
        {/* Poll results */}
        <div className=" space-y-2 w-full">
          <h6 className="text-sm">
            <strong>{totalVotes}</strong> people have voted
          </h6>
          {[
            { label: optionYes, count: votes.yes },
            { label: optionNo, count: votes.no },
            { label: optionNotSure, count: votes.notSure },
          ].map((option, index) => {
            const percentage =
              totalVotes > 0 ? (option.count / totalVotes) * 100 : 0;
            return (
              <div key={index}>
                <p className="text-sm font-medium text-gray-700">
                  {option.label}
                </p>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-green-400 h-3 rounded-full"
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500">
                  {option.count} votes ({percentage.toFixed(1)}%)
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PollCard;
