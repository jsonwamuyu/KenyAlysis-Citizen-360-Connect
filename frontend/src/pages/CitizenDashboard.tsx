import AuthNavbar from "../components/AuthNavbar";
import FooterSection from "../components/FooterSection";
import Documents from "../components/citizen/Documents";
import ActivePolls from "../components/citizen/ActivePolls";
import RecentIncidents from "../components/citizen/RecentIncidents";

function CitizenDashboard() {
  return (
    <div>
      <AuthNavbar />
      <Documents />
      <ActivePolls />
      <RecentIncidents/>
      <FooterSection />
    </div>
  );
}

export default CitizenDashboard;
