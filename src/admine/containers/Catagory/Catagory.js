import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { object, string } from 'yup';
import { useFormik } from 'formik';

import { DataGrid } from '@mui/x-data-grid';

const columns = [
    { field:'category_name', headerName: 'Name', width: 70 },
    { field:'category_description', headerName: 'Description', width: 130 },  
];



export default function Catagory() {
    const [open, setOpen] = React.useState(false);
    const [data, setData] = React.useState([]);
    console.log(data);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const getData = () => {
        const localData = JSON.parse(localStorage.getItem("category"));

        if (localData) {
            setData(localData)
        }
    }

    React.useEffect(() => {
        getData();
    }, [])


    const handleAdd = (data) => {
        console.log(data);
        let localData = JSON.parse(localStorage.getItem("category"));
        let rNo = Math.floor(Math.random() * 1000);

        if (localData) {
            localData.push({ ...data, id: rNo });
            localStorage.setItem("category", JSON.stringify(localData));
        } else {
            localStorage.setItem("category", JSON.stringify([{ ...data, id: rNo }]));
        }
        getData();
    }


    let catagorySchema = object({
        category_name: string().required("Please entre name"),
        category_description: string().required("Please entre description").min(5, "Please entre minimum 5 charactrer in message"),
    });

    const formik = useFormik({
        initialValues: {
            category_name: '',
            category_description: '',
        },

        validationSchema: catagorySchema,

        onSubmit: (values, { resetForm }) => {
            resetForm();
            handleAdd(values)
        },
    });

    const { handleSubmit, handleChange, handleBlur, errors, touched, values } = formik;

    
    
    return (
        <>
            <React.Fragment>
                <Button variant="outlined" onClick={handleClickOpen}>
                    Category
                </Button>
                <Dialog
                    open={open}
                    onClose={handleClose}
                >
                    <DialogTitle>Category</DialogTitle>
                    <form onSubmit={handleSubmit}>
                        <DialogContent>
                            <TextField
                                margin="dense"
                                id="name"
                                name="category_name"
                                label="Category Name"
                                type="text"
                                fullWidth
                                variant="standard"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.category_name}
                                error={errors.category_name && touched.category_name ? true : false}
                                helperText={errors.category_name && touched.category_name ? errors.category_name : ''}
                            />
                            <TextField
                                margin="dense"
                                id="name"
                                name="category_description"
                                label="Category Description"
                                type="text"
                                fullWidth
                                variant="standard"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.category_description}
                                error={errors.category_description && touched.category_description ? true : false}
                                helperText={errors.category_description && touched.category_description ? errors.category_description : ''}
                            />
                            <DialogActions>
                                <Button onClick={handleClose}>Cancel</Button>
                                <Button
                                    type="submit"
                                >Add</Button>
                            </DialogActions>
                        </DialogContent>
                    </form>


                </Dialog>
            </React.Fragment>

            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={data}
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