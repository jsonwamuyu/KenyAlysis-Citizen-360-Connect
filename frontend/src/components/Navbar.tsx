// import { navbarData } from "../utils"
// import {Link} from 'react-router-dom'

function Navbar() {
  return (
    <div className="w-full bg-[#F4F2F2]">
        <div className="container">
            <div>
                logo
            </div>
            {/* <nav className="flex flex-row, gap-4 items-center">
                {navbarData.map((link)=>{
                    return(
                        <Link key={link.id} to={link.url}>{link.name}</Link>
                    )
                })}
            </nav> */}
        </div>
    </div>
  )
}

export default Navbar