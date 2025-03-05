function DocumentCard({ title }: { title: string; description: string }) {
  return (
    <div className="flex flex-row gap-8 justify-between items-center py-4 border-gray-200 border-b-[1px]">
      <h5>{title}</h5>
      <button className="p-2 cursor-pointer bg-gray-100
       rounded-sm hover:bg-gray-200 border-[1px] border-gray-200  text-black text-sm">
        Download document
      </button>
    </div>
  );
}

export default DocumentCard;
