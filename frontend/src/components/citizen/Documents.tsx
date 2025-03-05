import { documents } from "../../utils";
import DocumentCard from "./DocumentCard";
function Documents() {
  return (
    <div className="w-full my-8" id="documents">
      <div className="container">
        <div className="mb-16 grid grid-cols-1 gap-4">
          {documents.map((doc) => {
            return <DocumentCard key={doc.id} {...doc} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default Documents;
