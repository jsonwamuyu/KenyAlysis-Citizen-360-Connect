import { useState } from "react";

const CreatePoll = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    expiry_date: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Handle input change
  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const token = localStorage.getItem("token"); // Get JWT token

      const response = await fetch(
        "http://localhost:8080/api/polls/create-poll",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Send auth token
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to create poll");
      }

      setMessage("Poll created successfully!");
      setFormData({ title: "", description: "", expiry_date: "" }); // Reset form
    } catch (err) {
      setError((err as any).message);
    }
  };

  return (
    <div className="container" id="create-poll">
      <h3 className=" font-semibold mb-4">Create a New Poll</h3>

      {message && <p className="text-green-600 py-4">{message}</p>}
      {error && <p className="text-red-600 py-4">{error}</p>}

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-full sm:max-w-lg"
      >
        <input
          data-cy="poll-title"
          type="text"
          name="title"
          placeholder="Poll Title"
          value={formData.title}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />

        <textarea
          data-cy="description"
          name="description"
          placeholder="Poll Description"
          value={formData.description}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        ></textarea>

        <input
          data-cy="expiry-date"
          type="date"
          name="expiry_date"
          value={formData.expiry_date}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />

        <div>
          <button
            data-cy="poll-btn"
            type="submit"
            className="cta-primary"
          >
            Create a poll
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePoll;
