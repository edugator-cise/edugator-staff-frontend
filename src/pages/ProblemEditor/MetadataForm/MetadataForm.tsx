import { Checkbox, FormControlLabel, TextField } from "@mui/material";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../app/common/hooks";
import { updateMetadata } from "../ProblemEditorContainer/problemEditorContainerSlice";
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

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => {
        dispatch(updateMetadata(values));
      }}
      innerRef={props.formRef}
      //validate={validate}
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
          <FormControlLabel control={<Checkbox />} label="Hidden" />
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
        </Form>
      )}
    </Formik>
  );
};
