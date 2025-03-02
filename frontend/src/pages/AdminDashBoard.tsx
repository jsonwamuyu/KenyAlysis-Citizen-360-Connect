import AuthNavbar from "../components/AuthNavbar";
import SearchBar from "../components/admin/SearchBar";
import UserManagement from "../components/admin/UserManagement";
import AddNewUser from "../components/admin/AddNewUser";
import FooterSection from "../components/FooterSection";

function AdminDashboard() {
  return (
    <div>
      <AuthNavbar />
      <SearchBar />
      <UserManagement />
      <AddNewUser />
      <FooterSection />
    </div>
  );
}

export default AdminDashboard;
