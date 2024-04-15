import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Product from '../../admine/containers/Product/Product';
import Layout from '../../admine/components/Layout/Layout';
import Review from '../../admine/containers/Review/Review'
import Catagory from '../../admine/containers/Catagory/Catagory';
import Facilities from '../../admine/containers/Facilities/Facilities';
import Counter from '../../admine/containers/Counter/Counter';

function AdmineRoute(props) {
    return (
        <div>
            <Layout>
                <Routes>
                    <Route exact path="/product" element={<Product />} />
                    <Route exact path="/review" element={<Review />} />
                    <Route exact path="/catagory" element={<Catagory />} />
                    <Route exact path="/facilities" element={<Facilities />} />
                    <Route exact path="/counter" element={<Counter />} />
                </Routes>
            </Layout>
        </div>
    );
}

export default AdmineRoute;