
// import logo from "../assets/images/kenaylsis-logo.png";
import { Link } from "react-router-dom";

function ResetPassword() {
  return (
    <div className="w-full">
      <div className="container flex flex-col items-center justify-center min-h-screen">
        <div className="flex flex-col min-w-md bg-white shadow-sm p-8 rounded-sm">
          <h2 className="pb-4">Forgot Password</h2>
          {/* <p className="text-sm pb-4">No worries, we will send reset instructions to your email address</p> */}
          <form action="" className="max-w-md flex flex-col gap-4 text-sm">
            <input
              type="email"
              placeholder="Email address"
              className=" border-[1px] rounded-sm p-2 border-gray-200"
            />
            
            <button className="cta-primary mt-4">Reset password</button>
          </form>
          <div className="mt-8 text-center text-sm">
          <Link to="/login" className="text-green-600">Go back to Login</Link>
        </div>
        </div>
      </div>
    </div>
  );
}
export default ResetPassword;