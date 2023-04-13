import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  Select,
  Stack,
  TextField,
  MenuItem,
} from "@mui/material";
import { Field, FieldProps, Form, Formik } from "formik";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  MetadataFields,
  updateMetadata,
  validateMetadata,
} from "components/ProblemEditor/problemEditorContainerSlice";
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
      {({
        errors,
        values,
        handleChange,
        handleBlur,
        touched,
        setFieldValue,
      }) => (
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
            <TextField
              name="author"
              label="Author"
              value={values.author}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.author && Boolean(errors.author)}
              helperText={touched.author && errors.author}
              sx={{ width: "50%" }}
            />

            <FormControl fullWidth sx={{ width: "25%" }}>
              <InputLabel id="difficulty-label">Difficulty</InputLabel>
              <Select
                labelId="difficulty-label"
                id="difficulty-select"
                value={values.difficulty}
                label="Difficulty"
                onChange={(e) =>
                  setFieldValue("difficulty", e.target.value, false)
                }
              >
                <MenuItem value="Easy (15-29 minutes)">
                  Easy (15-29 minutes)
                </MenuItem>
                <MenuItem value="Medium (30-44 minutes)">
                  Medium (30-44 minutes)
                </MenuItem>
                <MenuItem value="Hard (44-120 minutes)">
                  Hard (44-120 minutes)
                </MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </Form>
      )}
    </Formik>
  );
};
