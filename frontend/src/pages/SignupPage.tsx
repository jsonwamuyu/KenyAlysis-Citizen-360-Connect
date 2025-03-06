import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../utils/API/axiosInstance";

function SignupPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(""), 2000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!username || !email || !password) {
      setError("All fields are required.");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      const response = await API.post("/auth/signup", {
        username,
        email,
        password,
      });
      setSuccess(response.data.message);
      console.log("Signup successful");
      navigate("/login");
    } catch (err) {
      setError(
        (err as any).response?.data?.message ||
          "Signup failed. Please try again."
      );
    }
  };

  return (
    <div className="w-full">
      <div className="container flex flex-col items-center justify-center min-h-screen">
        <div className="flex flex-col min-w-md bg-white shadow-sm p-8 rounded-sm">
          <h2 className="pb-4">Signup</h2>

          {error && (
            <p className="text-red-400 text-sm pb-2 max-w-sm">{error}</p>
          )}
          {success && (
            <p className="text-green-500 text-sm pb-2 max-w-sm">{success}</p>
          )}

          <form
            onSubmit={handleSignup}
            className="max-w-md flex flex-col gap-4 text-sm"
          >
            <input
              data-cy="username-input"
              type="text"
              name="username"
              placeholder="Username"
              className=" border-[1px] rounded-sm p-2 border-gray-200"
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              data-cy="email-input"
              type="text"
              name="email"
              placeholder="Email Address"
              className=" border-[1px] rounded-sm p-2 border-gray-200"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              data-cy="password-input"
              type="password"
              name="password"
              placeholder="Password"
              className="border-[1px] p-2 rounded-sm border-gray-200"
              onChange={(e) => setPassword(e.target.value)}
            />

            <button data-cy="signup-btn" className="cta-primary mt-4">
              Signup
            </button>
          </form>
          <div className="mt-8 text-center text-sm pb-2">
            Already have an account?
            <Link to="/login" data-cy="login-link" className="text-green-600 pl-2">
              Login
            </Link>
          </div>
          <div className="text-sm">
            <p className="max-w-sm text-center">
              <Link to="#" className="text-green-600">
                Terms & Conditions
              </Link>
              and
              <Link to="#" className="text-green-600">
                Privacy policies
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
