import FooterSection from "../components/FooterSection";
import GvtOfficialNavbar from "../components/gvt-official/GvtOfficialNavbar";
import WelcomeMessage from "../components/WelcomeMessage";
import AllReportedIncidents from "../components/gvt-official/AllReportedIncidents";
import ShareState from "../components/Learn-react/ShareState";

function GovernmentOfficialDashboard() {
  const username = localStorage.getItem("username") || "Guest";

 

  return (
    <div className="min-h-screen">
      <GvtOfficialNavbar />
      <WelcomeMessage username={username} />
      <ShareState />
      <AllReportedIncidents />
      <FooterSection />
    </div>
  );
}

export default GovernmentOfficialDashboard;
