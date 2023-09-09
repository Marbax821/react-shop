import { useEffect, useContext, useMemo } from "react";
import { ShopContext } from "../context";


function Alert() {
    const {
        alertName: displayName,
        closeAlert
    } = useContext(ShopContext);

    // useMemo(() => {
    //     console.log(displayName);
    //     const timerId = setTimeout(closeAlert, 3000);

    //     return () => {
    //         clearTimeout(timerId)
    //     }
    // }, [displayName]);

    useEffect(() => {
        console.log(displayName);
        const timerId = setTimeout(closeAlert, 3000);

        return () => {
            clearTimeout(timerId)
        }
        // eslint-disable-next-line
    }, [displayName]);

    return (
        <div id='toast-container'>
            <div className='toast'>{displayName} добавлен в корзину</div>
        </div>
    );

}

export { Alert }