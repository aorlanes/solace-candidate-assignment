"use client";

import {
  TableContainer,
  Paper,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Table,
  Button,
  TextField,
  Typography,
  Box,
  ThemeProvider,
  TablePagination,
} from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import theme from "./theme";

export default function Home() {
  const rowsPerPage = 10;
  const [searchInput, setSearchInput] = useState("");
  const [advocates, setAdvocates] = useState<AdvocateEntity[]>([]);
  const [filteredAdvocates, setFilteredAdvocates] = useState<AdvocateEntity[]>(
    []
  );
  const [page, setPage] = useState(0);

  useEffect(() => {
    console.log("fetching advocates...");
    fetch("/api/advocates").then((response) => {
      response.json().then((jsonResponse) => {
        setAdvocates(jsonResponse.data);
        setFilteredAdvocates(jsonResponse.data);
      });
    });
  }, []);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearchInput(searchTerm);

    console.log("filtering advocates...");
    const filteredAdvocates = advocates.filter((advocate) => {
      return (
        advocate.firstName.toLowerCase().includes(searchTerm) ||
        advocate.lastName.toLowerCase().includes(searchTerm) ||
        advocate.city.toLowerCase().includes(searchTerm) ||
        advocate.degree.toLowerCase().includes(searchTerm) ||
        advocate.phoneNumber.toString().includes(searchTerm) ||
        !!advocate.specialties.find((s) =>
          s.toLowerCase().includes(searchTerm)
        ) ||
        advocate.yearsOfExperience.toString().includes(searchTerm)
      );
    });

    setFilteredAdvocates(filteredAdvocates);
  };

  const onReset = () => {
    console.log(advocates);
    setSearchInput("");
    setFilteredAdvocates(advocates);
  };

  const onSearch = () => {};

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  return (
    <ThemeProvider theme={theme}>
      <main style={{ margin: "24px" }}>
        <Typography variant="h1">Solace Advocates</Typography>
        <br />
        <br />
        <Box
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h2">Search</Typography>
          <Box style={{ alignSelf: "flex-start" }}>
            <Typography style={{ paddingBottom: 8 }}>
              Searching for: {searchInput}
            </Typography>
            <TextField
              label="Search"
              className="border"
              value={searchInput}
              onChange={onChange}
              variant="outlined"
            />
            <Button
              variant="text"
              onClick={onReset}
              style={{ margin: 12, color: "#1d4339" }}
            >
              Reset
            </Button>
            <Button
              variant="contained"
              style={{ background: "#1d4339" }}
              onClick={onSearch}
            >
              Search
            </Button>
          </Box>
        </Box>
        <br />
        <br />

        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead className="bg-[#1d4339]">
              <TableRow>
                <TableCell style={{ color: "white" }}>First Name</TableCell>
                <TableCell align="left" style={{ color: "white" }}>
                  Last Name
                </TableCell>
                <TableCell align="left" style={{ color: "white" }}>
                  City
                </TableCell>
                <TableCell align="left" style={{ color: "white" }}>
                  Degree
                </TableCell>
                <TableCell align="left" style={{ color: "white" }}>
                  Specialties
                </TableCell>
                <TableCell align="left" style={{ color: "white" }}>
                  Years of Experience
                </TableCell>
                <TableCell align="left" style={{ color: "white" }}>
                  Phone Number
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredAdvocates
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((advocate) => (
                  <TableRow
                    key={advocate.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell
                      component="th"
                      scope="row"
                      style={{ verticalAlign: "text-top" }}
                    >
                      {advocate.firstName}
                    </TableCell>
                    <TableCell
                      align="left"
                      style={{ verticalAlign: "text-top" }}
                    >
                      {advocate.lastName}
                    </TableCell>
                    <TableCell
                      align="left"
                      style={{ verticalAlign: "text-top" }}
                    >
                      {advocate.city}
                    </TableCell>
                    <TableCell
                      align="left"
                      style={{ verticalAlign: "text-top" }}
                    >
                      {advocate.degree}
                    </TableCell>
                    <TableCell
                      align="left"
                      style={{ verticalAlign: "text-top" }}
                    >
                      {advocate.specialties.map((specialty, i) => (
                        <Typography key={`${specialty}-${i}`}>
                          • {specialty}
                        </Typography>
                      ))}
                    </TableCell>
                    <TableCell
                      align="left"
                      style={{ verticalAlign: "text-top" }}
                    >
                      {advocate.yearsOfExperience}
                    </TableCell>
                    <TableCell
                      align="left"
                      style={{ verticalAlign: "text-top" }}
                    >
                      {advocate.phoneNumber}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[rowsPerPage]}
          component="div"
          count={filteredAdvocates.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
        />
      </main>
    </ThemeProvider>
  );
}
