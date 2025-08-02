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
import { useGetAdvocates } from "./hooks/AdvocateHooks";

export default function Home() {
  const rowsPerPage = 10;
  const [searchInput, setSearchInput] = useState("");
  const [advocates, setAdvocates] = useState<AdvocateEntity[]>([]);
  const [filteredAdvocates, setFilteredAdvocates] = useState<AdvocateEntity[]>(
    []
  );
  const [page, setPage] = useState(0);
  const [initialFetch, setInitialFetch] = useState(true);

  const { data, count, request } = useGetAdvocates();

  useEffect(() => {
    if (initialFetch) {
      request(searchInput, page);
    }
  }, [initialFetch]);

  useEffect(() => {
    if (data) {
      setInitialFetch(false);
      setAdvocates(data);
      setFilteredAdvocates(data);
    }
  }, [data]);

  useEffect(() => {
    request(searchInput, page);
  }, [page]);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;
    setSearchInput(searchTerm);
  };

  const onReset = () => {
    setSearchInput("");
    setPage(0);
    request("", 0);
  };

  const onSearch = () => {
    setPage(0);
    request(searchInput, 0);
  };

  const handleChangePage = (_: unknown, newPage: number) => {
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
              {filteredAdvocates.map((advocate, index) => (
                <TableRow
                  key={`${advocate.id}-${index}`}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell
                    component="th"
                    scope="row"
                    style={{ verticalAlign: "text-top" }}
                  >
                    {advocate.firstName}
                  </TableCell>
                  <TableCell align="left" style={{ verticalAlign: "text-top" }}>
                    {advocate.lastName}
                  </TableCell>
                  <TableCell align="left" style={{ verticalAlign: "text-top" }}>
                    {advocate.city}
                  </TableCell>
                  <TableCell align="left" style={{ verticalAlign: "text-top" }}>
                    {advocate.degree}
                  </TableCell>
                  <TableCell align="left" style={{ verticalAlign: "text-top" }}>
                    {advocate.specialties.map((specialty, i) => (
                      <Typography key={`${specialty}-${i}`}>
                        • {specialty}
                      </Typography>
                    ))}
                  </TableCell>
                  <TableCell align="left" style={{ verticalAlign: "text-top" }}>
                    {advocate.yearsOfExperience}
                  </TableCell>
                  <TableCell align="left" style={{ verticalAlign: "text-top" }}>
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
          count={count}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
        />
      </main>
    </ThemeProvider>
  );
}
