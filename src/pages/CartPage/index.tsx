import React, {useEffect, useState} from "react";
import Helmet from "../../components/Helmet";
import {useSelector} from 'react-redux'
import Button from "../../components/Button";
import numberWithCommas from "../../utils/numberWithCommas";
import {Link} from "react-router-dom";
import CartItem from '../../components/CartItem'
import productData from "../../assets/fake-data/products";
import {GetProduct} from "../../api/product";

export const CartPage: React.FC = () => {

    const cartItems = useSelector((state: any) => state.cartItems.value)


    const [cartProducts, setCartProducts] = useState<any>([])

    const [totalProducts, setTotalProducts] = useState(0)

    const [totalPrice, setTotalPrice] = useState(0)

    async function getCartItemsInfo(cartItems: any) {
        let cartProducts: any[] = []
        for (let i = 0; i < cartItems.length; i++) {
            const res = await GetProduct(cartItems[i].id)
            const product = await res.data;
            cartProducts =
                [...cartProducts,
                    {
                        ...product,
                        color: cartItems[i].color,
                        quantity: cartItems[i].quantity
                    }]
        }
        setCartProducts(cartProducts);
    }

    useEffect(() => {
        getCartItemsInfo(cartItems)
        setTotalPrice(cartItems.reduce((total: any, item: any) => total + (Number(item.quantity) * Number(item.price.amount)), 0))
        setTotalProducts(cartItems.reduce((total: number, item: any) => total + Number(item.quantity), 0))
    }, [cartItems])


    return (
        <main className={'main'}>
            <Helmet title={'سبد خرید'}>
                <div className="cart__info">
                    <div className="cart__info__txt">
                        <p>
                            شما {totalProducts} محصول در سبد دارید
                        </p>
                        <div className="cart__info__txt__price">
                            <span>مبلغ کل:</span> <span>{numberWithCommas(Number(totalPrice))} تومان</span>
                        </div>
                    </div>
                    <div className="cart__info__btn">
                        <Button size="block">
                            نهایی سازی
                        </Button>
                        <Link to="/products">
                            <Button size="block">
                                ادامه خرید
                            </Button>
                        </Link>

                    </div>
                </div>
                <div className="cart__list">
                    {
                        cartProducts.map((item: any, index: any) => (
                            <CartItem item={item} key={index}/>
                        ))
                    }
                </div>

            </Helmet>
        </main>
    )
}