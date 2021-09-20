import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Button, Typography, Accordion, AccordionDetails, AccordionSummary } from '@material-ui/core';
import { ExpandMore, Edit, AssignmentTurnedIn } from '@material-ui/icons';
import { IModule } from './types';
import NewModuleDialog from "./NewModule";
import ModuleOptions from "./ModuleOptions"
import { LayoutContainer } from '../../shared/LayoutContainer';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: theme.spacing(1),
    },
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
  const [modules, setModules] = React.useState<IModule[]>([]); // temporary place for module information

  const [newModuleDialog, setNewModuleDialog] = React.useState(false);

  const handleDialogClose = () => {
    setNewModuleDialog(false);
  };

  const handleNewModule = (nameInput: string) => {
    setNewModuleDialog(false);
    let newModule: IModule = {
      name: nameInput,
      number: 0,
      problemList: [],
    }
    setModules(modules.concat(newModule))
  }

  const classes = useStyles();

  const moduleButtons = [
    { label: "Add Module", onClick: () => { setNewModuleDialog(true) } }
  ]

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

        {modules ?
          modules.map(
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
                    <ModuleOptions />
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

            }) : <h1>Add some modules to get started. It doesn't show?</h1>
        }
      </div>
    </LayoutContainer>

  );
}
