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

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     try {
  //       const response = await API.get("/user/citizen");
  //       console.log(response);
  //        // fetch user details
  //       setUser(response.data.user);
  //     } catch (err) {
  //       console.log(err);
  //       setError("Failed to fetch users data");
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };
  //   fetchUser();
  // }, []);

  // if (isLoading) return <p className="text-gray-500">Loading...</p>;
  // if (error) return <p className="text-red-500">{error}</p>;

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
