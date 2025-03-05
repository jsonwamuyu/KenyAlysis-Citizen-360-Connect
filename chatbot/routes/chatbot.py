import os
import fitz  # PyMuPDF for PDFs
import docx2txt
from flask import Blueprint, request, jsonify
import openai
from dotenv import load_dotenv

# Load API Key
load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")

chatbot_bp = Blueprint("chatbot", __name__)

# Ensure the uploads directory exists
UPLOAD_FOLDER = "uploads"
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

uploaded_text = ""  # Global variable to store document text


# 📌 1️⃣ Upload & Process Document
@chatbot_bp.route("/upload", methods=["POST"])
def upload_document():
    global uploaded_text
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400
    
    file = request.files["file"]
    file_ext = file.filename.split(".")[-1].lower()
    file_path = os.path.join(UPLOAD_FOLDER, file.filename)

    try:
        file.save(file_path)

        # Extract text from document
        if file_ext == "pdf":
            uploaded_text = extract_text_from_pdf(file_path)
        elif file_ext == "docx":
            uploaded_text = extract_text_from_docx(file_path)
        elif file_ext == "txt":
            with open(file_path, "r", encoding="utf-8") as f:
                uploaded_text = f.read()
        else:
            return jsonify({"error": "Unsupported file format"}), 400

        # Summarize document using OpenAI
        summary = summarize_text(uploaded_text)
        return jsonify({"success": True, "summary": summary, "file_path": file_path})

    except Exception as e:
        return jsonify({"error": f"File processing error: {str(e)}"}), 500


# 📌 2️⃣ Ask Questions About the Document
@chatbot_bp.route("/ask", methods=["POST"])

@chatbot_bp.route("/ask", methods=["POST"])
def ask_question():
    global uploaded_text
    if not uploaded_text:
        return jsonify({"error": "No document uploaded yet"}), 400

    data = request.json
    user_question = data.get("question", "").strip()

    if not user_question:
        return jsonify({"error": "No question provided"}), 400

    try:
        client = openai.OpenAI()  # Initialize OpenAI client
        response = client.chat.completions.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": "You are a helpful assistant that answers based on a provided document."},
                {"role": "user", "content": f"Document: {uploaded_text}\n\nQuestion: {user_question}"}
            ],
            max_tokens=200
        )

        ai_response = response.choices[0].message.content
        return jsonify({"success": True, "answer": ai_response})

    except Exception as e:
        return jsonify({"error": f"OpenAI request failed: {str(e)}"}), 500


#  Utility Functions
def extract_text_from_pdf(pdf_path):
    """Extract text from a PDF file."""
    try:
        doc = fitz.open(pdf_path)
        text = "\n".join(page.get_text("text") for page in doc)
        return text
    except Exception as e:
        return f"Error extracting text from PDF: {str(e)}"


def extract_text_from_docx(docx_path):
    """Extract text from a DOCX file."""
    try:
        return docx2txt.process(docx_path)
    except Exception as e:
        return f"Error extracting text from DOCX: {str(e)}"


def summarize_text(text):
    """Use OpenAI to summarize text."""
    try:
        client = openai.OpenAI()  # Initialize OpenAI client
        response = client.chat.completions.create(
            model="gpt-4",
            messages=[{"role": "user", "content": f"Summarize this document:\n{text}"}],
            max_tokens=150
        )
        return response.choices[0].message.content
    except Exception as e:
        return f"Error summarizing text: {str(e)}"
