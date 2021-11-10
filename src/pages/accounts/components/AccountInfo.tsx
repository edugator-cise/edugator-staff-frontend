import React from "react";
import {
  Stack,
  Icon,
  ButtonBase,
  IconButton,
  Typography,
  ButtonBaseProps,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { /*useAppDispatch,*/ useAppSelector } from "../../../app/common/hooks";
import { IAccount } from "../types";

const ContactItem = styled(ButtonBase)<ButtonBaseProps>(({ theme }) => ({
  padding: theme.spacing(1),
  paddingLeft: theme.spacing(2),
  marginRight: theme.spacing(2),
  borderRadius: "4px",
  border: `1px solid ${theme.palette.grey[500]}`,
}));

export function AccountInfo() {
  //const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.accountManager);

  // under the assumption that account always exists in this component
  const account = state.selectedAccount as IAccount;

  return (
    <>
      <Typography variant="button" fontSize="h6.fontSize">
        Contact Information
      </Typography>
      <Stack direction="row">
        <ContactInfo icon="email">{account?.username}</ContactInfo>
        {
          // always displaying a phone for demonstration purposes
          (account?.phone || true) && (
            <ContactInfo icon="phone">{account?.phone}</ContactInfo>
          )
        }
      </Stack>
    </>
  );
}

interface ContactItemProps extends ButtonBaseProps<"div"> {
  icon: string;
}

const ContactInfo: React.FC<ContactItemProps> = ({ icon, children }) => {
  const onClick = (e: any) => {
    e.stopPropagation();
    e.preventDefault();
  };
  return (
    <ContactItem>
      <Icon sx={{ mr: 2 }}>{icon}</Icon>

      <Typography fontSize="default">{children}</Typography>

      <IconButton sx={{ ml: 2 }} onClick={onClick} component="span">
        <Icon>content_copy</Icon>
      </IconButton>
    </ContactItem>
  );
};
