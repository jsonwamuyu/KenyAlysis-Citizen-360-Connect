import ProductTable from "./ProductTable";
import { SearchBar } from "./SearchBar";

export const FilterableProductTable = ({product}) => {
  return (
    <div>
      <SearchBar />
      <ProductTable products={products}/>
    </div>
  );
};
