import React, { useState, useEffect } from "react";
import {
  Avatar,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Paper,
  TablePagination,
  FormControl,
  TextField,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { LoadingView, NoRecordsView,CustomActionMenu } from "app/shared-components/index";
import { getContact } from "./../store/contactSlice";
import { showMessage } from "app/store/fuse/messageSlice";
import PreviewPage from "../preview";

function ContactList(props) {
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(true);
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [modalData, setModalData] = useState(null);
  const [openModal, setModalOpen] = useState(false);

  useEffect(() => {
    setLoading(true);
    dispatch(getContact({ limit: rowsPerPage }))
      .then((result) => {
        setContacts(result.payload.data);
        setFilteredContacts(result.payload.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        dispatch(
          showMessage({ message: "Failed to load contacts", variant: "error" })
        );
        console.error("Error fetching contacts:", error);
      });
  }, [rowsPerPage, dispatch]);

  // Function to handle search term change
  const handleSearchChange = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);
    setPage(0); // Reset to the first page when the search term changes

    // Filter contacts based on the search term
    const filtered = contacts.filter((contact) =>
      contact.firstName.toLowerCase().includes(value)
    );
    setFilteredContacts(filtered);
  };

  const onOpenModal = (item) => {
    setModalData(item);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  if (isLoading) {
    return <LoadingView />;
  }

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      {/* Search input for filtering contacts by firstName */}
      <FormControl sx={{ m: 2, minWidth: 120 }}>
        <TextField
          label="Search by First Name"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearchChange}
          fullWidth
        />
      </FormControl>

      {filteredContacts.length === 0 ? (
        <NoRecordsView />
      ) : (
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>Image</TableCell>
                <TableCell>First Name</TableCell>
                <TableCell>Last Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredContacts
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow key={row._id}>
                    <TableCell>
                      <Box
                        sx={{
                          position: "relative",
                          width: 50,
                          height: 50,
                          "&:hover": {
                            zIndex: 1, // Ensure the image is on top during hover
                          },
                        }}
                      >
                        <Avatar
                          src={
                            row.image
                              ? `http://localhost:4000/uploads/${row.image}`
                              : null
                          }
                          alt={row.firstName}
                          sx={{
                            width: 50,
                            height: 50,
                            transition: "transform 0.9s ease", // Smooth transition effect
                            position: "absolute",
                            top: 0,
                            left: 0,
                            "&:hover": {
                              transform: "scale(3)", // Double the size on hover
                            },
                          }}
                        />
                      </Box>
                    </TableCell>

                    <TableCell>{row.firstName}</TableCell>
                    <TableCell>{row.lastName}</TableCell>
                    <TableCell>{row.email}</TableCell>
                    <TableCell>{row.phoneNumber}</TableCell>
                    <TableCell>
                        <CustomActionMenu
                          actions={[
                            {
                              iconName: "heroicons-outline:eye",
                              name: "View Details",
                              isVisible: true,
                              onClick: () => onOpenModal(row),
                            },]}/>
                            </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {/* Pagination component */}
      <TablePagination
        rowsPerPageOptions={[5, 10, 15, 25]}
        component="div"
        count={filteredContacts.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(event, newPage) => setPage(newPage)}
        onRowsPerPageChange={(event) => {
          setRowsPerPage(parseInt(event.target.value, 10));
          setPage(0);
        }}
      />
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

export default ContactList;
