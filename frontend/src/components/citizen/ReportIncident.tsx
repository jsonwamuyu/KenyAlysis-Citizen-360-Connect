import { useState } from "react";
import API from "../../utils/API/axiosInstance";
import { jwtDecode } from "jwt-decode";

const ReportIncident = () => {
  const [formData, setFormData] = useState({
    media_url: "",
    description: "",
    location: "",
    category: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setErrorMessage("User not authenticated. Please log in again.");
        setLoading(false);
        return;
      }

      // Decode token to extract user ID
      const decodedToken: any = jwtDecode(token);
      const user_id = decodedToken.userId;

      if (!user_id) {
        setErrorMessage("Failed to retrieve user data.");
        setLoading(false);
        return;
      }

      const incidentData = { ...formData, user_id };

      const response = await API.post(
        "http://localhost:8080/api/incidents/report-incident",
        incidentData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setSuccessMessage(response.data.message);
      setFormData({
        media_url: "",
        description: "",
        location: "",
        category: "",
      });
    } catch (error) {
      setErrorMessage("Error reporting incident. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col md:max-w-2/3">
      {/* <div className="bg-white shadow-sm p-6 rounded-md w-full max-w-md"> */}
      <h3 className="text-xl font-semibold mb-4">Report an Incident</h3>
      <div className="py-4">
        {successMessage && (
          <p className="text-sm text-green-500">{successMessage}</p>
        )}
        {errorMessage && <p className="text-sm text-red-500">{errorMessage}</p>}
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <select
        data-cy="category-input"
          name="category"
          className="border p-2 rounded-md"
          value={formData.category}
          onChange={handleChange}
          required
        >
          <option value="">Select Category</option>
          <option value="Corruption">Corruption</option>
          <option value="Crime">Crime</option>
          <option value="Infrastructure">Infrastructure Issue</option>
          <option value="Other">Other</option>
        </select>
        <textarea
         data-cy="description-input"
          name="description"
          placeholder="Describe your Incident"
          className="border p-2 rounded-md"
          value={formData.description}
          onChange={handleChange}
          required
        ></textarea>
        <input
         data-cy="location-input"
          type="text"
          name="location"
          placeholder="Location"
          className="border p-2 rounded-md"
          value={formData.location}
          onChange={handleChange}
          required
        />

        <input
         data-cy="media-input"
          type="text"
          name="media_url"
          placeholder="Media Url"
          className="border p-2 rounded-md"
          value={formData.media_url}
          onChange={handleChange}
          required
        />

        <button
        data-cy="incident-btn"
          type="submit"
          className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Report Incident"}
        </button>
      </form>
      {/* </div> */}
    </div>
  );
};

export default ReportIncident;
