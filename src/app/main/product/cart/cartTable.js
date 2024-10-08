import {
  Button,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  TableContainer,
  Paper,
  TablePagination,
  Tooltip,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { showMessage } from 'app/store/fuse/messageSlice';
import axios from "axios";
import {
  CustomActionMenu,
  LoadingView,
  NoRecordsView,
} from "app/shared-components/index";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getCart,removeItemFromCart } from "./../store/cartSlice";

function CartList(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [isLoading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState([]);


  useEffect(() => {
    setLoading(true);
    dispatch(getCart())
      .then((result) => {
        setCartItems(result.payload.cart.items);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching cart:", error);
        setLoading(false);
      });
  }, [dispatch]);

  const handleRemove = async (item, increment) => {
    try {
      const response = await axios.delete(
        "http://localhost:4000/api/v1/cart/remove-item",
        {
          data: {
            productId: item.productId._id,
            quantity: 0,
          },
        }
      );

      if (response.status === 200) {
        setCartItems((prevItems) =>
          prevItems.filter(
            (cartItem) => cartItem.productId._id !== item.productId._id
          ),
        );
        dispatch(showMessage({ message: response.data.message}));
      } else {
        console.error("Failed to remove item:", response.data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleQuantityChange = async (item, increment) => {
    const newQuantity = item.quantity + increment;

    if (newQuantity < 1) return;

    try {
      const response = await axios.patch(
        "http://localhost:4000/api/v1/cart/update-or-remove-item",
        {
          productId: item.productId._id,
          quantity: newQuantity,
        }
      );

      if (response.status === 200) {
        setCartItems((prevItems) =>
          prevItems.map((cartItem) =>
            cartItem.productId._id === item.productId._id
              ? { ...cartItem, quantity: newQuantity }
              : cartItem
          )
        );
        dispatch(showMessage({ message: response.data.message}))
      } else {
        console.error("Failed to update quantity:", response.data.message);
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };


  if (isLoading) return <LoadingView />; 

  return (
    <Paper sx={{ width: "100%"}}>
      {cartItems?.length === 0 ? (
        <NoRecordsView />
      ) : (
        <>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow >
                <TableCell sx={{ width: "20%" }}>Name</TableCell>
                  <TableCell sx={{ width: "20%" }}>Title</TableCell>
                  <TableCell sx={{ width: "20%" }}>Description</TableCell>
                  <TableCell sx={{ width: "20%" }}>Price</TableCell>
                  <TableCell sx={{ width: "20%" }}>Quantity</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cartItems
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row._id}
                      >
                        <TableCell> {row.productId.name}</TableCell>
                        <TableCell> {row.productId.title}</TableCell>
                        <TableCell> {row.productId.description}</TableCell>
                        <TableCell>
                          {row.productId.price}⨯{row.quantity}=
                          {row.productId.price * row.quantity}
                        </TableCell>
                        <TableCell>
                          <Tooltip title="Decrease">
                          <Button
                            color="info"
                            variant="outlined"
                            onClick={() => handleQuantityChange(row, -1)}
                            disabled={row.quantity === 1}
                            size="small"
                          >
                            -
                          </Button></Tooltip>{" "}
                          {row.quantity}
                          {" "}
                         <Tooltip title="Increase">
                         <Button
                            color="info"
                            variant="outlined"
                            onClick={() => handleQuantityChange(row, 1)}
                            size="small"
                          >
                            +
                          </Button>
                         </Tooltip>

                          <Tooltip title="Remove">
                          <IconButton
                            aria-label="delete"
                            color="error"
                            onClick={() => handleRemove(row, -row.quantity)}
                          >
                            <DeleteIcon />
                          </IconButton>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                <TableRow>
                  <TableCell colSpan={3}>
                    <strong>Final Total</strong>
                  </TableCell>
                  <TableCell colSpan={2}>
                    <strong>
                      $
                      {cartItems
                        .reduce(
                          (total, row) =>
                            total + row.productId.price * row.quantity,
                          0
                        )
                        .toFixed(2)}
                    </strong>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </Paper>
  );
}

export default CartList;
