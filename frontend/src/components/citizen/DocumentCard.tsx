import { Link } from "react-router-dom";

function DocumentCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="my-4  rounded-md border-[1px] p-4 bg-gray-100 border-gray-100 hover:bg-white
    transition-all ease-in-out duration-100">
      <Link to={`/document/&{id}`}>
        <h5>{title}</h5>
        <p className="text-sm">{description}</p>
      </Link>
    </div>
  );
}

export default DocumentCard;
