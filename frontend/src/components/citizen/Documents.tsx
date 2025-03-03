import { documents } from "../../utils";
import DocumentCard from "./DocumentCard";
function Documents() {
  return (
    <div className="w-full my-8" id="documents">
      <div className="container">
        <div className="py-8">
          <h6 className="font-bold">
            <strong>INSTRUCTIONS:</strong>
          </h6>
          <p className="max-w-xl text-sm text-green-500">
            Explore government documents below. Click a document title to view
            details and chat with our AI for a quick summary or to ask
            questions.
          </p>
        </div>
        <div className="mb-16 flex-col flex md:flex-row gap-4">
          {documents.map((doc) => {
            return <DocumentCard key={doc.id} {...doc} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default Documents;
