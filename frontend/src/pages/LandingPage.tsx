import Hero from "../components/Hero"
import Navbar from "../components/Navbar"

function LandingPage(){
    return(<div className="w-full header ">
    <div className="container">
        <Navbar/>
        <Hero />
    </div>
    </div>)
}
export default LandingPage