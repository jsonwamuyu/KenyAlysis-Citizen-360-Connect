// import logo from "../assets/images/kenaylsis-logo.png";
import { Link } from "react-router-dom";

function LoginPage() {
  return (
    <div className="w-full">
      <div className="container flex flex-col items-center justify-center min-h-screen">
        <div className="flex flex-col min-w-md bg-white shadow-sm p-8 rounded-sm">
          <h2 className="pb-4">Login</h2>
          <form action="" className="max-w-md flex flex-col gap-4 text-sm">
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
            <div className="flex flex-row justify-between gap-8 items-center">
              <div className="flex flex-row gap-2 items-center">
                <div><input
                  type="checkbox"
                  name=""
                  id=""
                  className=" bg-green-600"
                /></div>
                <p className="">Remember Me</p>
              </div>

              <Link to="/forgot-password" className="text-green-600">
                Forgot Password?
              </Link>
            </div>
            <button className="cta-primary mt-4">Login</button>
          </form>
          <div className="mt-8 text-center text-sm">
            Have no account?
            <Link to="/signup" className="text-green-600">
              {" "}
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
export default LoginPage;
