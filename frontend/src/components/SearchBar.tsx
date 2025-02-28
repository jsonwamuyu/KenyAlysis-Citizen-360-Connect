export const SearchBar = () => {
  return (
    <form action="">
      <input
        type="text"
        placeholder="Search product... "
        className="py-[0.8rem] px-[0.9rem] border-none outline-none border-radius-sm"
      />
      <label htmlFor="">
        <input type="checkbox" /> {" "}Only show products in stock
      </label>
    </form>
  );
};
