import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Product from '../../admine/containers/Product/Product';

function AdmineRoute(props) {
    return (
        <div>
            <Routes>
                <Route exact path="/product" element={<Product />} />
            </Routes>
        </div>
    );
}

export default AdmineRoute;