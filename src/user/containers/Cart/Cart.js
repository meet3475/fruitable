import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProduct } from '../../../redux/action/product.action';
import { deleteToCart, minusToCart, plusToCart } from '../../../redux/slice/cart.slice';


function Cart(props) {


    const cart = useSelector(state => state.cart)

    const product = useSelector(state => state.product)

    console.log(cart, product);

    const dispatch = useDispatch()



    useEffect(() => {
        dispatch(getProduct())
    }, [])

    const coupon = useSelector(state => state.coupon);
    console.log(coupon);


    const [isValid, setIsValid] = useState(false);
    const [couponApplied, setCouponApplied] = useState('');

    const handleApplyCoupon = () => {
        if (cartData.length === 0) {
            alert('Cart is empty');
        } else {
            const appliedCouponDetails = coupon.coupon.find(v => v.coupon_name === couponApplied);

            if (appliedCouponDetails) {
                const date = new Date();
                const expiry_Date = new Date(appliedCouponDetails.expiry_Date);

                if (date > expiry_Date) {
                    alert('Coupon is not valid');
                    setIsValid(false);
                } else {
                    console.log('Applied');
                    setIsValid(true);
                }
            } else {
                console.log('Not Applied');
                setIsValid(false);
            }
        }
    };

    const getDiscountedTotal = () => {
        const appliedCouponDetails = coupon.coupon.find(v => v.coupon_name === couponApplied);

        if (appliedCouponDetails) {
            const discountPercentage = appliedCouponDetails.percentage / 100;
            return cartData.reduce((a, b) => a + b.price * b.qty, 0) * (1 - discountPercentage);
        }

        return cartData.reduce((a, b) => a + b.price * b.qty, 0);
    };


    const cartData = cart.cart.map((v) => {
        console.log(v.Pid);

        const productData = product.product.find((v1) => v1.id === v.Pid)
        console.log(productData);

        return { ...productData, qty: v.qty }
    })

    console.log(cartData);

    const handlePlus = (id) => {
        dispatch(plusToCart(id))
    }

    const handleminus = (id) => {
        dispatch(minusToCart(id))
    }

    const handleDelete = (id) => {
        dispatch(deleteToCart(id))
    }

    const totalAmt = cartData.reduce((acc, v) => acc + v.qty * v.price, 0);
    console.log(totalAmt);

    return (
        <div>
            {/* Modal Search Start */}
            <div className="modal fade" id="searchModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-fullscreen">
                    <div className="modal-content rounded-0">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Search by keyword</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                        </div>
                        <div className="modal-body d-flex align-items-center">
                            <div className="input-group w-75 mx-auto d-flex">
                                <input type="search" className="form-control p-3" placeholder="keywords" aria-describedby="search-icon-1" />
                                <span id="search-icon-1" className="input-group-text p-3"><i className="fa fa-search" /></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Modal Search End */}
            {/* Single Page Header start */}
            <div className="container-fluid page-header py-5">
                <h1 className="text-center text-white display-6">Cart</h1>
                <ol className="breadcrumb justify-content-center mb-0">
                    <li className="breadcrumb-item"><a href="#">Home</a></li>
                    <li className="breadcrumb-item"><a href="#">Pages</a></li>
                    <li className="breadcrumb-item active text-white">Cart</li>
                </ol>
            </div>
            {/* Single Page Header End */}
            {/* Cart Page Start */}
            <div className="container-fluid py-5">
                <div className="container py-5">
                    <div className="table-responsive">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Products</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Quantity</th>
                                    <th scope="col">Total</th>
                                    <th scope="col">Handle</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    cartData.map((v) => (
                                        <tr>
                                            <th scope="row">
                                                <div className="d-flex align-items-center">
                                                    <img src={v.image} className="img-fluid me-5 rounded-circle" style={{ width: 80, height: 80 }} alt />
                                                </div>
                                            </th>
                                            <td>
                                                <p className="mb-0 mt-4">{v.name}</p>
                                            </td>
                                            <td>
                                                <p className="mb-0 mt-4">{v.price} $</p>
                                            </td>
                                            <td>
                                                <div className="input-group quantity mt-4" style={{ width: 100 }}>
                                                    <div className="input-group-btn">
                                                        <button onClick={() => handleminus(v.id)} disabled={v.qty > 1 ? false : true} className="btn btn-sm btn-minus rounded-circle bg-light border">
                                                            <i className="fa fa-minus" />
                                                        </button>
                                                    </div>
                                                    <span className="form-control form-control-sm text-center border-0">{v.qty}</span>
                                                    <div className="input-group-btn">
                                                        <button onClick={() => handlePlus(v.id)} className="btn btn-sm btn-plus rounded-circle bg-light border">
                                                            <i className="fa fa-plus" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <p className="mb-0 mt-4">{(v.price * v.qty).toFixed(2)}$</p>
                                            </td>
                                            <td>
                                                <button onClick={() => handleDelete(v.id)} className="btn btn-md rounded-circle bg-light border mt-4">
                                                    <i className="fa fa-times text-danger" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                    <div className="mt-5">
                        <input
                            type="text"
                            className="border-0 border-bottom rounded me-5 py-3 mb-4"
                            placeholder="Coupon Code"
                            onChange={(e) => setCouponApplied(e.target.value)}
                        />
                        <button onClick={handleApplyCoupon} className="btn border-secondary rounded-pill px-4 py-3 text-primary" type="button">Apply Coupon</button>
                        <span className="ms-5">
                            {
                                isValid ? (
                                    <div className="">
                                        <p className="text-success mb-0">Coupon Applied: {couponApplied}</p>
                                        {coupon.coupon.find(v => v.coupon_name === couponApplied && v.expiry_Date) ? (
                                            <p className="text-muted mt-1">Date Not Valid</p>
                                        ) : null}
                                    </div>
                                ) : (
                                    <p className="text-danger mb-0">Coupon Not Valid</p>
                                )
                            }
                        </span>
                    </div>
                    <div className="row g-4 justify-content-end">
                        <div className="col-12 col-sm-8 col-md-7 col-lg-6 col-xl-4">
                            <div className="bg-light rounded shadow-sm">
                                <div className="p-4">
                                    <h1 className="display-6 mb-4">Cart <span className="fw-normal">Total</span></h1>
                                    {
                                        cartData.map((v, i) => (
                                            <div key={i} className="mb-3">
                                                <div className="d-flex justify-content-between align-items-center mb-2">
                                                    <h5 className="mb-0">{v.name}</h5>
                                                    <p className="mb-0">$ {v.price}</p>
                                                </div>
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <p className="mb-0">Quantity: {v.qty}</p>
                                                    <p className="mb-0">$ {(v.price * v.qty)}</p>
                                                </div>
                                            </div>
                                        ))
                                    }
                                    <div className="py-4 mb-4 border-top border-bottom d-flex justify-content-between align-items-center">

                                        <p className="mb-0 fw-bold text-primary ">

                                            {
                                                isValid && couponApplied ? (
                                                    <div className="">
                                                        <p className="mb-2">Total: <strong>${cartData.reduce((a, b) => a + b.price * b.qty, 0).toFixed(2)}</strong></p>
                                                        <p className="mb-0">Total After Discount: <strong>${getDiscountedTotal().toFixed(2)}</strong> (<span className="text-success">{coupon.coupon.find(v => v.coupon_name === couponApplied).percentage}% discount applied</span>)</p>
                                                    </div>

                                                ) : (
                                                    <div className="">
                                                        <p className="mb-0">Total: <strong>${cartData.reduce((a, b) => a + b.price * b.qty, 0).toFixed(2)}</strong></p>
                                                    </div>

                                                )
                                            }




                                        </p>

                                    </div>
                                    <button className="btn btn-primary rounded-pill px-4 py-2 text-uppercase w-100" type="button">Proceed to Checkout</button>
                                </div>
                            </div>
                        </div>
                        {/* Cart Page End */}
                    </div>
                </div>
            </div>
            {/* Cart Page End */}
        </div>

    );
}

export default Cart;