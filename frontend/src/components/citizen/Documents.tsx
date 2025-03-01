import DocumentCard from "./DocumentCard";
function Documents() {
  return (
    <div className="w-full my-8">
      <div className="container">
        <h6>
          Welcome <strong>ZHAVIA</strong>
        </h6>
        <div className="py-8">
          <h4 className="font-bold"><strong>INSTRUCTIONS:</strong></h4>
          <p className="max-w-xl text-sm">
            Explore government documents below. Click a document title to view
            details and chat with our AI for a quick summary or to ask
            questions.
          </p>
          
        </div>
        <div className="my-8">
        <DocumentCard/>
        </div>
      </div>
    </div>
  );
}

export default Documents;
