// import { useEffect, useState } from "react";
// import API from "../../utils/API/axiosInstance";
// import IncidentCardOfficial from "./IncidentCardOfficial";

// const GovernmentOfficialDashboard = () => {
//   // interface Incident {
//   //   id: number;
//   //   category: string;
//   //   description: string;
//   //   location: string;
//   //   status: "submitted" | "inprogress" | "resolved";
//   // }

//   const [incidents, setIncidents] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [statusFilter, setStatusFilter] = useState("all");

//   useEffect(() => {
//     const fetchIncidents = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         if (!token) {
//           setError("Unauthorized: No token provided.");
//           setLoading(false);
//           return;
//         }

//         const response = await API.get(
//           "http://localhost:8080/api/incidents/get-all-incidents",
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );

//         setIncidents(response.data);
//       } catch (err) {
//         setError("Error fetching incidents. Try again.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchIncidents();
//   }, []);

//   const handleStatusChange = async (incidentId: number, newStatus: string) => {
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         setError("Unauthorized: No token provided.");
//         return;
//       }

//       await API.put(
//         `http://localhost:8080/api/incidents/${incidentId}/status`,
//         { status: newStatus },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       setIncidents((prevIncidents) =>
//         prevIncidents.map((incident) =>
//           incident.id === incidentId
//             ? { ...incident, status: newStatus }
//             : incident
//         )
//       );
//     } catch (error) {
//       setError("Failed to update incident status.");
//     }
//   };

//   console.log(handleStatusChange)

//   const filteredIncidents =
//     statusFilter === "all"
//       ? incidents
//       : incidents.filter((incident) => incident.status === statusFilter);
//   console.log("Filtered incidents", filteredIncidents);

//   return (
//     <div className="w-full pt-8">
//       <div className="container ">
//         {loading && <p className="text-gray-600">Loading incidents...</p>}
//         {error && <p className="text-red-500">{error}</p>}

//         {/* filtering */}
//         <div className="mb-16 pt-8 justify-center items-center flex gap-8">
//           <label className="font-semibold">Filter by Status:</label>
//           <select
//             className="border p-2 px-4 rounded-sm"
//             value={statusFilter}
//             onChange={(e) => setStatusFilter(e.target.value)}
//           >
//             <option value="all">All</option>
//             <option value="Pending">Pending</option>
//             <option value="In Progress">In Progress</option>
//             <option value="Resolved">Resolved</option>
//           </select>
//         </div>

//         <div className="gap-x-8 grid grid-cols-1 sm:grid-cols-2">
//           {filteredIncidents.length > 0 ? (
//             filteredIncidents.map((incident) => (
//               <IncidentCardOfficial
//                 key={incident.id}
//                  {...incident}

//               />
//             ))
//           ) : (
//             <h5>There are incidents reported.</h5>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default GovernmentOfficialDashboard;





// import { useEffect, useState } from "react";
// import API from "../../utils/API/axiosInstance";
// import IncidentCardOfficial from "./IncidentCardOfficial";

// const GovernmentOfficialDashboard = () => {
//   const [incidents, setIncidents] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchIncidents = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         if (!token) {
//           setError("Unauthorized: No token provided.");
//           setLoading(false);
//           return;
//         }

//         const response = await API.get(
//           "http://localhost:8080/api/incidents/get-all-incidents",
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );

//         setIncidents(response.data);
//       } catch (err) {
//         setError("Error fetching incidents. Try again.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchIncidents();
//   }, []);

//   const handleStatusChange = async (incidentId: number, newStatus: string) => {
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         setError("Unauthorized: No token provided.");
//         return;
//       }

//       await API.put(
//         `http://localhost:8080/api/incidents/${incidentId}/status`,
//         { status: newStatus },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       setIncidents((prevIncidents) =>
//         prevIncidents.map((incident) =>
//           incident.id === incidentId
//             ? { ...incident, status: newStatus }
//             : incident
//         )
//       );
//     } catch (error) {
//       setError("Failed to update incident status.");
//     }
//   };

//   return (
//     <div className="w-full pt-8">
//       <div className="container ">
//         {loading && <p className="text-gray-600">Loading incidents...</p>}
//         {error && <p className="text-red-500">{error}</p>}

//         <div className="gap-x-8 grid grid-cols-1 sm:grid-cols-2">
//           {incidents.length > 0 ? (
//             incidents.map((incident) => (
//               <IncidentCardOfficial key={incident.id} {...incident} />
//             ))
//           ) : (
//             <h5>No incidents reported.</h5>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default GovernmentOfficialDashboard;



import { useEffect, useState } from "react";
import API from "../../utils/API/axiosInstance";
import IncidentCardOfficial from "./IncidentCardOfficial";

const GovernmentOfficialDashboard = () => {
  interface Incident {
    id: number;
    category: string;
    description: string;
    location: string;
    status: "submitted" | "inprogress" | "resolved";
  }

  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchIncidents = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Unauthorized: No token provided.");
          setLoading(false);
          return;
        }

        const response = await API.get(
          "http://localhost:8080/api/incidents/get-all-incidents",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setIncidents(response.data);
      } catch (err) {
        setError("Error fetching incidents. Try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchIncidents();
  }, []);

  return (
    <div className="w-full pt-8">
      <div className="container ">
        {loading && <p className="text-gray-600">Loading incidents...</p>}
        {error && <p className="text-red-500">{error}</p>}

        <div className="gap-x-8 grid grid-cols-1 sm:grid-cols-2">
          {incidents.length > 0 ? (
            incidents.map((incident) => (
              <IncidentCardOfficial key={incident.id} {...incident} />
            ))
          ) : (
            <h5>No incidents reported.</h5>
          )}
        </div>
      </div>
    </div>
  );
};

export default GovernmentOfficialDashboard;
