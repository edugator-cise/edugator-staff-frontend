import { Box, FormControlLabel, FormGroup, Switch } from "@material-ui/core";
import React from "react";

export const ExampleValidator = () => {
  return (
    <Box mt="auto" ml="auto" mr="auto">
      <FormGroup>
        <FormControlLabel
          control={<Switch color="primary" />}
          label="Validated"
        />
      </FormGroup>
    </Box>
  );
};
