import FooterSection from "../components/FooterSection";
import GvtOfficialNavbar from "../components/gvt-official/GvtOfficialNavbar";
import WelcomeMessage from "../components/WelcomeMessage";
import AllReportedIncidents from "../components/gvt-official/AllReportedIncidents";
import { useState } from "react";

function GovernmentOfficialDashboard() {
  const username = localStorage.getItem("username") || "Guest";
  // const {error, setError} = useState(null)
  const [myText, setMyText] = useState("");
  const [answer, setAnswer] = useState("");
  const [status, setStatus] = useState("Typing..");

  if (status === "Success") {
    return <h5>Thats right.</h5>;
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("Submitting...");
  };

  const handleInputChange = (e) => {
    setMyText(e.target.value);
  };

  return (
    <div className="min-h-screen">
      <GvtOfficialNavbar />
      <WelcomeMessage username={username} />
      <div className="w-full">
        <div className="container">
          <h4>Quiz Form</h4>
          <form action="" onSubmit={handleSubmit}>
            <textarea
              name=""
              id=""
              onChange={(e) => {
                setMyText(e.target.value);
              }}
            ></textarea>
            <button className=""></button>
          </form>
        </div>
      </div>
      <AllReportedIncidents />
      <FooterSection />
    </div>
  );
}

export default GovernmentOfficialDashboard;
