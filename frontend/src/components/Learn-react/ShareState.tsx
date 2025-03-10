import { useState, useEffect } from "react";
import API from "../../utils/API/axiosInstance";

interface UserProps {
  fullname: string;
  email: string;
  phone_number: string;
}

const ShareState = () => {
  const [err, setErr] = useState("");
  const [users, setUsers] = useState<UserProps[]>([]);

  useEffect(() => {

    const getAllUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        // Check whether theres a token
        if (!token) {
          setErr("Not authorized");
          return;
        }
        const resp = await API.get(
          "http://localhost:8080/api/incidents/get-all-incidents",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setUsers(resp.data);
      } catch (error) {
        console.log(error);
        setErr("Sorry. Try again.");
      }
    };
    
    getAllUsers();
  }, []);

  const peoplesf = [
    {
      fullname: "john doe",
      email: "johndoe@gmail.com",
      phone_number: "0797284948",
    },
    {
      fullname: "Nelly White",
      email: "nellyGmail.com",
      phone_number: "0798878888",
    },
  ];

  return (
    <div className="w-full">
      <div className="container">
        {err && <p className="text-red-400 py-2">{err}</p>}
        <h5>Share State</h5>
        <p>Learn the skill of making it happen</p>

        {/* loop through the users */}
        <div>
          {users.length > 0 ? (
            users.map((user, index) => {
              return (
                <div key={index}>
                  <h5>{user.fullname}</h5>
                  <p>{user.email}</p>
                  <p>{user.phone_number}</p>
                </div>
              );
            })
          ) : (
            <h5>No user found</h5>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShareState;
