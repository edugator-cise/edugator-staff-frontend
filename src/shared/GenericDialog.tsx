import React from "react";
import {
  Paper,
  Button,
  Dialog,
  Divider,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { ButtonProps, ButtonColor, ButtonVariant } from "./LayoutContainer";
import { Breakpoint } from "@mui/system";

const Footer = styled("div")(({ theme }) => ({
  float: "right",
  marginRight: theme.spacing(1),
}));

const FooterButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(1),
}));

interface GenericDialogProps {
  title: string | JSX.Element;
  open: boolean;
  fullWidth?: boolean;
  maxWidth: Breakpoint; // decent for now
  footerContent: ButtonProps[];
  handleClose: () => void;
  children: JSX.Element;
}

export default function GenericDialog(props: GenericDialogProps) {
  const {
    open,
    title,
    maxWidth,
    fullWidth,
    footerContent,
    handleClose,
    children,
  } = props;

  const footerButtons = footerContent.map((button) => (
    <FooterButton
      onClick={button.onClick}
      key={button.label}
      variant={button.variant as ButtonVariant}
      color={button.color as ButtonColor}
    >
      {button.label}
    </FooterButton>
  ));

  return (
    <Dialog
      onClose={handleClose}
      open={open}
      maxWidth={maxWidth}
      fullWidth={fullWidth}
    >
      <Paper elevation={3}>
        <DialogTitle>{title}</DialogTitle>

        <Divider />

        <DialogContent>{children}</DialogContent>

        <Footer>{footerButtons}</Footer>
      </Paper>
    </Dialog>
  );
}
