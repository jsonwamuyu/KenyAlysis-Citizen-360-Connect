function AddNewUser() {
  return (
    <div className="w-full  my-24" id="create-users">
      <div className="container">
        <h3>Add New User</h3>
        <form action="" className="flex flex-col gap-8 w-full sm:max-w-lg" >
          <input type="text" placeholder="Username" className="text-sm"/>
          <input type="email" name="" id="" placeholder="Email Address" className="placeholder:text-sm" />
          <input type="password" placeholder="Password" className="text-sm"/>
          <div>
            <button className="cta-primary">Add user</button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default AddNewUser;
