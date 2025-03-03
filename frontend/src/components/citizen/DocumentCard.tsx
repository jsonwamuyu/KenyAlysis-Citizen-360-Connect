import { Link } from "react-router-dom";

function DocumentCard({ title }: { title: string; description: string }) {
  return (
    <Link
      to={`/document/&{id}`}
      className="flex flex-row gap-8 justify-between items-center py-4 border-gray-200 border-b-[1px]"
    >
      <h5>{title}</h5>
      <button className="p-2 rounded-sm bg-black text-white text-sm">
        Get AI Summary
      </button>
    </Link>
  );
}

export default DocumentCard;
