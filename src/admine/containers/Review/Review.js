import React from 'react';

function Review(props) {
    return (
        <div>
            <h1>Review Page</h1>
        </div>
    );
}

export default Review;

// import React, { useEffect, useState } from 'react';
// import * as yup from 'yup';
// import { useFormik } from 'formik';
// import { useDispatch, useSelector } from 'react-redux';
// import { addAptData, deleteAptData, getAptData, updateAptData } from '../../redux/slice/appointment.slice';
// import Tabs from '@mui/material/Tabs';
// import Tab from '@mui/material/Tab';

// function Appointment(props) {
//     const [update, setUpdate] = useState(false);
//     const [value, setValue] = React.useState('1');

//     const dispatch = useDispatch();

//     useEffect(() => {
//         dispatch(getAptData())
//     }, [])

//     const handleChange1 = (event, newValue) => {
//         setValue(newValue);
//     };

//     let apt = useSelector(state => state.apt);

//     console.log(apt);

//     let d = new Date();
//     console.log(d);

//     let nd = new Date();
//     nd.setDate(d.getDate() - 1)
//     console.log(nd);

//     let aptSchema = yup.object().shape({
//         name: yup.string().required().matches(/^[a-zA-Z ]{2,30}$/, "Please enter valid name"),
//         email: yup.string().required().email(),
//         phone: yup
//             .string()
//             .matches(/^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/, "Please enter valid phone number")
//             .typeError("Only digit allowed"),
//         date: yup
//             .date()
//             .required()
//             .min(nd, "Please enter valid date"),
//         department: yup.string().required(),
//         message: yup
//             .string()
//             .required()
//             .test("more-space-between", "more than one space not allowed between words", (val) => !val.trim().includes("  "))
//             .test("message", "Max 5 words allowed.", function (val) {
//                 console.log(val.trim(), val);
//                 let x = val.trim()
//                 let arr = x.split(" ");
//                 console.log(arr);
//                 return arr.length <= 5;
//             }),
//         pres: yup
//             .mixed()
//             .required("Please upload image")
//             .test("size-val", "Please upload max 2mb file.", (val) => val.size < 2 * 1024 * 1024)
//             .test("type-val", "Please upload only png, jpeg, svg file", (val) => val.type.includes("image/jpeg", "image/png", "image/svg"))
//     });

//     const formikObj = useFormik({
//         initialValues: {
//             name: '',
//             email: '',
//             phone: '',
//             date: '',
//             department: '',
//             message: '',
//             pres: ''
//         },
//         validationSchema: aptSchema,
//         onSubmit: values => {
//             console.log({...values, message: values.message.trim()});

//             let arr = values.message.split(" ");

//             let nArr = arr.map((v) => {
//                 return v[0].toUpperCase() + v.substring(1)
//             })
//             console.log(nArr.join(" "));

//             if (update) {
//                 dispatch(updateAptData(values))
//             } else {
//                 dispatch(addAptData(values));
//             }

//             setUpdate(false);
//             setValue("2");
//         },
//     });

//     const handleDelete = (data) => {
//         dispatch(deleteAptData(data))
//     }

//     const handleEdit = (data) => {
//         setValue("1");
//         setValues(data);
//         setUpdate(true);
//     }

//     const { handleSubmit, handleChange, handleBlur, setFieldValue, errors, values, touched, setValues } = formikObj;

//     console.log(value);
//     return (
//         <main>
//             <section id="appointment" className="appointment">
//                 <div className="container">
//                     <div className="section-title">
//                         <h2>Make an Appointment</h2>
//                         <p>Aenean enim orci, suscipit vitae sodales ac, semper in ex. Nunc aliquam eget nibh eu euismod. Donec dapibus
//                             blandit quam volutpat sollicitudin. Fusce tincidunt sit amet ex in volutpat. Donec lacinia finibus tortor.
//                             Curabitur luctus eleifend odio. Phasellus placerat mi et suscipit pulvinar.</p>
//                     </div>
//                     <Tabs value={value} onChange={handleChange1} centered>
//                         <Tab label="Book Appointment" value='1' />
//                         <Tab label="List Appointment" value='2' />
//                     </Tabs>


//                     {
//                         value === '1' ?
//                             <form onSubmit={handleSubmit} role="form" className="php-email-form">
//                                 <div className="row">
//                                     <div className="col-md-4 form-group">
//                                         <input
//                                             type="text"
//                                             name="name"
//                                             className="form-control"
//                                             id="name"
//                                             placeholder="Your Name"
//                                             onBlur={handleBlur}
//                                             onChange={handleChange}
//                                             value={values.name}
//                                         />
//                                         {errors.name && touched.name ? <span>{errors.name}</span> : ''}
//                                     </div>
//                                     <div className="col-md-4 form-group mt-3 mt-md-0">
//                                         <input
//                                             type="email"
//                                             className="form-control"
//                                             name="email"
//                                             id="email"
//                                             placeholder="Your Email"
//                                             onBlur={handleBlur}
//                                             onChange={handleChange}
//                                             value={values.email}
//                                         />
//                                         {errors.email && touched.email ? <span>{errors.email}</span> : ''}
//                                     </div>
//                                     <div className="col-md-4 form-group mt-3 mt-md-0">
//                                         <input
//                                             type="tel"
//                                             className="form-control"
//                                             name="phone"
//                                             id="phone"
//                                             placeholder="Your Phone"
//                                             onBlur={handleBlur}
//                                             onChange={handleChange}
//                                             value={values.phone}
//                                         />
//                                         {errors.phone && touched.phone ? <span>{errors.phone}</span> : ''}
//                                     </div>
//                                 </div>
//                                 <div className="row">
//                                     <div className="col-md-4 form-group mt-3">
//                                         <input
//                                             type="date"
//                                             name="date"
//                                             className="form-control datepicker"
//                                             id="date"
//                                             placeholder="Appointment Date"
//                                             onBlur={handleBlur}
//                                             onChange={handleChange}
//                                             value={values.date}
//                                         />
//                                         {errors.date && touched.date ? <span>{errors.date}</span> : ''}
//                                     </div>
//                                     <div className="col-md-4 form-group mt-3">
//                                         <select
//                                             name="department"
//                                             id="department"
//                                             className="form-select"
//                                             onBlur={handleBlur}
//                                             onChange={handleChange}
//                                             value={values.department}
//                                         >
//                                             <option value=''>Select Department</option>
//                                             <option value="Department 1">Department 1</option>
//                                             <option value="Department 2">Department 2</option>
//                                             <option value="Department 3">Department 3</option>
//                                         </select>
//                                         {errors.department && touched.department ? <span>{errors.department}</span> : ''}
//                                     </div>
//                                     <div className="col-md-4 form-group mt-3">
//                                         <input
//                                             type='file'
//                                             name='pres'
//                                             id='pres'
//                                             onChange={(event) => setFieldValue("pres", event.target.files[0])}
//                                         />
//                                         <img
//                                             src={typeof values.pres === 'string' ? values.pres : URL.createObjectURL(values.pres)}
//                                             width={"50px"}
//                                             height={"50px"}
//                                         />
//                                         {errors.pres && touched.pres ? <span>{errors.pres}</span> : ''}
//                                     </div>
//                                 </div>
//                                 <div className="form-group mt-3">
//                                     <textarea
//                                         className="form-control"
//                                         name="message"
//                                         rows={5}
//                                         placeholder="Message"
//                                         onBlur={handleBlur}
//                                         onChange={handleChange}
//                                         value={values.message}
//                                     />
//                                     {errors.message && touched.message ? <span>{errors.message}</span> : ''}
//                                 </div>
//                                 <div className="mb-3">
//                                     <div className="loading">Loading</div>
//                                     <div className="error-message" />
//                                     <div className="sent-message">Your appointment request has been sent successfully. Thank you!</div>
//                                 </div>
//                                 <div className="text-center"><button type="submit"> {update ? "Update an Appointment" : "Make an Appointment"}</button></div>
//                             </form>
//                             :
//                             <>
//                                 <h2>List of Appointment</h2>
//                                 {apt.apt ?
//                                     <div className='row'>
//                                         {
//                                             apt.apt.map((v) => {
//                                                 return (
//                                                     <div className='col-md-3'>
//                                                         <img src={v.pres} width={'100px'} height={'100px'} />
//                                                         <p>{v.name}</p>
//                                                         <p>{v.date}</p>
//                                                         <button onClick={() => handleEdit(v)}>Edit</button>
//                                                         <button onClick={() => handleDelete(v)}>Delete</button>
//                                                     </div>
//                                                 )
//                                             })
//                                         }
//                                     </div> : null}
//                             </>
//                     }

//                 </div>
//             </section>
//         </main>

//     );
// }

// export default Appointment;