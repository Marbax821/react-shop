import { useContext } from "react";
import { ShopContext } from "../context";

import { Basketitem } from "./BasketItem";

function BasketList() {
    const { 
        order = [], 
        handleBasketShow, 
    } = useContext(ShopContext);

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
                        {...item} />
                )) : <li className="collection-item ">Корзина пуста</li>
            }
            <li className="collection-item active">Общая стоимость: {totalPrice}</li>
            <i className="material-icons basket-close" onClick={handleBasketShow}>clear</i>
        </ul>
    )
}

export { BasketList }