import UserCard from "./UserCard";

function UserManagement() {
  return (
    <div className="w-full mt-16">
      <div className="container">
        <h3>Manage users</h3>
        <div className="flex flex-col gap-4 my-8">
          <UserCard />
          <UserCard />
          <UserCard />
        </div>
      </div>
    </div>
  );
}

export default UserManagement;
