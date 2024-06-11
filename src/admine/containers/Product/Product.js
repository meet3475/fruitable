import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { object, string, number, date, InferType } from 'yup';

import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct, deleteProduct, editProduct, getProduct } from '../../../redux/action/product.action';
import { Spinner } from 'reactstrap';

import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { getData } from '../../../redux/action/category.action';
import { InputLabel, MenuItem, Select } from '@mui/material';
import axios from 'axios';
import { getSubData } from '../../../redux/slice/subcategory.slice';


export default function Product() {
    const [open, setOpen] = React.useState(false);

    const [update, setUpdate] = React.useState(false);

    const [data, setData] = React.useState([]);

    const dispatch = useDispatch();

    const product = useSelector(state => state.product)
    console.log(product.product);

    const subcategories = useSelector(state => state.subcategories);
    console.log(subcategories.subcategories);

    const categories = useSelector(state => state.categories);


    // const getProduct = async () => {
    //     try {
    //         const response = await axios.get("localhost:8000/api/v1/products/list-products");
    //         console.log(response.data.data);
    //         const data = response.data.data;

    //         console.log(data);
    //         setData(data);
    //     } catch (error) { }
    // };

    React.useEffect(() => {
        dispatch(getProduct())
        // getProduct();
        dispatch(getData());
        dispatch(getSubData());
    }, [])



    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    let productSchema = object({
        name: string().required("Please select name"),
        discription: string().required("Please select discription"),
        price: number().required("Please select price"),
        category_id: string().required("Please select category"),
        subcategory_id: string().required("Please select Subcategory"),


    });


    const formik = useFormik({
        initialValues: {
            category_id: '',
            subcategory_id: '',
            name: '',
            discription: '',
            price: '',

        },
        validationSchema: productSchema,
        onSubmit: (values, { resetForm }) => {
            if (update) {
                dispatch(editProduct(values))
            } else {
                dispatch(addProduct(values))
            }
            resetForm();
            handleClose();
        },
    });

    const handleDelete = (id) => {
        dispatch(deleteProduct(id))
    }

    const handleEdit = (data) => {
        formik.setValues(data);
        setOpen(true);
        setUpdate(true);
    }


    const { handleSubmit, handleChange, handleBlur, values, touched, errors } = formik;

    const columns = [
        {
            field: 'category_id', headerName: 'Category', width: 150,
            renderCell: (params) => {
                const category = categories.categories?.find((v) => v._id === params.row.category_id);
                // console.log(category);
                return category ? category.name : ''
            }
        },
        {
            field: 'subcategory_id', headerName: 'Subcategory', width: 150,
            renderCell: (params) => {
                const subcategory = subcategories.subcategories?.find((v) => v._id === params.row.subcategory_id);
                // console.log(category);
                return subcategory ? subcategory.name : ''
            }
        },
        { field: 'name', headerName: 'Name', width: 130 },
        { field: 'discription', headerName: 'Description', width: 130 },
        { field: 'price', headerName: 'Price', width: 130 },
        {
            field: 'Action',
            headerName: 'Action',
            width: 130,
            renderCell: (params) => (
                <>
                    <IconButton aria-label="edit" size="large" onClick={() => handleEdit(params.row)}>
                        <EditIcon />
                    </IconButton>

                    <IconButton aria-label="delete" size="large" onClick={() => handleDelete(params.row.id)}>
                        <DeleteIcon />
                    </IconButton>
                </>
            )
        }

    ];




    return (
        <>
            {
                // product.isLoading ?
                //     <Spinner>
                //         Loading...
                //     </Spinner> :
                //     product.error ? <p>{product.error}</p> :
                <>
                    <React.Fragment>
                        <Button variant="outlined" onClick={handleClickOpen}>
                            Add Product
                        </Button>
                        <Dialog
                            open={open}
                            onClose={handleClose}
                        >
                            <DialogTitle>Product</DialogTitle>
                            <form onSubmit={handleSubmit}>
                                <DialogContent>
                                    <InputLabel style={{ color: "black" }}>Select Category</InputLabel>
                                    <Select
                                        name="category_id"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.category_id}
                                        label="Select Category"
                                    >
                                        {
                                            categories.categories.map((v) => (
                                                // console.log(v._id),
                                                <MenuItem key={v._id} value={v._id}>{v.name}</MenuItem>
                                            ))
                                        }
                                    </Select>
                                    {errors.category_id && touched.category_id ? <span style={{ color: "red" }}>{errors.category_id}</span> : null}

                                    <InputLabel style={{ color: "black" }}>Select Subcategory</InputLabel>
                                    <Select
                                        name="subcategory_id"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.subcategory_id}
                                        label="Select Category"
                                    >
                                        {
                                            subcategories.subcategories.map((v) => (
                                                // console.log(v._id),
                                                <MenuItem key={v._id} value={v._id}>{v.name}</MenuItem>
                                            ))
                                        }
                                    </Select>
                                    {errors.subcategory_id && touched.subcategory_id ? <span style={{ color: "red" }}>{errors.subcategory_id}</span> : null}
                                    
                                    <TextField
                                        margin="dense"
                                        id="name"
                                        name="name"
                                        label="Product name"
                                        type="text"
                                        fullWidth
                                        variant="standard"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.name}
                                        error={errors.name && touched.name ? true : false}
                                        helperText={errors.name && touched.name ? errors.name : ''}
                                    />

                                    <TextField
                                        margin="dense"
                                        id="discription"
                                        name="discription"
                                        label="Product Description"
                                        type="text"
                                        fullWidth
                                        variant="standard"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.discription}
                                        error={errors.discription && touched.discription ? true : false}
                                        helperText={errors.discription && touched.discription ? errors.discription : ''}
                                    />

                                    <TextField
                                        margin="dense"
                                        id="price"
                                        name="price"
                                        label="Product Price"
                                        type="text"
                                        fullWidth
                                        variant="standard"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.price}
                                        error={errors.price && touched.price ? true : false}
                                        helperText={errors.price && touched.price ? errors.price : ''}
                                    />


                                    <DialogActions>
                                        <Button onClick={handleClose}>Cancel</Button>
                                        <Button type="submit">{update ? 'Update' : 'Add'}</Button>
                                    </DialogActions>

                                </DialogContent>
                            </form>

                        </Dialog>
                    </React.Fragment>

                    <div style={{ height: 400, width: '100%' }}>
                        <DataGrid
                            rows={product.product}
                            columns={columns}
                            initialState={{
                                pagination: {
                                    paginationModel: { page: 0, pageSize: 5 },
                                },
                            }}
                            pageSizeOptions={[5, 10]}
                            checkboxSelection
                        />
                    </div>
                </>

            }

        </>

    );
}
