import React, { useState, useEffect } from "react";
import {
  Autocomplete,
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  MenuItem,
  TextField,
  TableContainer,
  Paper,
  TablePagination,
  FormControl,
  InputLabel,
  Select,
  Typography,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getStudent } from "./../store/studentSlice";
import PreviewPage from "../preview";
import { LoadingView, NoRecordsView, CustomActionMenu } from "app/shared-components/index";

function StudentList(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [isLoading, setLoading] = useState(true);
  const [modalData, setModalData] = useState(null);
  const [openModal, setModalOpen] = useState(false);
  const [filterData, setFilterData] = useState({
    class: null,
    searchText: "",
  });
  const [classList, setClassList] = useState([]);
  const [sortOrder, setSortOrder] = useState("none");
  const [searchItem, setSearchItem] = useState("");

  const staticClassList = [
    { id: 1, name: "1st" },
    { id: 2, name: "2nd" },
    { id: 3, name: "3rd" },
    { id: 4, name: "4th" },
    { id: 5, name: "5th" },
    { id: 6, name: "6th" },
    { id: 7, name: "7th" },
    { id: 8, name: "8th" },
    { id: 9, name: "9th" },
    { id: 10, name: "10th" },
    { id: 11, name: "11th" },
    { id: 12, name: "12th" },
  ];

  useEffect(() => {
    setClassList(staticClassList);
  }, []);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setLoading(true);
        const result = await dispatch(
          getStudent({
            limit: rowsPerPage,
            page: page + 1,
            ...filterData,
          })
        );
        setStudents(result.payload.data);
      } catch (error) {
        console.error("Error fetching students:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, [rowsPerPage, page, filterData, dispatch]);

  useEffect(() => {
    const filtered = students
      .filter((student) => {
        if (!filterData.class) return true;
        return student.class === filterData.class.name; // Adjusting comparison to match selected class object
      }).filter((student) => {
        // Filter by search term
        return student.firstName.toLowerCase().includes(searchItem);
      })
      .sort((a, b) => {
        if (sortOrder === "a-z") return a.firstName.localeCompare(b.firstName);
        if (sortOrder === "z-a") return b.firstName.localeCompare(a.firstName);
        return 0;
      });
    setFilteredStudents(filtered);
  }, [students, filterData, sortOrder, searchItem]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleFilterSubmit = (filters) => {
    setFilterData(filters);
    setPage(0);
  };

  const handleSearchChange = (event) => {
    setSearchItem(event.target.value.toLowerCase());
    setPage(0);
  };

  const handleClearFilter = () => {
    setFilterData({
      class: null,
      searchText: "",
    });
    setPage(0);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const onOpenModal = (row) => {
    setModalData(row);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleClassChange = (event, newValue) => {
    setFilterData((prevState) => ({
      ...prevState,
      class: newValue,
    }));
    setPage(0);
  };

  const handleSortOrderChange = (event) => {
    setSortOrder(event.target.value);
  };

  // Check if filters are applied to disable the Clear Filter button
  const isClearButtonDisabled = !filterData.class && !filterData.searchText;

  if (isLoading) return <LoadingView />;

  return (
    <Paper sx={{ width: "100%", overflow: "hidden", boxShadow: 3 }}>
      <Box display="flex" alignItems="center" mb={2} p={2}>
        <Autocomplete
          options={classList}
          getOptionLabel={(option) => option.name}
          value={filterData.class} // Controlled value
          onChange={handleClassChange}
          sx={{ width: 300 }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Filter By Class"
              variant="outlined"
              margin="normal"
            />
          )}
        />
        <FormControl sx={{ m: 2, minWidth: 120 }}>
          <InputLabel>Sort By</InputLabel>
          <Select
            value={sortOrder}
            onChange={handleSortOrderChange}
            label="Sort By"
          >
            <MenuItem value="none">None</MenuItem>
            <MenuItem value="a-z">First Name: A-Z</MenuItem>
            <MenuItem value="z-a">First Name: Z-A</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ m: 2, minWidth: 120 }}>
        <TextField
          label="Search by First Name"
          variant="outlined"
          value={searchItem}
          onChange={handleSearchChange}
          fullWidth
        />
      </FormControl>
        <Button
          variant="outlined"
          color="secondary"
          onClick={handleClearFilter}
          sx={{ marginLeft: "10px" }}
          disabled={isClearButtonDisabled} // Disable button when not needed
        >
          Clear Filter
        </Button>
      </Box>
      {filteredStudents.length === 0 ? (
        <NoRecordsView />
      ) : (
        <>
          <TableContainer component={Paper} sx={{ maxHeight: 440, border: 1, borderColor: "divider" }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                  <TableCell sx={{ fontWeight: "bold" }}>First Name</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Last Name</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Email</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Roll Number</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Class</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Action Menu</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredStudents
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row._id}
                      sx={{
                        backgroundColor: index % 2 === 0 ? "#f9f9f9" : "white",
                        "&:hover": { backgroundColor: "#e0f7fa" },
                      }}
                    >
                      <TableCell>
                        <Typography variant="body2">{row.firstName}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">{row.lastName}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">{row.email}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">{row.rollNumber}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">{row.class}</Typography>
                      </TableCell>
                      <TableCell>
                        <CustomActionMenu
                          actions={[
                            {
                              iconName: "heroicons-outline:eye",
                              name: "View Details",
                              isVisible: true,
                              onClick: () => onOpenModal(row),
                            }
                          ]}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 15, 20]}
            component="div"
            count={filteredStudents.length}
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

export default StudentList;
