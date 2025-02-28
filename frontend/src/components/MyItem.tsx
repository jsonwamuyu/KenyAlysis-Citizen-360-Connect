export interface ItemProps{
    itemName: string;
    isPacked: boolean;
}
function Item({ itemName, isPacked }: ItemProps) {
    return (
        <li className="item">
            {itemName} {isPacked && '✅'}
        </li>
    );
}
export default Item;