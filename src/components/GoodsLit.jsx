import { useState } from "react";
import { GoodsItem } from "./GoodsItem";

function GoodsList(props) {
    const { goods = [], addToBasket = Function.prototype } = props;
    const [visibleItems, setVisibleItems] = useState(8);

    if (!goods.length) {
        return <h3>Nothing found.</h3>;
    }

    const loadMore = () => {
        setVisibleItems((prevVisibleItems) => prevVisibleItems + 4);
    };

    return (
        <>
            <div className="goods">
                {goods.slice(0, visibleItems).map((item) => (
                    <GoodsItem key={item.mainId} {...item} addToBasket={addToBasket} />
                ))}

            </div>
            <div className="btn-block">
                {visibleItems < goods.length && (
                    <button className="waves-effect waves-light btn-large" onClick={loadMore}>Load More</button>
                )}
            </div>
        </>
    );
}

export { GoodsList }