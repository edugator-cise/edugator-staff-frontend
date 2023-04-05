import { InputAdornment, Stack, TextField, Accordion, AccordionSummary, AccordionDetails, Typography } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Form, Formik } from "formik";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ServerConfigFields,
  updateServerConfig,
  validateServerConfig,
} from "components/ProblemEditor/problemEditorContainerSlice";
import { RootState } from "lib/store/store";
import { useCheckboxContext } from "components/CheckboxContext";


interface Props {
  formRef: any;
}

interface ServerConfigErrors {
  cppBuildCommand?: string;
  cppTimeLimit?: string;
  cppMemoryLimit?: string;
  pyBuildCommand?: string;
  pyTimeLimit?: string;
  pyMemoryLimit?: string;
  javaBuildCommand?: string;
  javaTimeLimit?: string;
  javaMemoryLimit?: string;
}

export const ServerConfigForm = (props: Props) => {
  const dispatch = useDispatch();
  const { cpp, py, java } = useCheckboxContext();

  const initialValues = useSelector(
    (state: RootState) => state.problemEditorContainer.serverConfig
  );

  const validate = (values: ServerConfigFields) => {
    const errors: ServerConfigErrors = {};
    if (!values.cppMemoryLimit.toString().match(/^[0-9]+$/)) {
      errors.cppMemoryLimit = "Must contain digits only";
    }
    if (!values.cppTimeLimit.toString().match(/^[0-9]+$/)) {
      errors.cppTimeLimit = "Must contain digits only";
    }
    if (!values.pyMemoryLimit.toString().match(/^[0-9]+$/)) {
      errors.pyMemoryLimit = "Must contain digits only";
    }
    if (!values.pyTimeLimit.toString().match(/^[0-9]+$/)) {
      errors.pyTimeLimit = "Must contain digits only";
    }
    if (!values.javaMemoryLimit.toString().match(/^[0-9]+$/)) {
      errors.javaMemoryLimit = "Must contain digits only";
    }
    if (!values.javaTimeLimit.toString().match(/^[0-9]+$/)) {
      errors.javaTimeLimit = "Must contain digits only";
    }

    dispatch(validateServerConfig(Object.entries(errors).length === 0));

    return errors;
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => {
        dispatch(updateServerConfig(values));
      }}
      innerRef={props.formRef}
      validate={validate}
    >
      {({ errors, values, handleChange, handleBlur, touched }) => (
        <Form style={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
          {cpp && (
            <Accordion defaultExpanded={true}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>C++ Settings</Typography>
            </AccordionSummary>
            <AccordionDetails>
            <br/>
            <Stack spacing={5}>
              <TextField
                id="time-limit"
                name="cppTimeLimit"
                label="Time limit"
                inputProps={{
                  inputMode: "numeric",
                  pattern: "[0-9]*",
                }}
                InputProps={{
                  endAdornment: <InputAdornment position="end">s</InputAdornment>,
                }}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.cppTimeLimit}
                error={touched.cppTimeLimit && Boolean(errors.cppTimeLimit)}
                helperText={touched.cppTimeLimit && errors.cppTimeLimit}
                sx={{ width: "25%" }}
              />
              <TextField
                id="memory-limit"
                name="cppMemoryLimit"
                label="Memory limit"
                inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">KB</InputAdornment>
                  ),
                }}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.cppMemoryLimit}
                error={touched.cppMemoryLimit && Boolean(errors.cppMemoryLimit)}
                helperText={touched.cppMemoryLimit && errors.cppMemoryLimit}
                sx={{ width: "25%" }}
              />
              <TextField
                id="build-command"
                name="cppBuildCommand"
                label="Build command"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.cppBuildCommand}
                error={touched.cppBuildCommand && Boolean(errors.cppBuildCommand)}
                helperText="Add compiler flags here e.g. '-Wall'"
              />
            </Stack>
            </AccordionDetails>
            </Accordion>
          )}
          {py && (
            <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Python Settings</Typography>
            </AccordionSummary>
            <AccordionDetails>
            <br/>
            <Stack spacing={5}>
              <TextField
                id="time-limit"
                name="pyTimeLimit"
                label="Time limit"
                inputProps={{
                  inputMode: "numeric",
                  pattern: "[0-9]*",
                }}
                InputProps={{
                  endAdornment: <InputAdornment position="end">s</InputAdornment>,
                }}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.pyTimeLimit}
                error={touched.pyTimeLimit && Boolean(errors.pyTimeLimit)}
                helperText={touched.pyTimeLimit && errors.pyTimeLimit}
                sx={{ width: "25%" }}
              />
              <TextField
                id="memory-limit"
                name="pyMemoryLimit"
                label="Memory limit"
                inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">KB</InputAdornment>
                  ),
                }}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.pyMemoryLimit}
                error={touched.pyMemoryLimit && Boolean(errors.pyMemoryLimit)}
                helperText={touched.pyMemoryLimit && errors.pyMemoryLimit}
                sx={{ width: "25%" }}
              />
              <TextField
                id="build-command"
                name="pyBuildCommand"
                label="Build command"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.pyBuildCommand}
                error={touched.pyBuildCommand && Boolean(errors.pyBuildCommand)}
                helperText="Add compiler flags here e.g. '-Wall'"
              />
            </Stack>
            </AccordionDetails>
            </Accordion>
          )}
          {java && (
            <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Java Settings</Typography>
            </AccordionSummary>
            <AccordionDetails>
            <br/>
            <Stack spacing={5}>
              <TextField
                id="time-limit"
                name="javaTimeLimit"
                label="Time limit"
                inputProps={{
                  inputMode: "numeric",
                  pattern: "[0-9]*",
                }}
                InputProps={{
                  endAdornment: <InputAdornment position="end">s</InputAdornment>,
                }}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.javaTimeLimit}
                error={touched.javaTimeLimit && Boolean(errors.javaTimeLimit)}
                helperText={touched.javaTimeLimit && errors.javaTimeLimit}
                sx={{ width: "25%" }}
              />
              <TextField
                id="memory-limit"
                name="javaMemoryLimit"
                label="Memory limit"
                inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">KB</InputAdornment>
                  ),
                }}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.javaMemoryLimit}
                error={touched.javaMemoryLimit && Boolean(errors.javaMemoryLimit)}
                helperText={touched.javaMemoryLimit && errors.javaMemoryLimit}
                sx={{ width: "25%" }}
              />
              <TextField
                id="build-command"
                name="javaBuildCommand"
                label="Build command"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.javaBuildCommand}
                error={touched.javaBuildCommand && Boolean(errors.javaBuildCommand)}
                helperText="Add compiler flags here e.g. '-Wall'"
              />
            </Stack>
            </AccordionDetails>
            </Accordion>
          )}
        </Form>
      )}
    </Formik>
  );
};
