import { Link } from "react-router-dom";
import logo from "../assets/images/kenaylsis-logo.png";
import { CitizenNavbarData } from "../utils";
function AuthNavbar() {
  return (
    <div className="w-full bg-card py-2">
      <div className="container flex flex-row gap-4 justify-between py-4">
        <div className="h-[3rem] w-[3rem] relative">
          <Link to="/" className="absolute cover">
            <img src={logo} alt="KenyAlysis-logo" />
          </Link>
        </div>
        {/* Display Cizizen links base on their role */}
        <nav className="flex flex-row, gap-8 items-center">
          {CitizenNavbarData.map((link) => {
            return (
              <Link className="nav-links" key={link.id} to={link.url}>
                {link.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}

export default AuthNavbar;
