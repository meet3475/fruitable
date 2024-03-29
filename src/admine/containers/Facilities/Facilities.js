import React from 'react';
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
import { Addfacilities } from '../../../redux/action/facilities.action';


function Facilities(props) {
    const [open, setOpen] = React.useState(false);

    const dispatch = useDispatch()

    const facilities = useSelector(state => state.facilities)
    console.log(facilities);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    let facilitiesSchema = object({
        name: string().required("Please entre name"),
        description: string().required("Please entre description"),
    });

    const formik = useFormik({
        initialValues: {
          name:'',
          description:''
        },

        validationSchema : facilitiesSchema,

        onSubmit: (values, { resetForm }) => {
            dispatch(Addfacilities(values))
            handleClose();
            resetForm();
        },
      });

      const {handleSubmit, handleChange, handleBlur, values, touched, errors} = formik;

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
               Add Facilities
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}

            >
                <DialogTitle>Facilities</DialogTitle>
                <form onSubmit={handleSubmit}>
                    <DialogContent>
                        <TextField
                            margin="dense"
                            id="name"
                            name="name"
                            label="Facilities Name"
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
                            label="Facilities Description"
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
                            <Button type="submit">Add</Button>
                        </DialogActions>
                    </DialogContent>
                </form>

            </Dialog>
        </div>
    );
}

export default Facilities;