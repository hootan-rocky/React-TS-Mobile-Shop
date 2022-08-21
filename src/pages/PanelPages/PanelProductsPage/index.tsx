
import React from "react";
import Helmet from "../../../components/Helmet";
import PanelTable from "../components/panelTable";
import {GetProducts} from "../../../api/product";

export const PanelProductsPage = () => {
    const tableHeads = [
        {
            id: 1,
            name: 'product_name_en',
            display: 'نام محصول',
        }, {
            id: 2,
            name: 'category_name_en',
            display: 'دسته بندی محصول',
        }
    ]

    return <main className={'main'} >
        <Helmet title={'مدیریت محصولات'}>
            <PanelTable getTableItems={GetProducts} tableHeads={tableHeads}/>
        </Helmet>
    </main>
}