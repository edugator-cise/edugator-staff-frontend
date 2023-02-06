import React from "react";
import {
  Icon,
  Grid,
  IconButton,
  Typography,
  ButtonBaseProps,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "lib/store/store";
import toast from "react-hot-toast";

const ContactItem = styled(Typography)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(1),
  paddingLeft: theme.spacing(2),
  marginRight: theme.spacing(2),
  marginBottom: theme.spacing(1),
  borderRadius: theme.spacing(0.5),
  border: `1px solid ${theme.palette.grey[500]}`,
}));

export function AccountInfo() {
  const state = useSelector((state: RootState) => state.accountManager);

  const account = state.selectedAccount;

  return (
    <>
      <Typography variant="button" fontSize="h6.fontSize">
        Contact Information
      </Typography>
      <Grid container direction="row">
        <ContactInfo icon="email">{account?.username}</ContactInfo>

        {account?.phone && (
          <ContactInfo icon="phone">{account?.phone}</ContactInfo>
        )}
      </Grid>
    </>
  );
}

interface ContactItemProps extends ButtonBaseProps<"div"> {
  icon: string;
}

const ContactInfo: React.FC<ContactItemProps> = ({ icon, children }) => {
  const dispatch = useDispatch();

  const onCopy = (e: any) => {
    e.stopPropagation();
    e.preventDefault();

    // to copy information to clipboard
    navigator.clipboard.writeText(children as string);

    const capitalized_content = icon.charAt(0).toUpperCase() + icon.slice(1);

    toast.success(`${capitalized_content} copied to the clipboard`);
  };

  return (
    <ContactItem>
      <Icon sx={{ mr: 2 }}>{icon}</Icon>

      <Typography fontSize="default" component="span">
        {children}
      </Typography>

      <IconButton sx={{ ml: 2 }} onClick={onCopy} component="span">
        <Icon>content_copy</Icon>
      </IconButton>
    </ContactItem>
  );
};
