import {
  Card,
  CardActions,
  CardContent,
  Typography,
  Stack,
  FormControl,
  FormLabel,
  FormControlLabel,
  RadioGroup,
} from "@mui/material";
import { TestCaseField, TestCaseVisibility } from "./TestCase.utils";
import ConfirmDelete from "../../../shared/ConfirmDelete";
import Radio from "@mui/material/Radio";
import { FormTextField } from "../../../shared/FormTextField";
import { Field } from "formik";

interface TestCaseProps {
  index: number;
  testCase: TestCaseField;
  deleteFn: any;
  setFieldValue: any;
}

export const TestCase = (props: TestCaseProps) => {
  const { index, testCase, deleteFn, setFieldValue } = props;
  const name = `testCases.${props.index}`;
  const inputName = `${name}.input`;
  const outputName = `${name}.expectedOutput`;
  const visibilityName = `${name}.visibility`;
  const displayIndex = index + 1;
  return (
    <Card sx={{ minWidth: 275 }} key={index}>
      <CardContent>
        <Stack direction="column" spacing={2}>
          <Typography sx={{ fontSize: 14 }}>
            Test Case {displayIndex}
          </Typography>
          <Field
            title="Input"
            label="Input"
            value={testCase.input}
            placeholder="Enter test case input"
            name={inputName}
            multiline
            required
            onChange={(event: any) => {
              setFieldValue(inputName, event.currentTarget.value);
            }}
            component={FormTextField}
          />
          <Field
            title="Output"
            label="Output"
            value={testCase.expectedOutput}
            placeholder="Enter expected output"
            name={outputName}
            multiline
            required
            onChange={(event: any) => {
              setFieldValue(outputName, event.currentTarget.value);
            }}
            component={FormTextField}
          />
          {/* https://levelup.gitconnected.com/create-a-controlled-radio-group-in-react-formik-material-ui-and-typescript-7ed314081a0e */}
          <Stack>
            <FormControl component="fieldset">
              <FormLabel component="legend">Visibility</FormLabel>
              <RadioGroup
                name={`${name}.visibility`}
                row
                value={testCase.visibility}
                onChange={(event) => {
                  setFieldValue(visibilityName, event.currentTarget.value);
                }}
              >
                <FormControlLabel
                  value={TestCaseVisibility.IO_VISBILE}
                  control={<Radio />}
                  label="Input and output visible"
                />
                <FormControlLabel
                  value={TestCaseVisibility.I_VISIBLE_O_HIDDEN}
                  control={<Radio />}
                  label="Input visible, output hidden"
                />
                <FormControlLabel
                  value={TestCaseVisibility.IO_HIDDEN}
                  control={<Radio />}
                  label="Input and output hidden"
                />
              </RadioGroup>
            </FormControl>
          </Stack>
          <Field
            title="Hint"
            label="Hint"
            value={testCase.hint}
            placeholder="Enter hint"
            name={`testCases.${index}.hint`}
            multiline
            onChange={(event: any) => {
              setFieldValue(`${name}.hint`, event.currentTarget.value);
            }}
            component={FormTextField}
          />
        </Stack>
      </CardContent>
      <CardActions>
        <ConfirmDelete
          title={"Delete test case?"}
          body={`Are you sure you want to delete test case ${displayIndex}?`}
          onConfirm={deleteFn}
        />
      </CardActions>
    </Card>
  );
};
