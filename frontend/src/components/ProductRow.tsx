import { Product } from "../interfaces";

const ProductRow = ({ product }: { product: Product }) => {
  const name = product.stocked ? (
    product.name
  ) : (
    <span className="text-red-400">{product.name}</span>
  );
  return (
    <tr>
      <td>{name}</td>
      <td>{product.price}</td>
    </tr>
  );
};

export default ProductRow;
