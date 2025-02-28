import { Product } from "../interfaces";
import ProductCategory from "./ProductCategory";
import ProductRow from "./ProductRow";

const ProductTable = ({ products }) => {
  const rows: [] = [];
  let lastCategory = null;

  products.forEach((product: { product: Product }) => {
    if (product.category !== lastCategory) {
      rows.push(
        <ProductCategory key={product.category} category={product.category} />
      );
    }

    rows.push(<ProductRow key={product.name} product={product} />);
    lastCategory = product.category;
  });
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
};

export default ProductTable;
