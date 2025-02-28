const ProductCategory = ({ category }: { category: String }) => {
  return (
    <div className="bg-white rounded-md border-radius-md p-2 mb-2">
      <tr>
        <th colSpan={2}>
          <h6>{category}</h6>
        </th>
      </tr>
    </div>
  );
};

export default ProductCategory;
