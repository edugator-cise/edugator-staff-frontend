import {
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../app/common/hooks";
import {
  MetadataFields,
  updateMetadata,
  validateMetadata,
} from "../ProblemEditorContainer/problemEditorContainerSlice";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";

interface Props {
  formRef: any;
}

export const MetadataForm = (props: Props) => {
  const dispatch = useDispatch();

  const initialValues = useAppSelector(
    (state) => state.problemEditorContainer.metadata
  );
  const [dueDate, setDueDate] = useState<Date | null>(initialValues.dueDate);

  const validate = (values: MetadataFields) => {
    const errors: any = {};
    if (!values.title) {
      errors.title = "Required";
    }

    dispatch(validateMetadata(Object.entries(errors).length === 0));

    return errors;
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => {
        if (dueDate) {
          values.dueDate = dueDate;
        }
        dispatch(updateMetadata(values));
      }}
      innerRef={props.formRef}
      validate={validate}
    >
      {({ values, handleChange, handleBlur }) => (
        <Form>
          <TextField
            name="title"
            label="Title"
            value={values.title}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <FormControlLabel
            control={
              <Checkbox
                name="hidden"
                onChange={handleChange}
                checked={values.hidden}
              />
            }
            label="Hidden"
          />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Due date"
              value={dueDate}
              onChange={(newValue) => {
                setDueDate(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          <FormControl>
            <InputLabel>Language</InputLabel>
            <Select
              name="language"
              value={values.language}
              label="Language"
              onChange={handleChange}
            >
              <MenuItem value="Java">Java</MenuItem>
              <MenuItem value="C++">C++</MenuItem>
            </Select>
          </FormControl>
          <pre>{JSON.stringify(values, null, 2)}</pre>
        </Form>
      )}
    </Formik>
  );
};
