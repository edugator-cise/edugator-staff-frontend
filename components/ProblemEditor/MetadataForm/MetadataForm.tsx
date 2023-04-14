import {
  Box,
  Checkbox,
  FormControlLabel,
  FormControl,
  Stack,
  TextField,
  Typography,
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
import { useCheckboxContext } from "components/CheckboxContext";



interface Props {
  formRef: any;
}

interface Errors {
  title?: string;
  dueDate?: string;
  languages?: string;
}

interface DateError {
  message?: string;
}

interface DatePickerFieldProps extends FieldProps, DatePickerProps {}

export const MetadataForm = (props: Props) => {
  const dispatch = useDispatch();
  const { languages, setLanguages } = useCheckboxContext();

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

    const selectedLanguages = values.languages.filter((lang) => lang.selected);

    if (selectedLanguages.length == 0) {
      errors.languages = "At least one language must be selected";
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
      {({ errors, values, handleChange, handleBlur, touched, setFieldValue }) => (
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
            

            
            <Box>
              
            <Typography variant="body1" color="textSecondary" sx={{ marginLeft: 1 }}>
              Select programming languages:
            </Typography>
            
            <br/>

            <FormControlLabel
              control={
                <Checkbox
                  name="cpp"
                  onChange={(e) => {
                    const updatedLanguages = values.languages.map((lang) => {
                      if (lang.language === "cpp") {
                        return {
                          ...lang,
                          selected: e.target.checked,
                        };
                      }
                      return lang;
                    });
                    setLanguages(updatedLanguages);
                    setFieldValue("languages", updatedLanguages);

                  }}
                  checked={values.languages.find((lang) => lang.language === "cpp")?.selected}
                />
              }
              sx={{ marginLeft: 0 }}
              label="C++"
            />

            <FormControlLabel
              control={
                <Checkbox
                  name="py"
                  onChange={(e) => {
                    handleChange(e);
                    const updatedLanguages = values.languages.map((lang) => {
                      if (lang.language === "py") {
                        return {
                          ...lang,
                          selected: e.target.checked,
                        };
                      }
                      return lang;
                    });
                    setLanguages(updatedLanguages);
                    setFieldValue("languages", updatedLanguages);
                  }}
                  checked={values.languages.find((lang) => lang.language === "py")?.selected}
                />
              }
              label="Python"
            />

            <FormControlLabel
              control={
                <Checkbox
                  name="java"
                  onChange={(e) => {
                    handleChange(e);
                    const updatedLanguages = values.languages.map((lang) => {
                      if (lang.language === "java") {
                        return {
                          ...lang,
                          selected: e.target.checked,
                        };
                      }
                      return lang;
                    });
                    setLanguages(updatedLanguages);
                    setFieldValue("languages", updatedLanguages);
                  }}
                  checked={values.languages.find((lang) => lang.language === "java")?.selected}
                />
              }
              label="Java"
            />
            {errors.languages && (
              <Typography variant="body2" color="error" sx={{ marginLeft: 1 }}>
                {errors.languages}
              </Typography>
            )}


            </Box>
            
          </Stack>
        </Form>
      )}
    </Formik >
  );
};
