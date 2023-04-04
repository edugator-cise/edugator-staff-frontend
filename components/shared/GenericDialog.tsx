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
import { ButtonProps, ButtonColor, ButtonVariant } from "components/AdminLayout";
import { Breakpoint } from "@mui/system";

interface DialogButtonProps extends ButtonProps {
  disabled?: boolean;
}

const PaddedPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1),
}));

const Footer = styled("div")({
  float: "right",
});

const FooterButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(1),
}));

interface GenericDialogProps {
  title: string | JSX.Element;
  open: boolean;
  fullWidth?: boolean;
  maxWidth: Breakpoint; // decent for now
  footerContent: DialogButtonProps[];
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
      disabled={button.disabled}
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
      <PaddedPaper elevation={3}>
        <DialogTitle>{title}</DialogTitle>

        <Divider />

        <DialogContent>{children}</DialogContent>

        <Footer>{footerButtons}</Footer>
      </PaddedPaper>
    </Dialog>
  );
}
