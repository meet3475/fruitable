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
import { getProduct } from '../../../redux/action/product.action';


export default function Product() {
    const [open, setOpen] = React.useState(false);

    const dispatch = useDispatch();

    const product = useSelector(state => state.product)

    React.useEffect(() => {
        dispatch(getProduct())
    }, [])



    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    let productSchema = object({
        name: string().required(),
        description: string().required(),
        price: number().required(),
       
    });


    const formik = useFormik({
        initialValues: {
            name: '',
            description: '',
            price: '',
           
        },
        validationSchema: productSchema,
        onSubmit: (values, { resetForm }) => {
            resetForm();
            handleClose();
        },
    });


    const { handleSubmit, handleChange, handleBlur, values, touched, errors } = formik;

    const columns = [
        { field: 'name', headerName: 'Name', width: 130 },
        { field: 'description', headerName: 'Description', width: 130 },
        { field: 'price', headerName: 'Price', width: 130 },
        
    ];

    


    return (
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
                                id="description"
                                name="description"
                                label="Product Description"
                                type="text"
                                fullWidth
                                variant="standard"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.description}
                                error={errors.description && touched.description ? true : false}
                                helperText={errors.description && touched.description ? errors.description : ''}
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
                                <Button type="submit">Add</Button>
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

    );
}
