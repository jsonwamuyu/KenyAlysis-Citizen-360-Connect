import { useState } from "react";
import axios from "axios";

const Chatbot = () => {
  const [file, setFile] = useState<File | null>(null);
  const [summary, setSummary] = useState<string | null>(null);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Handle File Selection
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  // Handle File Upload
  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file first.");
      return;
    }

    setLoading(true);
    setError(null);
    setSummary(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://127.0.0.1:5001/chatbot/upload", // ✅ Ensure this is correct
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setSummary(response.data.summary);
    } catch (err) {
      setError("Failed to upload document.");
    } finally {
      setLoading(false);
    }
  };
  // Handle Question Submission
  const handleAskQuestion = async () => {
    if (!question.trim()) {
      setError("Please enter a question.");
      return;
    }

    setLoading(true);
    setError(null);
    setAnswer(null);

    try {
      const response = await axios.post("http://127.0.0.1:5001/chatbot/ask", {
        question,
      });

      setAnswer(response.data.answer);
    } catch (err) {
      setError("Failed to get response.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <div
        className="container"
        style={{ marginTop: "1rem", paddingTop: "2rem", paddingBottom: "2rem" }}
      >
        <h2 className="text-xl font-semibold ">Chatbot Assistant</h2>

        <h6 className="font-bold">
          <strong>INSTRUCTIONS:</strong>
        </h6>
        <p className="text-sm">
          Upload a document (PDF, DOCX, TXT) to get a summary and ask questions
          for more details. 🚀
        </p>

        {/* File Upload */}
        <div className="my-8">
          <input
            type="file"
            accept=".pdf,.docx,.txt"
            className="text-green-500 cursor-pointer"
            onChange={handleFileChange}
          />
          <button
            onClick={handleUpload}
            className="bg-black/70 text-white px-4 py-2 mt-2 rounded hover:bg-black cursor-pointer"
            disabled={loading}
          >
            {loading ? "Summarizing..." : "Get AI Summary"}
          </button>
        </div>

        {/* Summary Display */}
        {summary && (
          <div className="bg-gray-100 p-4 rounded mt-4">
            <h3 className="font-semibold">Document Summary:</h3>
            <p className="text-sm">{summary}</p>
          </div>
        )}

        {/* Ask a Question */}
        <div className="mt-4">
          <input
            type="text"
            placeholder="Ask a question..."
            className="w-full p-2 py-8 outline-none border rounded-sm my-4 "
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
          <button
            onClick={handleAskQuestion}
            className="bg-green-500 text-white px-4 py-2 mt-2 rounded hover:bg-green-600"
            disabled={loading}
          >
            {loading ? "Processing..." : "Ask the question"}
          </button>
        </div>

        {/* AI Answer */}
        {answer && (
          <div className="bg-gray-200 p-4 rounded mt-4">
            <h3 className="font-semibold">AI Response:</h3>
            <p className="text-sm">{answer}</p>
          </div>
        )}

        {/* Error Message */}
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>
    </div>
  );
};

export default Chatbot;
