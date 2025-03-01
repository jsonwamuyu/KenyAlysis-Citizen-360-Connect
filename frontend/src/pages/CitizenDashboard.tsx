import AuthNavbar from "../components/AuthNavbar";
import FooterSection from "../components/FooterSection";
import Documents from "../components/citizen/Documents";

function CitizenDashboard() {
  return (
    <div>
      <AuthNavbar />
      <Documents />
      {/* <ActivePolls /> */}
      {/* RecentIncidents*/}
      <FooterSection />
    </div>
  );
}

export default CitizenDashboard;
