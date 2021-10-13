import { Checkbox, FormControlLabel, TextField } from "@mui/material";
import { Form, Formik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../app/common/hooks";
import { updateMetadata } from "../ProblemEditorContainer/problemEditorContainerSlice";

interface Props {
  formRef: any;
}

export const MetadataForm = (props: Props) => {
  const dispatch = useDispatch();

  const initialValues = useAppSelector(
    (state) => state.problemEditorContainer.metadata
  );

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
        </Form>
      )}
    </Formik>
  );
};
