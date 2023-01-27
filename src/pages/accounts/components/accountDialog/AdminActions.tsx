import React from "react";
import {
  Box,
  Stack,
  Alert,
  Button,
  MenuItem,
  Collapse,
  TextField,
  Typography,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../../../lib/store/hooks";
import { IAccount, rolesEnum } from "../../types";
import {
  requestDeleteAccount,
  requestModifyAccount,
} from "../../AdminAccountsPage.slice";

enum ActionsEnum {
  noAction = "noAction",
  createTA = "createTA",
  createProfessor = "createProfessor",
  deleteAccount = "deleteAccount",
}
const base: ActionsEnum = ActionsEnum.noAction;

export function AdminActions() {
  const { selectedAccount } = useAppSelector((state) => state.accountManager);

  const [selectedAction, setSelectedAction] = React.useState<ActionsEnum>(base);

  const actionSummary = AdminActionInfo(selectedAction, selectedAccount);

  return (
    <Stack spacing={2}>
      <Typography variant="button" fontSize="h6.fontSize">
        Administrator Actions
      </Typography>

      <Box>
        <TextField
          select
          label="Current Action"
          value={selectedAction}
          onChange={(e) => setSelectedAction(e.target.value as ActionsEnum)}
          sx={{ minWidth: 225 }}
        >
          <MenuItem value={ActionsEnum.noAction}>Select Action</MenuItem>
          <MenuItem value={ActionsEnum.createTA}>Change Role to TA</MenuItem>
          <MenuItem value={ActionsEnum.createProfessor}>
            Change Role to Professor
          </MenuItem>
          <MenuItem value={ActionsEnum.deleteAccount}>Delete Account</MenuItem>
        </TextField>
      </Box>

      <Collapse in={selectedAction !== ActionsEnum.noAction}>
        <Stack spacing={2}>
          <>
            {selectedAction === ActionsEnum.deleteAccount ? (
              <Alert severity="error">{actionSummary.description}</Alert>
            ) : (
              <Typography>{actionSummary.description}</Typography>
            )}
          </>

          <>
            {!actionSummary.validOperation && Boolean(actionSummary.reason) && (
              <Alert severity="error">{actionSummary.reason}</Alert>
            )}
          </>

          <Stack direction="row" spacing={1}>
            <Button
              disabled={!actionSummary.validOperation}
              variant="contained"
              onClick={() => {
                actionSummary.onClick();
                setSelectedAction(ActionsEnum.noAction);
              }}
            >
              Execute
            </Button>

            <Button
              variant="outlined"
              color="secondary"
              onClick={() => setSelectedAction(ActionsEnum.noAction)}
            >
              Cancel
            </Button>
          </Stack>
        </Stack>
      </Collapse>
    </Stack>
  );
}

interface IActionInfo {
  description: string | JSX.Element;
  validOperation: boolean;
  onClick: () => void;
  reason?: string;
}

const AdminActionInfo = (
  action: ActionsEnum,
  targetAccount?: IAccount
): IActionInfo => {
  const dispatch = useAppDispatch();

  const { valid, reason } = IsValidOperation(action, targetAccount);

  if (action === ActionsEnum.createTA) {
    const changed_account: IAccount = {
      ...(targetAccount as IAccount),
      role: rolesEnum.TA,
    };

    return {
      description: "This will change this account to be a TA account",
      onClick: () => dispatch(requestModifyAccount(changed_account)),
      validOperation: valid,
      reason: reason,
    };
  } else if (action === ActionsEnum.createProfessor) {
    const changed_account: IAccount = {
      ...(targetAccount as IAccount),
      role: rolesEnum.Professor,
    };

    return {
      description: "This will change this account to be a Professor account",
      onClick: () => dispatch(requestModifyAccount(changed_account)),
      validOperation: valid,
      reason: reason,
    };
  } else if (action === ActionsEnum.deleteAccount) {
    return {
      description: (
        <>
          WARNING: This is a destructive action. You cannot undo this action.
          <br />
          <br />
          This will delete this account from the database.
        </>
      ),
      onClick: () => dispatch(requestDeleteAccount(targetAccount as IAccount)),
      validOperation: valid,
      reason: reason,
    };
  } else {
    // (action === ActionsEnum.noAction)
    return {
      description: "This action does nothing",
      onClick: () => {},
      validOperation: false,
    };
  }
};

const IsValidOperation = (
  action: ActionsEnum,
  targetAccount?: IAccount
): {
  valid: boolean;
  reason?: string;
} => {
  const { currentAccount } = useAppSelector((state) => state.accountManager);

  if (targetAccount === undefined) {
    return {
      valid: false,
      reason: "This account doesn't exist?",
    };
  }

  if (action === ActionsEnum.noAction) {
    if (targetAccount.role === rolesEnum.TA) {
      return {
        valid: false,
      };
    }
  }

  // conditions that disqualify the action
  if (action === ActionsEnum.createTA) {
    if (targetAccount.role === rolesEnum.TA) {
      return {
        valid: false,
        reason: "This account is already a TA account",
      };
    }
  }

  if (action === ActionsEnum.createProfessor) {
    if (targetAccount.role === rolesEnum.Professor) {
      return {
        valid: false,
        reason: "This account is already a Professor account",
      };
    }
  }

  if (action === ActionsEnum.deleteAccount) {
    if (targetAccount.username === currentAccount?.username) {
      return {
        valid: false,
        reason: "You can't delete your own account",
      };
    }
  }

  return { valid: true };
};
