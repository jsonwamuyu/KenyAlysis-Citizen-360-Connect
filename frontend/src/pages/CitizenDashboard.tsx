import AuthNavbar from "../components/AuthNavbar";
import FooterSection from "../components/FooterSection";
import Documents from "../components/citizen/Documents";
import ActivePolls from "../components/citizen/ActivePolls";
import RecentIncidents from "../components/citizen/RecentIncidents";
import GovernmentAnnouncements from "../components/citizen/GovernmentAnnouncements";
import { useState, useEffect } from "react";
import WelcomeMessage from "../components/WelcomeMessage";
// import API from "../utils/API/axiosInstance";
// import Welcome from '../components/Welcome'

function CitizenDashboard() {

  let username = localStorage.getItem("username");
  let token = localStorage.getItem("token");

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div>
      <AuthNavbar />
      <WelcomeMessage username={username}/>
      <Documents />
      <ActivePolls />
      <RecentIncidents />
      <GovernmentAnnouncements />
      <FooterSection />
    </div>
  );
}

export default CitizenDashboard;
