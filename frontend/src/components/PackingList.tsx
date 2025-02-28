import Item from "./MyItem.tsx";

export default function PackingList() {
  const products = [
    { id: 1, itemName: "Space suit", isPacked: false },
    { id: 2, itemName: "Helmet with a golden leaf", isPacked: true },
    { id: 3, itemName: "Photo of Tam", isPacked: false },
  ];
  return (
    <section>
      <h1>Sally Ride's Packing List</h1>
      <ul>
        {products.map((product) => {
          return (
            <Item
              itemName={product.itemName}
              isPacked={product.isPacked}
              key={product.id}
            />
          );
        })}
      </ul>
    </section>
  );
}
