import React, { useState, useEffect } from "react";
import {
  Button,
  Chip,
  Table,
  TextField,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Paper,
  TablePagination,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { getProducts, deleteProduct } from "./../store/productSlice";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";
import { LoadingView, NoRecordsView } from "app/shared-components/index";
import { showMessage } from "app/store/fuse/messageSlice";

function ProductList(props) {
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [products, setProducts] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [isLoading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);

  // Fetching the products
  useEffect(() => {
    setLoading(true);
    dispatch(getProducts({ limit: rowsPerPage }))
      .then((result) => {
        setProducts(result.payload.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        dispatch(
          showMessage({ message: "Failed to load products", variant: "error" })
        );
        console.error("Error fetching products:", error);
      });
  }, [rowsPerPage, dispatch]);

  // Function to open the delete modal
  const handleOpen = (productId) => {
    setSelectedProductId(productId);
    setOpen(true);
  };

  // Function to close the modal
  const handleClose = () => {
    setOpen(false);
    setSelectedProductId(null);
  };

  // Function to confirm deletion
  const handleConfirmDelete = () => {
    dispatch(deleteProduct(selectedProductId)).then(() => {
      // Refetch products after deletion
      dispatch(getProducts({ limit: rowsPerPage }));
      handleClose();
    });
  };

  if (isLoading) return <LoadingView />;

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      {products.length === 0 ? (
        <NoRecordsView />
      ) : (
        <>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell>ProductID</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                      <TableCell>{row.productId}</TableCell>
                      <TableCell>{row.title}</TableCell>
                      <TableCell>{row.price}</TableCell>
                      <TableCell>{row.description}</TableCell>
                      <TableCell>
                        {row.status === "available" ? (
                          <Chip label="Available" color="success" />
                        ) : row.status === "low stock" ? (
                          <Chip label="Low Stock" color="warning" />
                        ) : row.status === "unavailable" ? (
                          <Chip label="Unavailable" color="error" />
                        ) : (
                          <Chip label="Deleted" color="default" />
                        )}
                      </TableCell>
                      <TableCell>{row.quantity}</TableCell>
                      <TableCell>
                        <IconButton
                          aria-label="delete"
                          color="error"
                          onClick={() => handleOpen(row._id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Pagination */}
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, 50]}
            component="div"
            count={products.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={(event, newPage) => setPage(newPage)}
            onRowsPerPageChange={(event) => {
              setRowsPerPage(parseInt(event.target.value, 10));
              setPage(0);
            }}
          />
        </>
      )}

      {/* Delete Confirmation Modal */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this product?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleConfirmDelete}
            color="error"
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}

export default ProductList;
