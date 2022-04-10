import { useState } from "react";
import { Grid, Paper, Button, Typography } from "@material-ui/core";
import { TextField } from "@material-ui/core";
import { Formik, Form, Field, ErrorMessage, useFormik } from "formik";
import Select from "react-select";
import * as Yup from "yup";


const RegistrationForm = (html) => {
  const paperStyle = { padding: "0 15px 40px 15px", width: 250 };
  const btnStyle = { marginTop: 10 };
  const inputStyle = { borderStyle: "solid", marginBottom: 10, fontSize: 15, paddingLeft: 10, paddingTop: 8, paddingBottom: 8, width: 240, borderRadius: 4, borderWidth: 1, borderColor: 'lightgrey', padding: 4 }
  const labelStyle = {display: 'block', marginBottom: 1}
  const formik = useFormik({
    initialValues: {
      html: html.html,
      contentTitle: "",
      author: "",
      visibility: "public"
    },
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2))
    }
  })

  const options = [
    { value: "public", label: "Public (Open to Students)" },
    { value: "private", label: "Private (Staff Only)" },
  ];

  //const { selectedOption } = this.Select.state;

  return (
    <Grid>
      <Paper elevation={0} style={paperStyle}>
        <Grid align="center">
          <Typography variant="caption">
            Fill out the details of the Learning Content
          </Typography>
        </Grid>
            <form onSubmit={formik.handleSubmit} style={{marginTop: 15}}>
              {/* <TextField label='Name' name="name" fullWidth value={props.values.name}
                    onChange={props.handleChange} /> */}
              <label htmlFor="contentTitle" style={labelStyle}>Content Title</label>
              <input
                as={TextField}
                name="contentTitle"
                label="Content Title"
                fullWidth
                style={inputStyle}
                //error={props.errors.name && props.touched.name}
                helperText={<ErrorMessage name="contentTitle" />}
                required
              />

              {/* <TextField label='Email' name='email' type='Email' fullWidth 
                    {...props.getFieldProps('email')}/> */}

              <label htmlFor="author" style={labelStyle}>Author</label>
              <input
                as={TextField}
                style={inputStyle}
                name="author"
                label="Author"
                fullWidth
                //error={props.errors.email && props.touched.email}
                helperText={<ErrorMessage name="author" />}
                required
              />

            <label htmlFor="visibility" style={labelStyle}>Visibility</label>
              <Select
                //selection
                //placeholder="Select a City"
                //value={selectedOption}
                //onChange={handleChange()}
                options={options}
                
                onChange={selectedOption => formik.setFieldValue("visibility", selectedOption.value)}
                value={options.filter(option => 
                  option.value === formik.values.visibility)
                }
              />

              <Button
                type="submit"
                style={btnStyle}
                variant="contained"
                color="primary" 
              >
                Publish
              </Button>
            </form>
      </Paper>
    </Grid>
  );
};

export default RegistrationForm;
