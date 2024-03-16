import React from 'react';
import Header from '../../user/components/Header/Header';
import { Route, Routes } from 'react-router-dom';
import Home from '../../user/containers/Home/Home';
import Shop from '../../user/containers/Shop/Shop';
import Cart from '../../user/containers/Cart/Cart';
import Chackout from '../../user/containers/Chackout/Chackout';
import Testimonial from '../../user/containers/Testimonial/Testimonial';
import Page from '../../user/containers/Page/Page';
import Contact from '../../user/containers/Contact/Contact';
import Footer from '../../user/components/Footer/Footer';
import ShopDetail from '../../user/containers/ShopDetail/ShopDetail';


function UserRoute(props) {
    return (
        <div>
            <>
                <Header />
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route exact path="/Shop" element={<Shop />} />
                    <Route exact path="/Shop/:id" element={<ShopDetail />} />
                    
                    {/* <Route exact path="/Shop_Detail" element={<Shop_Detail />} /> */}

                    <Route exact path="/Cart" element={<Cart />} />
                    <Route exact path="/Chackout" element={<Chackout />} />
                    <Route exact path="/Testimonial" element={<Testimonial />} />
                    <Route exact path="/Page" element={<Page />} />
                    <Route exact path="/Contact" element={<Contact />} />
                </Routes>
                <Footer />
            </>
        </div>
    );
}

export default UserRoute;