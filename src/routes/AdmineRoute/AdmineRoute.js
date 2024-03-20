import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Product from '../../admine/containers/Product/Product';
import Layout from '../../admine/components/Layout/Layout';
import Review from '../../admine/containers/Review/Review'
import Catagory from '../../admine/containers/Catagory/Catagory';

function AdmineRoute(props) {
    return (
        <div>
            <Layout>
                <Routes>
                    <Route exact path="/product" element={<Product />} />
                    <Route exact path="/review" element={<Review />} />
                    <Route exact path="/catagory" element={<Catagory />} />
                </Routes>
            </Layout>
        </div>
    );
}

export default AdmineRoute;