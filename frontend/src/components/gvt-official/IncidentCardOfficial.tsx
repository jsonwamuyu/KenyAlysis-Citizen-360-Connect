import { useState } from "react";

interface IncidentProps {
  id: number;
  category: string;
  description: string;
  location: string;
  status: "submitted" | "inprogress" | "resolved";
}
function IncidentCardOfficial({
  category,
  description,
  location,
  status,
}: IncidentProps) {
  const [incidentStatus, setIncidentStatus] =
    useState<IncidentProps["status"]>(status);

  // Update incident status
  const updateIncidentStatus = () => {
    if (incidentStatus === "submitted") {
      setIncidentStatus("inprogress");
    } else if (incidentStatus === "inprogress") {
      setIncidentStatus("resolved");
    }
  };

  // Color mapping the status
  const statusColors = {
    submitted: "bg-yellow-100 text-yellow-800",
    "inprogress": "bg-blue-100 text-blue-800",
    resolved: "bg-green-100 text-green-800",
  };
  return (
    <div className="w-full rounded-lg overflow-hidden shadow-sm bg-white my-4 transform transition-all hover:scale-105">
      <div className="px-6 py-4">
        <div className="flex justify-between mb-2">
          <h4 className="font-bold text-xl text-gray-800">{category}</h4>
          <div>
            <button
              onClick={updateIncidentStatus}
              className={`px-3 py-1 rounded-full text-sm cursor-pointer font-semibold ${statusColors[status]}`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          </div>
        </div>

        <p className="text-gray-700 text-base mb-2">{description}</p>

        <div className="flex items-center text-sm text-gray-400">
          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
              clipRule="evenodd"
            />
          </svg>
          {location}
        </div>
      </div>
    </div>
  );
}

export default IncidentCardOfficial;
