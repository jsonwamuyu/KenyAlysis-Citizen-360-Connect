import IncidentCard from "./IncidentCard";
import ReportIncident from "./ReportIncident";
// import { incidentData } from "../../utils";
import { useState, useEffect } from "react";
import API from "../../utils/API/axiosInstance";
// import { jwtDecode } from "jwt-decode";

function RecentIncidents() {
  const [incidents, setIncidents] = useState<
    {
      id: string;
      category: string;
      description: string;
      location: string;
      media_url: string;
      status: string;
    }[]
  >([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUserIncidents = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        if (!token) {
          setErrorMessage("User not authenticated. Please log in.");
          setLoading(false);
          return;
        }

        // Decode token to get user ID
        // const decodedToken = jwtDecode(token);

        const response = await API.get(
          "http://localhost:8080/api/incidents/my-incidents",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setIncidents(response.data.incidents);
      } catch (error) {
        console.log(errorMessage);
        console.log(loading);
        setErrorMessage("Failed to fetch incidents.");
      } finally {
        setLoading(false);
      }
    };
    fetchUserIncidents();
  }, []);

  return (
    <div className="w-full my-24" id="recent-reports">
      <div className="container">
        <h3>Recent Reported Incidents</h3>
        {/* <p className="text-sm">These are your incidents</p> */}

        <div className="grid grid-cols-1 lg:grid-cols-2 pt-4 gap-4 mb-24">
          {incidents.map((incident) => {
            return <IncidentCard key={incident.id} {...incident} />;
          })}
        </div>

        <ReportIncident />
      </div>
    </div>
  );
}

export default RecentIncidents;
