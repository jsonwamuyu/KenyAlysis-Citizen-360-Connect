import { Link } from "react-router-dom";

function DocumentCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="my-4 document-card rounded-md border-[1px] p-4 bg-white">
      <Link to={`/document/&{id}`}>
        <h5>{title}</h5>
        <p className="text-sm">{description}</p>
      </Link>
    </div>
  );
}

export default DocumentCard;
