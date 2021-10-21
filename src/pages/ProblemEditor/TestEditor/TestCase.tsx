import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";

interface TestCaseProps {
  index: number;
}

export const TestCase = (props: TestCaseProps) => {
  return (
    <Card sx={{ minWidth: 275 }} key={props.index}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }}>
          Test Case {props.index + 1}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
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
