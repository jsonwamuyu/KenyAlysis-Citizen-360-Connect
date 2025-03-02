function AddNewUser() {
  return (
    <div className="w-full my-24">
      <div className="container">
        <h3>Add New User</h3>
        <form action="" className="flex flex-col gap-8 w-full sm:max-w-lg" >
          <input type="text" placeholder="Username" />
          <input type="email" name="" id="" placeholder="Email Address" />
          <div>
            <button className="cta-primary">Add User</button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default AddNewUser;
