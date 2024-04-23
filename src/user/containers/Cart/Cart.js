import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProduct } from '../../../redux/action/product.action';
import { deleteToCart, minusToCart, plusToCart } from '../../../redux/slice/cart.slice';

import { useFormik } from 'formik';

import { object, string } from 'yup';
import { getCoupon } from '../../../redux/slice/coupon.slice';


function Cart(props) {

    // const [isValid, setIsValid] = useState(false);
    // const [couponDisCount, setCouponDisCount] = useState('');

    const cart = useSelector(state => state.cart)

    const product = useSelector(state => state.product)

    const coupon = useSelector(state => state.coupon);
    console.log(coupon);

    console.log(cart, product);

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getProduct());
        dispatch(getCoupon())
    }, [])

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

    const handleCoupon = (data) => {

        console.log(data);
        let flag = 0;
        coupon.coupon.map((v) => {


            if (v.coupon_name === data.coupon) {

                const CreatedDate = new Date()

                const ExpiryDate = new Date(v.expiry_Date)

                console.log(CreatedDate, ExpiryDate);

                if (CreatedDate <= ExpiryDate) {
                    flag = 1;
                } else {
                    flag = 2;
                }
            }
        })

        if (flag === 0) {
            formik.setFieldError("coupon", "Invalid coupon")
        } else if (flag === 1) {
            formik.setFieldError("coupon", "Coupon Aplied Succesfully")
        } else if (flag === 2) {
            formik.setFieldError("coupon", "Coupon Expiry")
        }
    }

    // const getDiscountedTotal = () => {
    //     const appliedDiscountDetails = coupon.coupon.find(v => v.coupon_name === couponDisCount);

    //     if (appliedDiscountDetails) {

    //         const discountPercentage = appliedDiscountDetails.percentage / 100;

    //         return cartData.reduce((a, b) => a + b.price * b.qty, 0) * (1 - discountPercentage);
    //     }

    //     return cartData.reduce((a, b) => a + b.price * b.qty, 0);
    // };


    let couonSchema = object({
        coupon: string().required("Please entre Coupon"),
    });


    const formik = useFormik({
        initialValues: {
            coupon: '',
        },
        validationSchema: couonSchema,
        onSubmit: values => {
            handleCoupon(values)
        },
    });


    const { handleSubmit, handleChange, handleBlur, values, touched, errors } = formik;


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
                        <form onSubmit={handleSubmit}>
                            <input
                                name='coupon'
                                type="text"
                                className="border-0 border-bottom rounded me-5 py-3 mb-4"
                                placeholder="Coupon Code"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.coupon}
                            />
                            {errors.coupon && touched.coupon ? <span style={{ color: "red", margin: "20px" }} >{errors.coupon}</span> : null}
                            <button
                                className="btn border-secondary rounded-pill px-4 py-3 text-primary"
                                type="submit">
                                Apply Coupon
                            </button>
                        </form>
                    </div>
                    <div className="row g-4 justify-content-end">
                        <div className="col-8" />
                        <div className="col-sm-8 col-md-7 col-lg-6 col-xl-4">
                            <div className="bg-light rounded">
                                <div className="p-4">
                                    <h1 className="display-6 mb-4">Cart <span className="fw-normal">Total</span></h1>
                                    <div className="d-flex justify-content-between mb-4">
                                        <h5 className="mb-0 me-4">Subtotal:</h5>
                                        <p className="mb-0">${totalAmt}</p>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <h5 className="mb-0 me-4">Shipping</h5>
                                        <div className>
                                            <p className="mb-0">Flat rate: $3.00</p>
                                        </div>
                                    </div>
                                    <p className="mb-0 text-end">Shipping to Ukraine.</p>
                                </div>
                                <div className="py-4 mb-4 border-top border-bottom d-flex justify-content-between">
                                    <h5 className="mb-0 ps-4 me-4">Total</h5>
                                    <p className="mb-0 pe-4">${totalAmt + 3}</p>
                                </div>
                                {/* <div className="py-4 mb-4 border-top border-bottom d-flex justify-content-between align-items-center">

                                    <p className="mb-0 fw-bold text-primary ">

                                        {
                                            isValid && couponDisCount ? (
                                                <div className="">
                                                    <p className="mb-2">Total: <strong>${cartData.reduce((a, b) => a + b.price * b.qty, 0).toFixed(2)}</strong></p>
                                                    <p className="mb-0">Total After Discount: <strong>${getDiscountedTotal().toFixed(2)}</strong> (<span className="text-success">{coupon.coupon.find(v => v.coupon_name === couponDisCount).percentage}% discount applied</span>)</p>
                                                </div>

                                            ) : (
                                                <div className="">
                                                    <p className="mb-0">Total: <strong>${cartData.reduce((a, b) => a + b.price * b.qty, 0).toFixed(2)}</strong></p>
                                                </div>

                                            )
                                        }




                                    </p>

                                </div> */}
                                <button className="btn border-secondary rounded-pill px-4 py-3 text-primary text-uppercase mb-4 ms-4" type="button">Proceed Checkout</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Cart Page End */}
        </div>

    );
}

export default Cart;