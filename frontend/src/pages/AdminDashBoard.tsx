import SearchBar from "../components/admin/SearchBar";
import UserManagement from "../components/admin/UserManagement";
import AddNewUser from "../components/admin/AddNewUser";
import FooterSection from "../components/FooterSection";
import CreatePoll from "../components/admin/CreatePoll";
import WelcomeMessage from "../components/WelcomeMessage";
import AdminNavbar from "../components/admin/AdminNavbar";

function AdminDashboard() {
  let username = localStorage.getItem("username") || "Guest";

  return (
    <div>
      <AdminNavbar/>
      <WelcomeMessage username={username}/>
      <SearchBar />
      <UserManagement />
      <AddNewUser />
      <CreatePoll/>
      <FooterSection />
    </div>
  );
}

export default AdminDashboard;
