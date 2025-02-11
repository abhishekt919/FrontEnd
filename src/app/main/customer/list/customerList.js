import React, { useState, useEffect } from "react";
import {
  Paper,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Modal,
  Typography,
  IconButton,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { getCustomer } from "./../store/customerSlice";
import { showMessage } from "app/store/fuse/messageSlice";
import { CustomActionMenu, LoadingView, NoRecordsView } from "app/shared-components/index";
import Preview from "./customerPreview";
import AddCardDialog from "./AddCardDialog";
import CloseIcon from "@mui/icons-material/Close";

function CustomerList(props) {
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(true);
  const [customer, setCustomer] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [modalData, setModalData] = useState(null);
  const [openModal, setModalOpen] = useState(false);
  const [addCardModal, setAddCardModal] = useState(false);

  useEffect(() => {
    setLoading(true);
    dispatch(getCustomer())
      .then((result) => {
        setCustomer(result.payload.data.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        dispatch(showMessage({ message: "Failed to load customer", variant: "error" }));
        console.error("Error fetching customer:", error);
      });
  }, [rowsPerPage, dispatch]);

  const onOpenModal = (item) => {
    setModalData(item);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleOpenAddCardModal = (item) => {
    setModalData(item);
    setAddCardModal(true);
  };

  const handleCloseAddCardModal = () => {
    setAddCardModal(false);
  };

  if (isLoading) {
    return <LoadingView />;
  }

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      {customer.length === 0 ? (
        <NoRecordsView />
      ) : (
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Stripe Customer Id</TableCell>
                <TableCell>Action Button</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {customer.map((row, idx) => (
                <TableRow key={idx}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>
                    <CustomActionMenu
                      actions={[
                        {
                          name: "Customer Cards",
                          iconName: "heroicons-outline:eye",
                          isVisible: true,
                          onClick: () => onOpenModal(row),
                        },
                        {
                          name: "Add Card",
                          iconName: "heroicons-outline:plus-circle",
                          isVisible: true,
                          onClick: () => handleOpenAddCardModal(row),
                        },
                      ]}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <TablePagination
        rowsPerPageOptions={[5, 10, 15, 25]}
        component="div"
        count={customer.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(event, newPage) => setPage(newPage)}
        onRowsPerPageChange={(event) => {
          setRowsPerPage(parseInt(event.target.value, 10));
          setPage(0);
        }}
      />
      {/* For view Customer details */}
      {openModal ? (
        <Preview
          previewData={modalData}
          openModal={openModal}
          closeModal={closeModal}
        />
      ) : null}

      {/* Add Card Modal */}
      {addCardModal && (
        <AddCardDialog
          open={addCardModal}
          handleClose={handleCloseAddCardModal}
          customer={modalData}
        />
      )}

    </Paper>
  );
}

export default CustomerList;

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};
