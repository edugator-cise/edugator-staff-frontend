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
  TablePagination,
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

const rowsPerPage = 6;

export function AccountsTable() {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.adminDashboard);

  const [page, setPage] = React.useState(0);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <DataCell>Email</DataCell>
            <DataCell>Name</DataCell>
            <DataCell>Phone</DataCell>
            <DataCell align="right">Role</DataCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            // accounts to be displayed, could be a filtered array
            dummyAccounts.length > 0 ? (
              <>
                {
                  // until backend sends me some accounts
                  dummyAccounts
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, i) => (
                      <TableRow
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
                            color={
                              row.role === "Professor" ? "primary" : undefined
                            }
                          />
                        </DataCell>
                      </TableRow>
                    ))
                }
              </>
            ) : (
              // shouldn't happen in current build,
              // to see this page you need an account
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No accounts to show
                </TableCell>
              </TableRow>
            )
          }
        </TableBody>
        <TablePagination
          page={page}
          count={dummyAccounts.length}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[]}
          onPageChange={(event, page) => setPage(page)}
        />
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
  { username: "me@ufl.edu", role: rolesEnum.TA },
  { username: "me@ufl.edu", role: rolesEnum.TA },
  { username: "me@ufl.edu", role: rolesEnum.TA },
  { username: "me@ufl.edu", role: rolesEnum.TA },
  { username: "me@ufl.edu", role: rolesEnum.TA },
  { username: "me@ufl.edu", role: rolesEnum.TA },
  { username: "me@ufl.edu", role: rolesEnum.TA },
  { username: "me@ufl.edu", role: rolesEnum.TA },
  { username: "me@ufl.edu", role: rolesEnum.TA },
  { username: "me@ufl.edu", role: rolesEnum.TA },
  { username: "me@ufl.edu", role: rolesEnum.TA },
  { username: "me@ufl.edu", role: rolesEnum.TA },
];
