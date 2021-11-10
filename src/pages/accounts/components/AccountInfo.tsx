import React from "react";
import {
  Icon,
  Grid,
  IconButton,
  Typography,
  ButtonBaseProps,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { /*useAppDispatch,*/ useAppSelector } from "../../../app/common/hooks";

const ContactItem = styled(Typography)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(1),
  paddingLeft: theme.spacing(2),
  marginRight: theme.spacing(2),
  marginBottom: theme.spacing(1),
  borderRadius: "4px",
  border: `1px solid ${theme.palette.grey[500]}`,
}));

export function AccountInfo() {
  //const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.accountManager);

  const account = state.selectedAccount;

  return (
    <>
      <Typography variant="button" fontSize="h6.fontSize">
        Contact Information
      </Typography>
      <Grid container direction="row">
        <ContactInfo icon="email">{account?.username}</ContactInfo>
        {
          // always displaying a phone for demonstration purposes
          (account?.phone || true) && (
            <ContactInfo icon="phone">{account?.phone}</ContactInfo>
          )
        }
      </Grid>
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

      <Typography fontSize="default" component="span">
        {children ?? "undefined"}
      </Typography>

      <IconButton sx={{ ml: 2 }} onClick={onClick} component="span">
        <Icon>content_copy</Icon>
      </IconButton>
    </ContactItem>
  );
};
