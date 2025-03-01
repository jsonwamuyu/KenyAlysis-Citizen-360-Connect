import {Link} from 'react-router-dom'
import  logo from '../assets/images/kenaylsis-logo.png'
function AuthNavbar(){
    return(
        <div className="w-full bg-card">
            <div className="container flex flex-row gap-4 justify-between py-4">
            <div className="h-[4.5rem] w-[4.5rem] relative">
                <Link to="/" className="absolute cover">
                <img src={logo} alt="KenyAlysis-logo" />
                </Link>
            </div>
            <nav className="flex flex-row, gap-8 items-center">
                {CitizenNavbarData.map((link)=>{
                    return(
                        <Link className="nav-link" key={link.id} to={link.url}>{link.name}</Link>
                    )
                })}
            </nav>
        </div>
        </div>
    )
}

export default AuthNavbar