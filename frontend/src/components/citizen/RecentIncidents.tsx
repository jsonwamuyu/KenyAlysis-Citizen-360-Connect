import IncidentCard from "./IncidentCard";
import ReportIncident from "./ReportIncident";
import { incidentData } from "../../utils";
import { useState } from "react";

function RecentIncidents() {

  const {} = useState("")

  return (
    <div className="w-full my-24" id="recent-reports">
      <div className="container">
        <h3>Recent Reported Incidents</h3>
        {/* <p className="text-sm">These are your incidents</p> */}

        <div className="grid grid-cols-1 lg:grid-cols-2 pt-4 gap-4 mb-24">
        {incidentData.map((incident) => {
          return <IncidentCard key={incident.id} {...incident} />;
        })}
        </div>

        <ReportIncident />
      </div>
    </div>
  );
}

export default RecentIncidents;
