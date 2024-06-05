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

import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';





export default function Subcatagory() {
    const [open, setOpen] = React.useState(false);
    const [data, setData] = React.useState([]);
    const [update, setUpdate] = React.useState(null);
    const [category, setCategory] = React.useState([]);

    // console.log(data);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        formik.resetForm();
        setUpdate(null);
    };

    let catagorySchema = object({
        name: string().required("Please entre name"),
        description: string().required("Please entre discription").min(5, "Please entre minimum 5 charactrer in message"),
    });

    const formik = useFormik({
        initialValues: {
            name: '',
            description: '',
        },

        validationSchema: catagorySchema,

        onSubmit: (values, { resetForm }) => {

            if (update) {
                handleUpdateData(values)
            } else {
                handleAdd(values)
            }

            resetForm();
            handleClose();
        },
    });


    const { handleSubmit, handleChange, handleBlur, errors, touched, values, setValues } = formik;


    const getData = async () => {
        try {
            const response = await fetch("http://localhost:8000/api/v1/subcategories/list-subcategories");
            const data = await response.json();
            console.log(data);
            setData(data.data);

            const response2 = await fetch("http://localhost:8000/api/v1/categories/list-categories");
            const catagories = await response2.json();
            console.log(catagories);
            setCategory(catagories.data);
        } catch (error) {
            console.log(error);
        }

    }

    React.useEffect(() => {
        getData();
    }, [])


    const handleAdd = async (data) => {
        console.log(data);

        try {
            await fetch("http://localhost:8000/api/v1/subcategories/add-subcategories", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data)
            })
        } catch (error) {
            console.log(error);
        }

        getData();
    }


    const handleDelete = async (data) => {

        try {
            await fetch("http://localhost:8000/api/v1/subcategories/delete-subcategory/" + data._id, {
                method: "DELETE",
            })
        } catch (error) {
            console.log(error);
        }

        getData();
    }

    const handlEdit = (data) => {
        // console.log(data);
        setOpen(true);
        setValues(data);
        setUpdate(data._id);
    }

    const handleUpdateData = async (data) => {

        try {
            await fetch("http://localhost:8000/api/v1/subcategories/update-subcategory/" + data._id, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data)
            })
        } catch (error) {
            console.log(error);
        }

        getData();
    }

    const columns = [
        { field: 'name', headerName: 'Name', width: 130 },
        { field: 'description', headerName: 'Description', width: 130 },
        {
            field: 'Action',
            headerName: 'Action',
            width: 130,
            renderCell: (params) => (
                <>
                    <IconButton aria-label="delete" size="large" onClick={() => handlEdit(params.row)}>
                        <EditIcon />
                    </IconButton>

                    <IconButton aria-label="delete" size="large" onClick={() => handleDelete(params.row)}>
                        <DeleteIcon />
                    </IconButton>
                </>
            )


        }

    ];



    return (

        <>

            <React.Fragment>
                <Button variant="outlined" onClick={handleClickOpen}>
                    Add Subcategory
                </Button>
                <Dialog
                    open={open}
                    onClose={handleClose}
                >
                    <DialogTitle>Subcategory</DialogTitle>
                    <form onSubmit={handleSubmit}>
                        <DialogContent>
                            <select name="" id="">
                                <option value="">Select Category</option>
                                {
                                    category.map((v) => (
                                        console.log(v._id),
                                        <option value={v._id}>{v.name}</option>
                                    ))
                                }
                            </select>
                            <TextField
                                margin="dense"
                                id="name"
                                name="name"
                                label="Subcategory Name"
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
                                id="name"
                                name="description"
                                label="Subcategory Description"
                                type="text"
                                fullWidth
                                variant="standard"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.description}
                                error={errors.description && touched.description ? true : false}
                                helperText={errors.description && touched.description ? errors.description : ''}
                            />
                            <DialogActions>
                                <Button onClick={handleClose}>Cancel</Button>
                                <Button
                                    type="submit"
                                >{update ? 'Update' : 'Add'}</Button>
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
                    getRowId={rows => rows._id}
                />
            </div>
        </>
    );
}