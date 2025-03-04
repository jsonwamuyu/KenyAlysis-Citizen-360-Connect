import { useState, useEffect } from "react";
import API from "../../utils/API/axiosInstance";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Unauthorized: No token provided.");
        setLoading(false);
        return;
      }

      const response = await API.get("http://localhost:8080/api/users/get-all-users", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUsers(response.data); // Ensure users exist in the response
      setError(""); // Clear previous errors
    } catch (err) {
      setError("Error fetching users. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (userId: number, newRoleId: number) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Unauthorized: No token provided.");
        return;
      }

      const response = await API.put(
        `http://localhost:8080/api/users/${userId}/role`,
        { role_id: newRoleId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setSuccessMessage(response.data.message);
      fetchUsers(); // Refresh users list after role update
    } catch (error) {
      setError("Failed to update role. Try again.");
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h3 className="font-bold mb-4">Manage Users</h3>

      {loading && <p className="text-gray-600">Loading users...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {successMessage && <p className="text-green-500">{successMessage}</p>}

      {!loading && users.length > 0 && (
        <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="py-2 px-4 text-left">#</th>
              <th className="py-2 px-4 text-left">Username</th>
              <th className="py-2 px-4 text-left">Email</th>
              <th className="py-2 px-4 text-left">Role</th>
              <th className="py-2 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.id} className="border-b">
                <td className="py-2 px-4">{index + 1}</td>
                <td className="py-2 px-4">{user.username}</td>
                <td className="py-2 px-4">{user.email}</td>
                <td className="py-2 px-4">
                  {user.role_id === 3
                    ? "Admin"
                    : user.role_id === 2
                    ? "Government Official"
                    : "Citizen"}
                </td>
                <td className="py-2 px-4">
                  <select
                    className="border p-2 rounded-md"
                    onChange={(e) => handleRoleChange(user.id, Number(e.target.value))}
                    value={user.role_id}
                  >
                    <option value="1">Citizen</option>
                    <option value="2">Government Official</option>
                    <option value="3">Admin</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {!loading && users.length === 0 && <p>No users found.</p>}
    </div>
  );
};

export default UserManagement;
