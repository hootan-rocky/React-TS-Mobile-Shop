import React, {useEffect} from 'react';
import { useRoutes} from "react-router-dom";
import { CheckUserExpired } from 'utils/functions.util';


import {
    CartPage,
    CheckoutPage,
    HomePage, NotFoundPage, PaymentFailPage,
    PaymentPage,
    PaymentSuccessPage,
    CatalogPage,
    SingleProductPage,
} from "../pages";


function PublicRoutes() {



    const publicRoutes = useRoutes([
        {
            path: '',
            element: <HomePage/>,
        },
        {
            path: 'products',
            element: <CatalogPage/>,
        },
        {
            path: 'products/:id',
            element: <SingleProductPage/>,
        },
        {
            path: 'cart',
            element: <CartPage/>,
        },
        {
          path: 'cart/checkout',
          element: <CheckoutPage/>
        },
        {
            path: 'checkout/finalize',
            element: <CheckoutPage/>,
        },
        {
            path: 'payment',
            element: <PaymentPage/>,
        },
        {
            path: 'payment',
            element: '',
            children: [
                {
                    path: 'success',
                    element: <PaymentSuccessPage/>,
                },
                {
                    path: 'fail',
                    element: <PaymentFailPage/>,
                },
            ]
        },
        {
            path: '*',
            element: <NotFoundPage/>,
        },

    ])

    useEffect(() => {
        CheckUserExpired("public")
    },[])


    return (
        publicRoutes
    );
}

export default PublicRoutes;