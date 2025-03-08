import { Link } from "react-router-dom";
function ResetPassword() {
  return (
    <div className="w-full">
      <div className="container flex flex-col items-center justify-center min-h-screen">
        <div className="flex flex-col min-w-md bg-white shadow-sm p-8 rounded-sm">
          <h2 className="pb-4">Reset Password</h2>
          <form action="" className="max-w-md flex flex-col gap-4 text-sm">
            <input
              type="password"
              placeholder="New password"
              className=" border-[1px] rounded-sm p-2 border-gray-200"
            />
            <input
              type="password"
              name=""
              id=""
              placeholder="Confirm password"
              className="border-[1px] p-2 rounded-sm border-gray-200"
            />
            <button className="cta-primary mt-4">Reset password</button>
          </form>
          <div className="mt-8 text-center text-sm">
            <Link to="/signup" className="text-green-600">
              Go back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ResetPassword;
