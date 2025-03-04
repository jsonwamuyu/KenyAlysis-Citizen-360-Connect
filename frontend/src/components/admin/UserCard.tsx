import profile from "../../assets/images/profile.jpg";
import { Link } from "react-router-dom";

function UserCard() {
  return (
    <div
      className="flex flex-row gap-8 items-center w-full p-2 border-[1px] border-gray-100
     hover:bg-white transition-all ease-in-out bg-gray-100/50"
    >
      <div className="w-10 h-10 rounded-full relative">
        <img
          src={profile}
          alt="profile"
          className="absolute object-cover rounded-full"
        />
      </div>
      <div className="flex flex-row items-center gap-8 justify-between w-full">
        <h5>John Doe</h5>
        <Link to="/" className="text-sm">
          Edit Role
        </Link>
      </div>
    </div>
  );
}

export default UserCard;
