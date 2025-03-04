import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../utils/API/axiosInstance";

function LoginPage() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Auto-clear messages after 2 seconds
  useEffect(() => {
    if (error || success) {
      const timer = setTimeout(() => {
        setError("");
        setSuccess("");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [error, success]);

  // Email validation function
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Handle login
  const handleLogin = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    if (!email || !password) {
      setError("All fields are required.");
      setIsLoading(false);
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      setIsLoading(false);
      return;
    }

    try {
      console.log("Sending Login Request:", { email, password });
      const response = await API.post("http://localhost:8080/api/auth/login", { email, password });
      console.log('res is ', response)
      console.log('reached here')
      // Extract token and role_id
      const { token, role_id, username } = response.data;

      // Store token in localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("username", username);

      console.log(role_id)
      // Redirect user based on role
      switch (role_id) {
        case 1:
          navigate("/user/citizen");
          break;
        case 2:
          navigate("/user/gvt-official");
          break;
        case 3:
          navigate("/user/admin");
          break;
        default:
          navigate("/user/citizen"); // Fallback
      }
    } catch (err) {
      console.log(err);
      setError((err as any).response?.data?.message || "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">
      <div className="container flex flex-col items-center justify-center min-h-screen">
        <div className="flex flex-col min-w-md bg-white shadow-sm p-8 rounded-sm">
          <h2 className="pb-4">Login</h2>

         {error && <p className="text-red-400 text-sm pb-4 max-w-sm">{error}</p>}
         {success && <p className="text-green-500 text-sm pb-4 max-w-sm">{success}</p>}

          <form onSubmit={handleLogin} className="max-w-md flex flex-col gap-4 text-sm">
            <input
              name="email"
              type="email"
              placeholder="Email Address"
              className="border-[1px] rounded-sm p-2 border-gray-200"
              onChange={(e) => setEmail(e.target.value)}
              
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="border-[1px] p-2 rounded-sm border-gray-200"
              onChange={(e) => setPassword(e.target.value)}
              
            />

            <button className="cta-primary mt-4" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Login"}
            </button>

            <div className="text-sm flex flex-row justify-between gap-8 items-center mt-8">
              <Link to="/forgot-password" className="text-green-600">
                Forgot Password?
              </Link>
              <div>
                Have no account?
                <Link to="/signup" className="text-green-600"> Sign Up</Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
