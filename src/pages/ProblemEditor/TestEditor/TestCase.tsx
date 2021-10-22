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

// input: string;
// expectedOutput: string;
// hint: string;
// visibility: TestCaseVisibility;

export const TestCase = (props: TestCaseProps) => {
  const name = `testCases.${props.index}`;
  return (
    <Card sx={{ minWidth: 275 }} key={props.index}>
      <CardContent>
        <Stack direction="column" spacing={2}>
          <Typography sx={{ fontSize: 14 }}>
            Test Case {props.index + 1}
          </Typography>
          <Field
            title="Input"
            label="Input"
            value={props.testCase.input}
            placeholder="Enter test case input"
            name={`${name}.input`}
            multiline
            required
            onChange={(event: any) => {
              props.setFieldValue(`${name}.input`, event.currentTarget.value);
            }}
            component={FormTextField}
          />
          <Field
            title="Output"
            label="Output"
            value={props.testCase.expectedOutput}
            placeholder="Enter expected output"
            name={`${name}.expectedOutput`}
            multiline
            required
            onChange={(event: any) => {
              props.setFieldValue(
                `${name}.expectedOutput`,
                event.currentTarget.value
              );
            }}
            component={FormTextField}
          />
          <Stack>
            <FormControl component="fieldset">
              <FormLabel component="legend">Visibility</FormLabel>
              <RadioGroup
                name={`${name}.visibility`}
                row
                value={props.testCase.visibility}
                onChange={(event) => {
                  props.setFieldValue(
                    `${name}.visibility`,
                    event.currentTarget.value
                  );
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

            {/* <div id="my-radio-group">Picked</div>
            <div role="group" aria-labelledby="my-radio-group">
              <label>
                <Field
                  type="radio"
                  name={`testCases.${props.index}.visibility`}
                  label="Input and output visible"
                  value={TestCaseVisibility.IO_VISBILE}
                  // component={<Radio />}
                />
                Input and output visible
              </label>
              <label>
                <Field
                  type="radio"
                  name={`testCases.${props.index}.visibility`}
                  label="Input visible, output hidden"
                  value={TestCaseVisibility.I_VISIBLE_O_HIDDEN}
                  // component={<Radio />}
                />
                Input visible, output hidden
              </label>
              <label>
                <Field
                  type="radio"
                  name={`testCases.${props.index}.visibility`}
                  label="Input and output hidden"
                  value={TestCaseVisibility.IO_HIDDEN}
                  // component={<Radio />}
                />
                Input and output hidden
              </label>
            </div> */}
          </Stack>
          <Field
            title="Hint"
            label="Hint"
            value={props.testCase.hint}
            placeholder="Enter hint"
            name={`testCases.${props.index}.hint`}
            multiline
            onChange={(event: any) => {
              props.setFieldValue(`${name}.hint`, event.currentTarget.value);
            }}
            component={FormTextField}
          />
        </Stack>
      </CardContent>
      <CardActions>
        <ConfirmDelete
          title={"Delete test case?"}
          body={`Are you sure you want to delete test case ${props.index + 1}?`}
          onConfirm={props.deleteFn}
        />
      </CardActions>
    </Card>
  );
};
// <div key={index}>
//                        <Field name={`friends.${index}`} />
//                        <button
//                          type="button"
//                          onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
//                        >
//                          -
//                        </button>
//                        <button
//                          type="button"
//                          onClick={() => arrayHelpers.insert(index, '')} // insert an empty string at a position
//                        >
//                          +
//                        </button>
//                      </div>
