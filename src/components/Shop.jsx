import { useContext, useEffect } from "react";
import { API_KEY, API_URL } from '../config';

import { ShopContext } from "../context";

import { Preloader } from "./Preloader";
import { GoodsList } from "./GoodsLit";
import { Cart } from "./Cart";
import { BasketList } from "./BasketList";
import { Alert } from "./Alert";

function Shop() {
    const { 
        setGoods, 
        loading,
        order,
        isBasketShow,
        alertName
    } = useContext(ShopContext);

    useEffect(() => {
        fetch(API_URL, {
            headers: {
                'Authorization': API_KEY
            }
        })
            .then(response => response.json())
            .then(data => {
                setGoods(data.shop)
            })
            .catch(err => console.log(err));
            // eslint-disable-next-line
    }, []);

    return (
        <main className="content container">
            <Cart quantity={order.length} />
            {loading ? <Preloader /> : <GoodsList />}
            {
                isBasketShow && (
                    <BasketList />
                )
            }
            {
                alertName && <Alert />
            }
        </main>
    )
}

export { Shop }