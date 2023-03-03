import {
  Box,
  Checkbox,
  FormControlLabel,
  Stack,
  TextField,
} from "@mui/material";
import { Field, FieldProps, Form, Formik } from "formik";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  MetadataFields,
  updateMetadata,
  validateMetadata,
} from "state/problemEditorContainerSlice";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker, { DatePickerProps } from "@mui/lab/DatePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { RootState } from "lib/store/store";

interface Props {
  formRef: any;
}

interface Errors {
  title?: string;
  dueDate?: string;
}

interface DateError {
  message?: string;
}

interface DatePickerFieldProps extends FieldProps, DatePickerProps {}

export const MetadataForm = (props: Props) => {
  const dispatch = useDispatch();

  const initialValues = useSelector(
    (state: RootState) => state.problemEditorContainer.metadata
  );
  const dateError: DateError = {};

  const validate = (values: MetadataFields) => {
    const errors: Errors = {};
    if (values.title === "") {
      errors.title = "Required";
    } else if (values.title.trim() === "") {
      errors.title = "Title must contain non-whitespace characters";
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
        dispatch(updateMetadata(values));
      }}
      innerRef={props.formRef}
      validate={validate}
    >
      {({ errors, values, handleChange, handleBlur, touched }) => (
        <Form style={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
          <Stack spacing={5}>
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
            <Box>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Field component={IntegratedDatePicker} name="dueDate" />
              </LocalizationProvider>
            </Box>
          </Stack>
        </Form>
      )}
    </Formik>
  );
};
