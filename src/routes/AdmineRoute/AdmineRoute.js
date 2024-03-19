import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Product from '../../admine/containers/Product/Product';
import Layout from '../../admine/components/Layout/Layout';
import Review from '../../admine/containers/Review/Review'

function AdmineRoute(props) {
    return (
        <div>
            <Layout>
                <Routes>
                    <Route exact path="/product" element={<Product />} />
                    <Route exact path="/review" element={<Review />} />
                </Routes>
            </Layout>
        </div>
    );
}

export default AdmineRoute;