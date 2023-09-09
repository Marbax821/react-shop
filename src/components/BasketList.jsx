import { Basketitem } from "./BasketItem";

function BasketList(props) {
    const { 
        order = [], 
        handleBasketShow, 
        removeFromBasket,
        incQuantity,
        decQuantity } = props;

    const totalPrice = order.reduce((sum, el) => {
        return sum + el.finalPrice * el.quantity;
    }, 0);

    return (
        <ul className="collection basket-list">
            <li className="collection-item active">Корзина</li>
            {
                order.length ? order.map(item => (
                    <Basketitem 
                        key={item.mainId} 
                        removeFromBasket={removeFromBasket}
                        incQuantity={incQuantity}
                        decQuantity={decQuantity}
                        {...item} />
                )) : <li className="collection-item ">Корзина пуста</li>
            }
            <li className="collection-item active">Общая стоимость: {totalPrice}</li>
            <i className="material-icons basket-close" onClick={handleBasketShow}>clear</i>
        </ul>
    )
}

export { BasketList }