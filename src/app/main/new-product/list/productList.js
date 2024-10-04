import React, { useState, useEffect } from "react";
import {
  Button,
  Chip,
  IconButton,
  Table,
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
  Tooltip,
  TableSortLabel,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch } from "react-redux";
import { getProducts, deleteProduct } from "./../store/productSlice";
import { LoadingView, NoRecordsView } from "app/shared-components/index";
import { showMessage } from "app/store/fuse/messageSlice";
import UpdateProductModal from "./UpdateProduct"; // Import the modal

function ProductList(props) {
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [products, setProducts] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [isLoading, setLoading] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [sortOrder, setSortOrder] = useState({
    column: '',
    direction: 'asc',
  });

  // Fetching the products
  useEffect(() => {
    getProductsCall();
  }, [rowsPerPage, dispatch]);

  function getProductsCall() {
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
  }

  const handleRequestSort = (event, property) => {
    const isAsc = sortOrder.column === property && sortOrder.direction === 'asc';
    setSortOrder({
      column: property,
      direction: isAsc ? 'desc' : 'asc',
    });
  };

  const sortedProducts = products.slice().sort((a, b) => {
    if (sortOrder.column) {
      const orderMultiplier = sortOrder.direction === 'asc' ? 1 : -1;
      if (a[sortOrder.column] < b[sortOrder.column]) return -1 * orderMultiplier;
      if (a[sortOrder.column] > b[sortOrder.column]) return 1 * orderMultiplier;
    }
    return 0;
  });

  // Delete and update logic here...
  const handleOpenDelete = (productId) => {
    setSelectedProductId(productId);
    setOpenDeleteDialog(true);
  };

  // Function to close the delete modal
  const handleCloseDelete = () => {
    setOpenDeleteDialog(false);
    setSelectedProductId(null);
  };

  // Function to confirm deletion
  const handleConfirmDelete = () => {
    dispatch(deleteProduct(selectedProductId)).then(() => {
      getProductsCall();
      dispatch(
        showMessage({ message: "Product has been deleted successfully." })
      );
      handleCloseDelete();
    });
  };

  // Function to open the update modal
  const handleOpenUpdate = (product) => {
    setSelectedProduct(product);
    setOpenUpdateModal(true);
  };

  // Function to close the update modal
  const handleCloseUpdate = () => {
    setOpenUpdateModal(false);
    setSelectedProduct(null);
  };

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
                  <TableCell>
                    <TableSortLabel
                      active={sortOrder.column === 'productId'}
                      direction={sortOrder.column === 'productId' ? sortOrder.direction : 'asc'}
                      onClick={() => handleRequestSort(null, 'productId')}
                    >
                      ProductID
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={sortOrder.column === 'title'}
                      direction={sortOrder.column === 'title' ? sortOrder.direction : 'asc'}
                      onClick={() => handleRequestSort(null, 'title')}
                    >
                      Title
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={sortOrder.column === 'price'}
                      direction={sortOrder.column === 'price' ? sortOrder.direction : 'asc'}
                      onClick={() => handleRequestSort(null, 'price')}
                    >
                      Price
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={sortOrder.column === 'quantity'}
                      direction={sortOrder.column === 'quantity' ? sortOrder.direction : 'asc'}
                      onClick={() => handleRequestSort(null, 'quantity')}
                    >
                      Quantity
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sortedProducts
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
                        {/* Action buttons */}
                        <TableCell>
                        <Tooltip title="Edit">
                          <IconButton
                            color="primary"
                            onClick={() => handleOpenUpdate(row)}
                          >
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                          <IconButton
                            aria-label="delete"
                            color="error"
                            onClick={() => handleOpenDelete(row._id)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, 100]}
            component="div"
            count={products.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={(event, newPage) => setPage(newPage)}
            onRowsPerPageChange={(event) => {
              setRowsPerPage(+event.target.value);
              setPage(0);
            }}
          />
        </>
      )}
      {/* Delete dialog and update modal */}
      <Dialog open={openDeleteDialog} onClose={handleCloseDelete}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this product?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDelete} color="primary">
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

      {/* Update Product Modal */}
      <UpdateProductModal
        open={openUpdateModal}
        onClose={handleCloseUpdate}
        product={selectedProduct}
        refreshProducts={getProductsCall} // Pass refresh function to modal
      />
    </Paper>
  );
}

export default ProductList;
