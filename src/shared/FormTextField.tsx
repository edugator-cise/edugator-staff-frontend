import * as React from "react";
import { FieldProps } from "formik";
import { TextField, TextFieldProps } from "@mui/material";

//Reference: https://github.com/benawad/react-typescript-material-ui-form/blob/ccd52d94bbc279b25b13cd8e22d581e1396a996d/src/MyField.tsx#L6
export const FormTextField: React.FC<FieldProps & TextFieldProps> = ({
  label,
  placeholder,
  field,
  ...props
}) => {
  return (
    <TextField label={label} placeholder={placeholder} {...field} {...props} />
  );
};
