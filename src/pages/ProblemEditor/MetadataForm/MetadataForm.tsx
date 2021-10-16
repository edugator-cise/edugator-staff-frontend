import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Field, FieldProps, Form, Formik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../app/common/hooks";
import {
  MetadataFields,
  updateMetadata,
  validateMetadata,
} from "../ProblemEditorContainer/problemEditorContainerSlice";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker, { DatePickerProps } from "@mui/lab/DatePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";

interface Props {
  formRef: any;
}

interface DatePickerFieldProps extends FieldProps, DatePickerProps {}

export const MetadataForm = (props: Props) => {
  const dispatch = useDispatch();

  const initialValues = useAppSelector(
    (state) => state.problemEditorContainer.metadata
  );

  const dateError: any = {};

  const validate = (values: MetadataFields) => {
    const errors: any = {};
    if (values.title === "") {
      errors.title = "Required";
    }

    if (dateError.message) {
      errors.dueDate = dateError.message;
    }

    dispatch(validateMetadata(Object.entries(errors).length === 0));
    return errors;
  };

  // https://formik.org/docs/api/field
  //https://next.material-ui-pickers.dev/guides/forms
  const IntegratedDatePicker = ({
    field,
    form,
    ...props
  }: DatePickerFieldProps) => {
    return (
      <DatePicker
        onError={(reason, value) => {
          if (reason) {
            dateError.message = "Invalid date";
          } else {
            dateError.message = undefined;
          }
          form.setFieldValue("dueDate", value, true);
        }}
        onChange={(newValue) => {
          form.setFieldValue("dueDate", newValue, false);
        }}
        label="Due date"
        value={field.value}
        renderInput={(params) => (
          <TextField {...params} helperText={dateError.message} />
        )}
      />
    );
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => {
        dispatch(validateMetadata(true));
        dispatch(updateMetadata(values));
      }}
      innerRef={props.formRef}
      validate={validate}
    >
      {({ errors, values, handleChange, handleBlur, touched }) => (
        <Form style={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              flexGrow: 1,
              marginBottom: 5,
            }}
          >
            <TextField
              name="title"
              label="Title"
              value={values.title}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              error={touched.title && Boolean(errors.title)}
              helperText={touched.title && errors.title}
              sx={{ width: "50%" }}
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="hidden"
                  onChange={handleChange}
                  checked={values.hidden}
                />
              }
              sx={{ marginTop: "auto" }}
              label="Hidden"
            />
            <Box sx={{ marginTop: 4 }}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Field component={IntegratedDatePicker} name="dueDate" />
              </LocalizationProvider>
            </Box>
            <Box sx={{ marginTop: 4 }}>
              <FormControl>
                <InputLabel>Language</InputLabel>
                <Select
                  name="language"
                  value={values.language}
                  label="Language"
                  onChange={handleChange}
                  sx={{ minWidth: "5rem" }} // this is to ensure the label is not cut off
                >
                  <MenuItem value="Java">Java</MenuItem>
                  <MenuItem value="C++">C++</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>
        </Form>
      )}
    </Formik>
  );
};
