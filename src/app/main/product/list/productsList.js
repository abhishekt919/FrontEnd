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
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  CustomActionMenu,
  LoadingView,
  NoRecordsView,
} from "app/shared-components/index";
import { getProducts } from "./../store/productSlice";
import { getCart } from "./../store/cartSlice";
import { showMessage } from "app/store/fuse/messageSlice";
import PreviewPage from "../preview";

function ProductList(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [products, setProducts] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [isLoading, setLoading] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [openModal, setModalOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState("All");
  const [sortOrder, setSortOrder] = useState("none");
  const [searchItem, setSearchItem] = useState("");

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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleFilterChange = (event) => {
    setFilterStatus(event.target.value);
    setPage(0);
  };

  const handleSortOrderChange = (event) => {
    setSortOrder(event.target.value);
    setPage(0);
  };

  const handleSearchChange = (event) => {
    setSearchItem(event.target.value.toLowerCase());
    setPage(0);
  };

  const onOpenModal = (item) => {
    setModalData(item);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const outOfStock = async (item) => {
    try {
      const response = await axios.patch(
        `http://localhost:4000/api/v1/product/out-of-stock/${item._id}`
      );
      if (response.data.messageId === 200) {
        dispatch(
          showMessage({ message: response.data.message, variant: "success" })
        );
        refreshProducts();
      } else {
        dispatch(
          showMessage({ message: response.data.message, variant: "error" })
        );
      }
    } catch (error) {
      dispatch(
        showMessage({
          message: "Error marking product as unavailable",
          variant: "error",
        })
      );
      console.error("Error marking product as unavailable:", error);
    }
  };

  const AddInStock = async (item) => {
    try {
      const response = await axios.patch(
        `http://localhost:4000/api/v1/product/add-in-stock/${item._id}`
      );
      if (response.data.messageId === 200) {
        dispatch(
          showMessage({ message: response.data.message, variant: "success" })
        );
        refreshProducts();
      } else {
        dispatch(
          showMessage({ message: response.data.message, variant: "error" })
        );
      }
    } catch (error) {
      dispatch(
        showMessage({
          message: "Error marking product as available",
          variant: "error",
        })
      );
      console.error("Error marking product as available:", error);
    }
  };

  const refreshProducts = () => {
    dispatch(getProducts({ limit: rowsPerPage }))
      .then((result) => {
        setProducts(result.payload.data);
      })
      .catch((error) => {
        dispatch(
          showMessage({
            message: "Failed to refresh products",
            variant: "error",
          })
        );
        console.error("Error refreshing products:", error);
      });
  };

  const refreshCart = () => {
    dispatch(getCart())
      .then((result) => {
        console.log("Cart refreshed successfully:", result.payload.cart.items);
      })
      .catch((error) => {
        console.error("Failed to refresh cart:", error);
        dispatch(
          showMessage({
            message: "Failed to refresh cart data",
            variant: "error",
          })
        );
      });
  };
  

  // Combined filtering and sorting function
  const getFilteredProducts = () => {
    return products
      .filter((product) => {
        // Filter by status
        if (filterStatus === "All") return true;
        if (filterStatus === "Available") return product.isAvailable;
        if (filterStatus === "Unavailable") return !product.isAvailable;
        return true;
      })
      .filter((product) => {
        // Filter by search term
        return product.name.toLowerCase().includes(searchItem);
      })
      .sort((a, b) => {
        // Sort by price
        if (sortOrder === "lowToHigh") return a.price - b.price;
        if (sortOrder === "highToLow") return b.price - a.price;
        return 0;
      });
  };
  const addToCart = async (product) => {
    try {
      const response = await axios.post(
        `http://localhost:4000/api/v1/cart/add`,
        {
          productId: product._id,
          quantity: 1, // You can change the quantity based on user input or other logic
        }
      );

      if (response.data.messageId === 200) {
        dispatch(
          showMessage({ message: response.data.message, variant: "success" })
        );
        refreshProducts();
        refreshCart();
      } else {
        dispatch(
          showMessage({ message: response.data.message, variant: "error" })
        );
      }
    } catch (error) {
      dispatch(
        showMessage({
          message: "Error adding product to cart",
          variant: "error",
        })
      );
      console.error("Error adding product to cart:", error);
    }
  };

  const filteredProducts = getFilteredProducts();


  if (isLoading) return <LoadingView />;

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <FormControl sx={{ m: 2, minWidth: 120 }}>
        <InputLabel>Status</InputLabel>
        <Select
          value={filterStatus}
          onChange={handleFilterChange}
          label="Status"
        >
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="Available">Available</MenuItem>
          <MenuItem value="Unavailable">Unavailable</MenuItem>
        </Select>
      </FormControl>

      <FormControl sx={{ m: 2, minWidth: 120 }}>
        <InputLabel>Sort By</InputLabel>
        <Select
          value={sortOrder}
          onChange={handleSortOrderChange}
          label="Sort By Price"
        >
          <MenuItem value="none">None</MenuItem>
          <MenuItem value="lowToHigh">Price: Low to High</MenuItem>
          <MenuItem value="highToLow">Price: High to Low</MenuItem>
        </Select>
      </FormControl>

      <FormControl sx={{ m: 2, minWidth: 120 }}>
        <TextField
          label="Search by Name"
          variant="outlined"
          value={searchItem}
          onChange={handleSearchChange}
          fullWidth
        />
      </FormControl>

      {filteredProducts.length === 0 ? (
        <NoRecordsView />
      ) : (
        <>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Cart</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredProducts
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>{row.title}</TableCell>
                      <TableCell>{row.price}</TableCell>
                      <TableCell>{row.description}</TableCell>
                      <TableCell>
                        {row.isAvailable ? (
                          <Chip label="Available" color="success" />
                        ) : (
                          <Chip label="Unavailable" color="error" />
                        )}
                      </TableCell>
                      <TableCell>{row.quantity}</TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => addToCart(row)}
                          disabled={row.quantity === 0 || !row.isAvailable}
                        >
                          Add to Cart
                        </Button>
                      </TableCell>
                      <TableCell>
                        <CustomActionMenu
                          actions={[
                            {
                              iconName: "heroicons-outline:eye",
                              name: "View Details",
                              isVisible: true,
                              onClick: () => onOpenModal(row),
                            },
                            {
                              iconName: "heroicons-outline:check-circle ",
                              name: "Mark Available",
                              isVisible: !row.isAvailable,
                              onClick: () => AddInStock(row),
                            },
                            {
                              iconName: "heroicons-outline:ban",
                              name: "Mark Unavailable",
                              isVisible: row.isAvailable,
                              onClick: () => outOfStock(row),
                            },
                          ]}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, 50]}
            component="div"
            count={filteredProducts.length}
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
           {openModal ? (
        <PreviewPage
          previewData={modalData}
          openModal={openModal}
          closeModal={closeModal}
        />
      ) : null}
    </Paper>
  );
}

export default ProductList;
