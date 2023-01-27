import React from "react";
import {
  Chip,
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useAppDispatch, useAppSelector } from "../../../../lib/store/hooks";
import { setSelectedAccount } from "../AdminAccountsPage.slice";
import { rolesEnum } from "../types";

const AccountContainer = styled(TableContainer)(({ theme }) => ({
  borderRadius: theme.spacing(1),
  boxShadow: `0 0 4px 4px ${theme.palette.grey[200]}`,
  "& .MuiTableCell-body": {
    backgroundColor: "inherit",
  },
}));

const DataCell = styled(TableCell)({
  width: "30%",
  "& MuiTableCell-alignRight": {
    width: "10%",
  },
});

// attempting to get available vertical space
const windowHeight = window.innerHeight * 0.7;
// height of table row in pixels
const rowHeight = 56.8;
// possible number of rows based on previous numbers
const rowsPerPage = Math.floor(windowHeight / rowHeight) - 2;

export function AccountsTable() {
  const dispatch = useAppDispatch();
  const { accounts, selectedAccount, currentAccount } = useAppSelector(
    (state) => state.accountManager
  );

  const [page, setPage] = React.useState(0);

  return (
    <AccountContainer>
      <Table>
        <TableHead>
          <TableRow>
            <DataCell>Name</DataCell>
            <DataCell>Email</DataCell>
            <DataCell>Phone</DataCell>
            <DataCell align="right">Role</DataCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {accounts.length > 0 ? (
            <>
              {accounts
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, i) => (
                  <TableRow
                    key={i}
                    hover
                    onClick={() => dispatch(setSelectedAccount(row))}
                    selected={selectedAccount === row}
                  >
                    <DataCell>
                      {row.name}{" "}
                      {row.username === currentAccount?.username && (
                        <Chip label="you" size="small" color="primary" />
                      )}
                    </DataCell>
                    <DataCell>{row.username}</DataCell>
                    <DataCell>{row.phone ?? "Not set yet"}</DataCell>
                    <DataCell align="right">
                      <Chip
                        label={row.role}
                        size="small"
                        color={
                          row.role === rolesEnum.Professor
                            ? "primary"
                            : undefined
                        }
                      />
                    </DataCell>
                  </TableRow>
                ))}
            </>
          ) : (
            // shouldn't happen in current build,
            // to see this page you need an account
            <TableRow>
              <TableCell colSpan={4} align="center">
                No accounts to show
              </TableCell>
            </TableRow>
          )}
          <TableRow>
            <TablePagination
              page={page}
              count={accounts.length}
              rowsPerPage={rowsPerPage}
              rowsPerPageOptions={[]}
              onPageChange={(event, page) => setPage(page)}
            />
          </TableRow>
        </TableBody>
      </Table>
    </AccountContainer>
  );
}
