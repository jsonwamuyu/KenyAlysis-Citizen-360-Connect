import FooterSection from "../components/FooterSection";
import GvtOfficialNavbar from "../components/gvt-official/GvtOfficialNavbar";
import WelcomeMessage from "../components/WelcomeMessage";
import AllReportedIncidents from "../components/gvt-official/AllReportedIncidents";

function GovernmentOfficialDashboard() {
  const username = localStorage.getItem("username");
  return (
    <div className="min-h-screen">
      <GvtOfficialNavbar />
      <WelcomeMessage username={username} />
      <AllReportedIncidents/>
      <FooterSection />
    </div>
  );
}

export default GovernmentOfficialDashboard;
