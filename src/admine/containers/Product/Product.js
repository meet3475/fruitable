import { Fingerprint } from '@mui/icons-material';
import { Button, IconButton } from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';
import React from 'react';


function Product(props) {
    return (
        <div>
            <h2>Product Admine Page</h2>
            <Button variant="outlined" color="error">
                Error
            </Button>
            <IconButton aria-label="fingerprint" color="success">
                <Fingerprint />
            </IconButton>
            <IconButton aria-label="delete" size="large">
                <DeleteIcon fontSize="inherit" />
            </IconButton>

        </div>
    );
}

export default Product;