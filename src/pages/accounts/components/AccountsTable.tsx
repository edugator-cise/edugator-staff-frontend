import React from "react";
import {
  Chip,
  Paper,
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { IAccount } from "../types";

const DataCell = styled(TableCell)({
  width: "30%",
  "& MuiTableCell-alignRight": {
    width: "10%",
  },
});

const AccountTableRow = styled(TableRow)({
  "&:last-child td, &:last-child th": {
    border: 0,
  },
});

export function AccountsTable() {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <DataCell>Username</DataCell>
            <DataCell>Name</DataCell>
            <DataCell>Phone</DataCell>
            <DataCell align="right">Role</DataCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dummyAccounts.map((row, i) => (
            <AccountTableRow key={i} hover>
              <DataCell>
                {row.username ?? "Not set yet"}{" "}
                {
                  // remember to replace this with
                  // person who did the request
                  row.username === "susus@fake.account" ? (
                    <Chip label="you" size="small" color="primary" />
                  ) : (
                    <></>
                  )
                }
              </DataCell>
              <DataCell>{row.name ?? "Not set yet"}</DataCell>
              <DataCell>{row.phone ?? "Not set yet"}</DataCell>
              <DataCell align="right">
                <Chip
                  label={row.role}
                  size="small"
                  // when more roles are added, use a function
                  color={row.role === "Professor" ? "primary" : undefined}
                />
              </DataCell>
            </AccountTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

const dummyAccounts: IAccount[] = [
  { username: "mark@test.com", role: "Professor" },
  { username: "susus@fake.account", role: "TA" },
  { username: "Tanner@ufl.edu", role: "TA" },
  { username: "Dhruv@ufl.edu", role: "TA" },
  { username: "me@ufl.edu", role: "TA" },
];
