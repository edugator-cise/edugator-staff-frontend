import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Button, Typography, Accordion, AccordionDetails, AccordionSummary } from '@material-ui/core';
import { ExpandMore, Edit, AssignmentTurnedIn } from '@material-ui/icons';
import { NewModuleDialog, ModuleMenu, /*ProblemButtons*/ } from "./components";
import { LayoutContainer } from '../../shared/LayoutContainer';
import { useAppDispatch, useAppSelector } from '../../app/common/hooks';
import { requestModules, requestNewModule } from './ModulesPage.slice';



const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    summary: {
      backgroundColor: 'rgba(0, 0, 0, .1)',           // background of module
      borderBottom: '1px solid rgba(0, 0, 0, .125)',  // bottom line of module
    },
    details: {
      padding: theme.spacing(1),
      paddingLeft: theme.spacing(2),
      backgroundColor: 'rgba(0, 0, 0, .02)',
      borderBottom: '1px solid rgba(0, 0, 0, .125)',
    },
    text: {
      marginTop: "auto",
      marginBottom: "auto",
    },
    buttons: {
      marginLeft: "auto",
    },
    button: {
      marginRight: theme.spacing(1),
    },
  }),
);

export default function Modules() {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const modulesState = useAppSelector((state) => state.modules);

  const [newModuleDialog, setNewModuleDialog] = React.useState(false);
  const handleDialogClose = () => {
    setNewModuleDialog(false);
  };
  const handleNewModule = (nameInput: string) => {
    setNewModuleDialog(false);
    dispatch(requestNewModule({ moduleName: nameInput, moduleNum: 0 }))
  }

  const moduleButtons = [
    { label: "Add Module", onClick: () => { setNewModuleDialog(true) } }
  ]
  console.log("before dispatch get modules")
  dispatch(requestModules())

  return (

    <LayoutContainer
      pageTitle={"Modules"}
      actionButtons={moduleButtons}
    >
      <div>
        <NewModuleDialog
          open={newModuleDialog}
          handleSubmit={handleNewModule}
          handleClose={handleDialogClose}
        />

        {/* Loop here for each module */}

        {(modulesState.modules.length > 0) ?
          modulesState.modules.map(
            (module, i) => {
              return (
                <Accordion>

                  <AccordionSummary
                    expandIcon={<ExpandMore />}
                    className={classes.summary}
                  >
                    <Typography variant="h6">
                      Module {i}: {module.name}
                    </Typography>
                    <ModuleMenu />
                  </AccordionSummary>



                  {/* Loop here for each problem */}

                  {[0, 1].map((value) => (
                    <AccordionDetails
                      className={classes.details}
                    >
                      <Typography
                        className={classes.text}
                      >
                        Problem {value}
                      </Typography>

                      <span className={classes.buttons}>
                        {
                          /*
                           <ProblemButtons
                          open={newModuleDialog}
                          handleSubmit={handleNewModule}
                          handleClose={handleDialogClose}
                          />
                          */
                        }

                        <Button
                          //variant="contained"
                          color="default"
                          className={classes.button}
                          startIcon={<AssignmentTurnedIn />}
                          size="small"
                        >
                          Grade
                        </Button>

                        <Button
                          //variant="contained"
                          color="default"
                          className={classes.button}
                          startIcon={<Edit />}
                          size="small"
                        >
                          Edit
                        </Button>
                      </span>

                    </AccordionDetails>
                  ))}

                </Accordion>
              )

            }) : <Typography variant="h6"> Click Add Modules to get started </Typography>
        }
      </div>
    </LayoutContainer>

  );
}
