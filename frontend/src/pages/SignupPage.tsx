// import logo from "../assets/images/kenaylsis-logo.png";
import { Link } from "react-router-dom";

function SignupPage() {
  return (
    <div className="w-full">
      <div className="container flex flex-col items-center justify-center min-h-screen">
        <div className="flex flex-col min-w-md bg-white shadow-sm p-8 rounded-sm">
          {/* <Link to="/" className="items-center bg-amber-200">
            <img src={logo} alt="" className="logo-img" />
          </Link> */}
          <h2 className="pb-4">Signup</h2>
          <form action="" className="max-w-md flex flex-col gap-4 text-sm">
            <input
              type="text"
              placeholder="Username"
              className=" border-[1px] rounded-sm p-2 border-gray-200"
            />
            <input
              type="text"
              placeholder="Email Address"
              className=" border-[1px] rounded-sm p-2 border-gray-200"
            />
            <input
              type="password"
              name=""
              id=""
              placeholder="Password"
              className="border-[1px] p-2 rounded-sm border-gray-200"
            />

            <button className="cta-primary mt-4">Signup</button>
          </form>
          <div className="mt-8 text-center text-sm pb-2">
            Already have an account?
            <Link to="/login" className="text-green-600">
              {" "}
              Login
            </Link>
          </div>
          <div className="text-sm">
            <p className="max-w-sm text-center">
              <Link to="#" className="text-green-600">Terms & Conditions</Link> and{" "}
              <Link to="#" className="text-green-600">Privacy policies</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default SignupPage;
