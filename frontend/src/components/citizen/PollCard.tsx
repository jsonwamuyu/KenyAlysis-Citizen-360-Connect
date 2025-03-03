// function PollCard({
//   title,
//   description,
//   expiry_date,
//   option_yes,
//   option_no,
//   option_not_sure,
// }: {
//   title: string;
//   description: string;
//   expiry_date: string;
//   option_yes: string;
//   option_no: string;
//   option_not_sure: string;
// }) {
//   return (
//     <div className="bg-gray-100 rounded-sm border-gray-200 border-[1px] p-2.5 hover:bg-white">
//       <h5>{title}</h5>
//       <p className="line-clamp-1">{description}</p>
//       <div>
//         <select name="" id="">
//           <option value="Yes">YES</option>
//           <option value="NO">NO</option>
//           <option value="Not Sure">NOT SURE</option>
//         </select>
//       </div>
//     </div>
//   );
// }

// export default PollCard;

// import PollCard from "./PollCard";

// const Polls = () => {
//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
//       <PollCard
//         question="Which is your favorite programming language?"
//         options={["JavaScript", "Python", "C++", "Java"]}
//         votes={[45, 30, 15, 10]}
//         totalVotes={100}
//       />
//     </div>
//   );
// };

// export default Polls;





// const PollCard = ({ title, description, options, votes, totalVotes }) => {
//   return (
//     <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
//       {/* Poll Question */}
//       <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>

//       {/* Poll Options */}
//       <div className="space-y-2">
//         {options.map((option, index) => {
//           const percentage = totalVotes > 0 ? (votes[index] / totalVotes) * 100 : 0;
//           return (
//             <div key={index}>
//               <p className="text-sm font-medium text-gray-700">{option}</p>
//               <div className="w-full bg-gray-200 rounded-full h-3">
//                 <div
//                   className="bg-green-500 h-3 rounded-full"
//                   style={{ width: `${percentage}%` }}
//                 ></div>
//               </div>
//               <p className="text-xs text-gray-500">{votes[index]} votes ({percentage.toFixed(1)}%)</p>
//             </div>
//           );
//         })}
//       </div>

//       {/* Vote Button */}
//       <button className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700">
//         Vote Now
//       </button>
//     </div>
//   );
// };



const PollCard = ({ title, description, expiryDate, optionYes, optionNo, optionNotSure, votes }) => {
  const totalVotes = votes.yes + votes.no + votes.notSure;

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
      {/* Poll Title */}
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      <p className="text-sm text-gray-600 mb-4">{description}</p>

      {/* Expiry Date */}
      <p className="text-xs text-red-500">Expires on: {new Date(expiryDate).toDateString()}</p>

      {/* Poll Options */}
      <div className="mt-4 space-y-2">
        {[{ label: optionYes, count: votes.yes }, { label: optionNo, count: votes.no }, { label: optionNotSure, count: votes.notSure }].map((option, index) => {
          const percentage = totalVotes > 0 ? (option.count / totalVotes) * 100 : 0;
          return (
            <div key={index}>
              <p className="text-sm font-medium text-gray-700">{option.label}</p>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-blue-500 h-3 rounded-full"
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-500">{option.count} votes ({percentage.toFixed(1)}%)</p>
            </div>
          );
        })}
      </div>

      {/* Vote Button */}
      <button className="mt-4 w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700">
        Vote Now
      </button>
    </div>
  );
};




export default PollCard;

