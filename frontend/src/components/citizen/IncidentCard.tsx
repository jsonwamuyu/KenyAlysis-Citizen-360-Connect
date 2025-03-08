interface IncidentProps {
  category: string;
  description: string;
  location: string;
  media_url: string;
  status: string;
}

function IncidentCard({
  category,
  description,
  location,
  media_url,
  status,
}: IncidentProps) {
  return (
    <div className="flex w-full flex-row p-4 gap-8 rounded-md bg-white border-gray-200 border-[1px] hover:bg-gray-50">
      <div className="relative h-[50px] w-[50px]">
        <img src={media_url} alt="category" className="absolute object-cover" />
      </div>
      <div className="w-full">
        <h5>{category}</h5>
        <p className="w-full md:max-w-lg text-gray-400 line-clamp-2">
          {description}
        </p>
        <div className="flex flex-row items-center justify-between gap-8 w-full text-sm pt-4">
          <p>{location}</p>
          <p>{status}</p>
        </div>
      </div>
    </div>
  );
}
export default IncidentCard;
