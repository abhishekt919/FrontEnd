// import React, { useEffect, useState } from 'react';
// import { Modal, Button, TextField, Typography } from '@mui/material';
// import { useDispatch } from 'react-redux';
// import { updateProduct, getProducts } from '../store/productSlice';
// import { showMessage } from 'app/store/fuse/messageSlice'; // Optional: To show messages

// const UpdateProductModal = ({ open, onClose, product }) => {
//     const dispatch = useDispatch();
//     const [formData, setFormData] = useState({
//         title: '',
//         price: '',
//         description: '',
//         quantity: '',
//     });

//     // Load the product data when the modal opens
//     useEffect(() => {
//         if (product) {
//             setFormData({
//                 title: product.title || '',
//                 price: product.price || '',
//                 description: product.description || '',
//                 quantity: product.quantity || '',
//             });
//         }
//     }, [product]);

//     // Handle form input changes
//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData((prevData) => ({ ...prevData, [name]: value }));
//     };

//     // Handle form submission to update product
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             await dispatch(updateProduct({ id: product._id, data: formData })).unwrap();
//             // Show a success message (optional)
//             dispatch(showMessage({ message: 'Product updated successfully', variant: 'success' }));
//             // Fetch the latest product list
//             dispatch(getProducts());
//             // Close the modal after update
//             onClose();
//         } catch (error) {
//             // Handle error (optional)
//             dispatch(showMessage({ message: 'Failed to update product', variant: 'error' }));
//             console.error('Update failed:', error);
//         }
//     };

//     return (
//         <Modal open={open} onClose={onClose}>
//             <div className="flex flex-col p-4 max-w-sm mx-auto mt-20 bg-white rounded shadow-lg">
//                 <Typography variant="h6" gutterBottom>
//                     Update Product
//                 </Typography>
//                 <form onSubmit={handleSubmit}>
//                     <TextField
//                         label="Title"
//                         name="title"
//                         value={formData.title}
//                         onChange={handleChange}
//                         fullWidth
//                         margin="normal"
//                         required
//                     />
//                     <TextField
//                         label="Price"
//                         name="price"
//                         value={formData.price}
//                         onChange={handleChange}
//                         fullWidth
//                         margin="normal"
//                         required
//                         type="number"
//                     />
//                     <TextField
//                         label="Description"
//                         name="description"
//                         value={formData.description}
//                         onChange={handleChange}
//                         fullWidth
//                         margin="normal"
//                         required
//                     />
//                     <TextField
//                         label="Quantity"
//                         name="quantity"
//                         value={formData.quantity}
//                         onChange={handleChange}
//                         fullWidth
//                         margin="normal"
//                         required
//                         type="number"
//                     />
//                     <div className="flex justify-end mt-4">
//                         <Button onClick={onClose} color="secondary" variant="outlined" className="mr-2">
//                             Cancel
//                         </Button>
//                         <Button type="submit" color="primary" variant="contained">
//                             Update
//                         </Button>
//                     </div>
//                 </form>
//             </div>
//         </Modal>
//     );
// };

// export default UpdateProductModal;


import React, { useEffect, useState } from 'react';
import { Modal, Button, TextField, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { updateProduct } from '../store/productSlice';
import { showMessage } from 'app/store/fuse/messageSlice'; // Optional: To show messages

const UpdateProductModal = ({ open, onClose, product, refreshProducts }) => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        title: '',
        price: '',
        description: '',
        quantity: '',
    });

    // Load the product data when the modal opens
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

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    // Handle form submission to update product
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await dispatch(updateProduct({ id: product._id, data: formData })).unwrap();
            // Show a success message (optional)
            dispatch(showMessage({ message: 'Product updated successfully', variant: 'success' }));
            // Refresh the product list
            refreshProducts();
            // Close the modal after update
            onClose();
        } catch (error) {
            // Handle error (optional)
            dispatch(showMessage({ message: 'Failed to update product', variant: 'error' }));
            console.error('Update failed:', error);
        }
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
                    />
                    <TextField
                        label="Price"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Quantity"
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />
                    <div className="flex justify-end mt-4">
                        <Button variant="contained" color="primary" type="submit">
                            Save
                        </Button>
                        <Button onClick={onClose} className="ml-2">
                            Cancel
                        </Button>
                    </div>
                </form>
            </div>
        </Modal>
    );
};

export default UpdateProductModal;
