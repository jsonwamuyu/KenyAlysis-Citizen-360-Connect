import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/images/kenaylsis-logo.png";
import { HashLink } from "react-router-hash-link";
import { GvtOfficialNavbarData } from "../../utils";

function GvtOfficialNavbar() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <div className="w-full bg-green-500 py-2 mb-8">
      <div className="flex flex-row gap-4 justify-between py-4 container">
        <div className="h-[2.5rem] w-[2.5rem] relative">
          <Link to="#" className="absolute cover">
            <img src={logo} alt="KenyAlysis-logo" />
          </Link>
        </div>
        <nav className="flex flex-row, gap-8 items-center w-full justify-center">
          {GvtOfficialNavbarData.map((link) => {
            return link.url.startsWith("#") ? (
              // Use HashLink for on-page navigation (smooth scroll)
              <HashLink key={link.id} smooth to={link.url} className="nav-link">
                {link.name}
              </HashLink>
            ) : (
              // Use regular Link for internal page navigation
              <Link key={link.id} to={link.url} className="nav-link">
                {link.name}
              </Link>
            );
          })}
        </nav>
        <button
          onClick={handleLogout}
          className="border-[1px] border-white py-2 px-4 rounded-sm bg-transparent text-white text-sm cursor-pointer"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default GvtOfficialNavbar;
