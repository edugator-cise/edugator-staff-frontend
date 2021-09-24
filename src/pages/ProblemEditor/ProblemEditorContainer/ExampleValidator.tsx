import { Box, FormControlLabel, FormGroup, Switch } from "@material-ui/core";
import React from "react";

export const ExampleValidator = ({ handleValidation }: any) => {
  return (
    <Box mt="auto" ml="auto" mr="auto">
      <FormGroup>
        <FormControlLabel
          control={
            <Switch
              color="primary"
              onChange={(event) => handleValidation(event.target.checked)}
            />
          }
          label="Validated"
        />
      </FormGroup>
    </Box>
  );
};
