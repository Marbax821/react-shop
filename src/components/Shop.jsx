import { useEffect, useState } from "react";
import { API_KEY, API_URL } from '../config';

import { Preloader } from "./Preloader";
import { GoodsList } from "./GoodsLit";
import { Cart } from "./Cart";
import { BasketList } from "./BasketList";
import { Alert } from "./Alert";



function Shop() {
    const [goods, setGoods] = useState([]);
    const [loading, setLoading] = useState(true);
    const [order, setOrder] = useState([]);
    const [isBasketShow, setBasketShow] = useState(false);
    const [alertName, setAlertName] = useState('');

    const addToBasket = (item) => {
        const itemIndex = order.findIndex(orderItem => orderItem.mainId === item.mainId)

        if (itemIndex < 0) {
            const newItem = {
                ...item,
                quantity: 1
            }
            setOrder([...order, newItem]);
        } else {
            const newOrder = order.map((orderItem, index) => {
                if (index === itemIndex) {
                    return {
                        ...orderItem,
                        quantity: orderItem.quantity + 1
                    }
                } else {
                    return orderItem;
                }
            });

            setOrder(newOrder);
        }

        setAlertName(item.displayName);
    };

    const handleBasketShow = (item) => {
        setBasketShow(!isBasketShow);
    };

    const removeFromBasket = (itemId) => {
        const newOrder = order.filter((el) => el.mainId !== itemId);
        setOrder(newOrder);
    };

    const incQuantity = (itemId) => {
        const newOrder = order.map(item => {
            if (item.mainId === itemId) {
                const newQuantity = item.quantity + 1;
                return {
                    ...item,
                    quantity: newQuantity
                }
            } else {
                return item;
            }
        });
        setOrder(newOrder);
    };

    const decQuantity = (itemId) => {
        const newOrder = order.map(item => {
            if (item.mainId === itemId) {
                const newQuantity = item.quantity - 1;
                return {
                    ...item,
                    quantity: newQuantity >= 0 ? newQuantity : 0
                }
            } else {
                return item;
            }
        });
        setOrder(newOrder);
    };

    const closeAlert = () => {
        setAlertName('');
    }

    useEffect(() => {
        fetch(API_URL, {
            headers: {
                'Authorization': API_KEY
            }
        })
            .then(response => response.json())
            .then(data => {
                data.shop && setGoods(data.shop);
                setLoading(false);
            })
            .catch(err => console.log(err));
    }, []);

    return (
        <main className="content container">
            <Cart quantity={order.length} handleBasketShow={handleBasketShow} />
            {loading ? <Preloader /> : <GoodsList goods={goods} addToBasket={addToBasket} />}
            {
                isBasketShow && (
                <BasketList 
                    order={order}
                    handleBasketShow={handleBasketShow}
                    removeFromBasket={removeFromBasket}
                    incQuantity={incQuantity}
                    decQuantity={decQuantity} />
                )
            }
            {
                alertName && <Alert displayName={alertName} closeAlert={closeAlert} />
            }
        </main>
    )
}

export { Shop }