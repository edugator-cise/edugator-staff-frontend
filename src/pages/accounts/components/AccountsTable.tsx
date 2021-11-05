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
import { useAppDispatch, useAppSelector } from "../../../app/common/hooks";
import { setSelectedAccount } from "../AdminAccountsPage.slice";
import { IAccount, rolesEnum } from "../types";

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
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.adminDashboard);

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
          {
            // until backend sends me some accounts
            dummyAccounts.map((row, i) => (
              <AccountTableRow
                key={i}
                hover
                onClick={() => dispatch(setSelectedAccount(row))}
                selected={state.selectedAccount === row}
              >
                <DataCell>
                  {row.username}{" "}
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
            ))
          }
        </TableBody>
      </Table>
    </TableContainer>
  );
}

const dummyAccounts: IAccount[] = [
  { username: "mark@test.com", role: rolesEnum.Professor },
  { username: "susus@fake.account", role: rolesEnum.TA },
  { username: "Tanner@ufl.edu", role: rolesEnum.TA },
  { username: "Dhruv@ufl.edu", role: rolesEnum.TA },
  { username: "me@ufl.edu", role: rolesEnum.TA },
];
