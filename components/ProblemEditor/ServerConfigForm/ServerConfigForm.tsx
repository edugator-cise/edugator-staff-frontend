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
  language?: string,
  timeLimit?: string,
  memoryLimit?: string,
  buildCommand?: string
}

export const ServerConfigForm = (props: Props) => {
  const dispatch = useDispatch();
  const { languages } = useCheckboxContext();

  const initialValues = useSelector(
    (state: RootState) => state.problemEditorContainer.serverConfig
  );
  
  const cpp = languages.find((lang) => lang.language === "cpp")?.selected;
  const py = languages.find((lang) => lang.language === "py")?.selected;
  const java = languages.find((lang) => lang.language === "java")?.selected;

  const validate = (values: ServerConfigFields) => {
    const errors: ServerConfigErrors[] = [];

    values.config.forEach(element => {
      const time =  element.timeLimit.toString().match(/^[0-9]+$/);
      const memory = element.memoryLimit.toString().match(/^[0-9]+$/);

      if (time == null || memory == null) {
        errors.push({
          language: element.language,
          timeLimit: (time == null) ? "Must contain digits only" : "",
          memoryLimit: (memory == null) ? "Must contain digits only" : "",
          buildCommand: ""
        });  
      }
    });
    
    console.log(errors)
    dispatch(validateServerConfig(Object.entries(errors).length == 0));

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
                name="config[0].timeLimit"
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
                value={values.config.find(lang => lang.language === "cpp")?.timeLimit}
                error={touched.config && Boolean(errors.config)}
                helperText={touched.config && errors.config}
                sx={{ width: "25%" }}
              />
              <TextField
                id="memory-limit"
                name="config[0].memoryLimit"
                label="Memory limit"
                inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">KB</InputAdornment>
                  ),
                }}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.config.find(lang => lang.language === "cpp")?.memoryLimit}
                error={touched.config && Boolean(errors.config)}
                helperText={touched.config && errors.config}
                sx={{ width: "25%" }}
              />
              <TextField
                id="build-command"
                name="config[0].buildCommand"
                label="Build command"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.config.find(lang => lang.language === "cpp")?.buildCommand}
                error={touched.config && Boolean(errors.config)}
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
                name="config[1].timeLimit"
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
                value={values.config.find(lang => lang.language === "py")?.timeLimit}
                error={touched.config && Boolean(errors.config)}
                helperText={touched.config && errors.config}
                sx={{ width: "25%" }}
              />
              <TextField
                id="memory-limit"
                name="config[1].memoryLimit"
                label="Memory limit"
                inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">KB</InputAdornment>
                  ),
                }}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.config.find(lang => lang.language === "py")?.memoryLimit}
                error={touched.config && Boolean(errors.config)}
                helperText={touched.config && errors.config}
                sx={{ width: "25%" }}
              />
              <TextField
                id="build-command"
                name="config[1].buildCommand"
                label="Build command"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.config.find(lang => lang.language === "py")?.buildCommand}
                error={touched.config && Boolean(errors.config)}
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
                name="config[2].timeLimit"
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
                value={values.config.find(lang => lang.language === "java")?.timeLimit}
                error={touched.config && Boolean(errors.config)}
                helperText={touched.config && errors.config}
                sx={{ width: "25%" }}
              />
              <TextField
                id="memory-limit"
                name="config[2].memoryLimit"
                label="Memory limit"
                inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">KB</InputAdornment>
                  ),
                }}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.config.find(lang => lang.language === "java")?.memoryLimit}
                error={touched.config && Boolean(errors.config)}
                helperText={touched.config && errors.config}
                sx={{ width: "25%" }}
              />
              <TextField
                id="build-command"
                name="config[2].buildCommand"
                label="Build command"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.config.find(lang => lang.language === "java")?.buildCommand}
                error={touched.config && Boolean(errors.config)}
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
