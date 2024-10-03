// src/components/UpdateProductModal.js
import React, { useEffect, useState } from 'react';
import { Modal, Button, TextField, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { updateProduct } from '../store/productSlice';

const UpdateProductModal = ({ open, onClose, product }) => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        title: '',
        price: '',
        description: '',
        quantity: '',
    });

    useEffect(() => {
        if (product) {
            setFormData({
                title: product.title || '',
                price: product.price || '',
                description: product.description || '',
                quantity: product.quantity || '',
            });
        }
    }, [product]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateProduct({ id: product._id, data: formData }));
        onClose(); // Close the modal after dispatching
    };

    return (
        <Modal open={open} onClose={onClose}>
            <div className="flex flex-col p-4 max-w-sm mx-auto mt-20 bg-white rounded shadow-lg">
                <Typography variant="h6" gutterBottom>
                    Update Product
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <TextField
                        label="Price"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        required
                        type="number"
                    />
                    <TextField
                        label="Description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <TextField
                        label="Quantity"
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        required
                        type="number"
                    />
                    <div className="flex justify-end mt-4">
                        <Button onClick={onClose} color="secondary" variant="outlined" className="mr-2">
                            Cancel
                        </Button>
                        <Button type="submit" color="primary" variant="contained">
                            Update
                        </Button>
                    </div>
                </form>
            </div>
        </Modal>
    );
};

export default UpdateProductModal;
