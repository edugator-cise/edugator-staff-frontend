import { Box, FormControlLabel, FormGroup, Switch } from "@material-ui/core";
import React from "react";

interface Props {
  handleValidation: (isValid: boolean) => void;
  validationStatus: () => boolean;
}

export const ExampleValidator = ({
  handleValidation,
  validationStatus,
}: Props) => {
  return (
    <Box mt="auto" ml="auto" mr="auto">
      <FormGroup>
        <FormControlLabel
          control={
            <Switch
              color="primary"
              onChange={(event) => handleValidation(event.target.checked)}
              checked={validationStatus()}
            />
          }
          label="Validated"
        />
      </FormGroup>
    </Box>
  );
};
