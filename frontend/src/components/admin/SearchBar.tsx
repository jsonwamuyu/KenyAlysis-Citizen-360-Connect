function SearchBar() {
  return (
    <div className="w-full my-8">
      <div className="container">
        <div className=" gap-8 flex flex-col sm:flex-row items-center">
          <h6 className="w-full sm:w-1/4">
            Welcome <strong>ADMIN</strong>
          </h6>
          <form action="" className="w-full md:w-2/4">
            <input type="text" placeholder="Search user.."  className="w-full"/>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
