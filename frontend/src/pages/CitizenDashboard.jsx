import FooterSection from "../components/FooterSection";
import Documents from "../components/citizen/Documents";
import ActivePolls from "../components/citizen/ActivePolls";
import RecentIncidents from "../components/citizen/RecentIncidents";
import GovernmentAnnouncements from "../components/citizen/GovernmentAnnouncements";
import WelcomeMessage from "../components/WelcomeMessage";
import Chatbot from "../components/ChatBot";
import CitizenNavbar from "../components/citizen/CitizenNavbar";

function CitizenDashboard() {

  let username = localStorage.getItem("username");

  return (
    <div>
      <CitizenNavbar />
      <WelcomeMessage username={username}/>
      <Chatbot />
      <Documents />
      <ActivePolls />
      <RecentIncidents />
      <GovernmentAnnouncements />
      <FooterSection />
    </div>
  );
}

export default CitizenDashboard;
