import { Link } from "react-router-dom";
// import logo from "../assets/images/kenaylsis-logo.png";
import { footerLinks,socialLinks } from "../utils";

function FooterSection() {
  return (
    <div className="w-full bg-[#F4F2F2] py-4 text-sm">
      <div className="container flex flex-col md:flex-row justify-between gap-8 items-center" >
        <div>
          <p>&copy;2025 KenyAlysis</p>
        </div>
        <div className="flex flex-row gap-4 items-center">
          {footerLinks.map((link) => {
            return (
              <Link className="footer-links" to={link.url} key={link.id}>
                {link.name}
              </Link>
            );
          })}
        </div>
        <div className="flex flex-row gap-4 items-center">
          {socialLinks.map((social) =>{
            return(<Link className="footer-links" key={social.id} to={social.url}>{social.icon}</Link>)
          })}
        </div>
      </div>
    </div>
  );
}

export default FooterSection;
