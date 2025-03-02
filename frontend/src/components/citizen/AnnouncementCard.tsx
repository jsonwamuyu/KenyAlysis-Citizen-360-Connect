
import { Link } from "react-router-dom";
function AnnouncementCard({ title }:{title:string}) {
  return (
    <div className="">
    <Link to="" >
      <h6 className="text-green-400 ">{title}</h6>
    </Link>
    </div>
  );
}

export default AnnouncementCard
