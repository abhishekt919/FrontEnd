import React, { useEffect } from 'react';
import { Modal, Button, TextField, Typography, Grid } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { updateProduct } from '../store/productSlice';
import { showMessage } from 'app/store/fuse/messageSlice';

// Validation schema using Yup
const schema = yup.object().shape({
    title: yup
        .string()
        .required("This field is required.")
        .max(50, "Not more than 50 characters."),
    price: yup
        .number()
        .required("Please enter a price for your product")
        .min(1, "Price cannot be negative or zero")
        .typeError("Price must be a number"), // Handle number type validation
    description: yup
        .string()
        .required("Enter your product description"),
    quantity: yup
        .number()
        .required("Enter your product quantity")
        .min(0, "Quantity cannot be negative")
        .typeError("Quantity must be a number"),
});

const UpdateProductModal = ({ open, onClose, product, refreshProducts }) => {
    const dispatch = useDispatch();

    const {
        control,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema), 
    });

    useEffect(() => {
        if (product) {
            setValue('title', product.title || '');
            setValue('price', product.price || '');
            setValue('description', product.description || '');
            setValue('quantity', product.quantity !== undefined ? product.quantity : 0); // Ensure quantity is set correctly
        }
    }, [product, setValue]);

    // Handle form submission to update product
    const onSubmit = async (data) => {
        let status;
        if (data.quantity > 0) {
            status = 'available';
        } else if (data.quantity === 0) {
            status = 'unavailable';
        } else {
            status = 'out of stock';
        }

        try {
            await dispatch(updateProduct({ id: product._id, data: { ...data, status } })).unwrap();
            dispatch(showMessage({ message: 'Product updated successfully', variant: 'success' }));
            refreshProducts();
            onClose(); 
        } catch (error) {
            dispatch(showMessage({ message: 'Failed to update product', variant: 'error' }));
        }
    };

    return (
        <Modal open={open} onClose={onClose}>
            <div className="flex flex-col p-6 max-w-md mx-auto mt-20 bg-white rounded shadow-lg">
                <Typography variant="h6" gutterBottom>
                    Update Product
                </Typography>
                <hr className="my-2" style={{ borderColor: '#ccc', borderWidth: '1px' }} />
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={2}>
                        {/* Title Field */}
                        <Grid item xs={12} sm={6}>
                            <Controller
                                name="title"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Title"
                                        fullWidth
                                        margin="normal"
                                        error={!!errors.title}
                                        helperText={errors.title?.message}
                                    />
                                )}
                            />
                        </Grid>

                        {/* Price Field */}
                        <Grid item xs={12} sm={6}>
                            <Controller
                                name="price"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Price"
                                        fullWidth
                                        margin="normal"
                                        error={!!errors.price}
                                        helperText={errors.price?.message}
                                        type="number"
                                    />
                                )}
                            />
                        </Grid>

                        {/* Description Field */}
                        <Grid item xs={12} sm={6}>
                            <Controller
                                name="description"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Description"
                                        fullWidth
                                        margin="normal"
                                        error={!!errors.description}
                                        helperText={errors.description?.message}
                                    />
                                )}
                            />
                        </Grid>

                        {/* Quantity Field */}
                        <Grid item xs={12} sm={6}>
                            <Controller
                                name="quantity"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Quantity"
                                        fullWidth
                                        margin="normal"
                                        error={!!errors.quantity}
                                        helperText={errors.quantity?.message}
                                        type="number"
                                    />
                                )}
                            />
                        </Grid>
                    </Grid>

                    {/* Action Buttons */}
                    <div className="flex justify-end mt-4">
                        <Button variant="contained" color="info" type="submit">
                            Update
                        </Button>
                        <Button onClick={onClose} variant="outlined" className="ml-2">
                            Cancel
                        </Button>
                    </div>
                </form>
            </div>
        </Modal>
    );
};

export default UpdateProductModal;
