import {
  Button,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  ExpandMore,
  Add,
  Edit,
  AssignmentTurnedIn,
  ArrowUpward,
  ArrowDownward,
} from "@mui/icons-material";
import { Routes } from "constants/navigationRoutes";
import { IProblemBase } from "lib/shared/types";
import { IAdminModule } from "components/Modules/types";
import { ModuleMenu } from "components/Modules/ModuleMenu";
import { BookOpen, Code } from "phosphor-react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "lib/store/store";
import apiClient from "lib/api/apiClient";
import { apiRoutes } from "constants/apiRoutes";
import toast from "react-hot-toast";
import { changeProblemOrderSuccess } from "../../state/ModulesSlice";

const Module = styled(Accordion)(({ theme }) => ({
  position: "inherit",
  borderRadius: theme.spacing(0.5),
  "& .Mui-expanded": {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
}));

const ModuleTitle = styled(AccordionSummary)({
  borderRadius: "inherit",
});

const ModuleContent = styled(AccordionDetails)(({ theme }) => ({
  display: "flex",
  padding: theme.spacing(1),
  paddingLeft: theme.spacing(2),
}));

const Title = styled(Typography)(({ theme }) => ({
  marginTop: "auto",
  marginBottom: "auto",
  padding: theme.spacing(0.5),
}));

const NewProblemButton = styled(Button)(({ theme }) => ({
  marginLeft: "auto",
  marginRight: "none",
  color: "black",
  backgroundColor: theme.palette.primary.light,
  "&:hover": {
    backgroundColor: theme.palette.primary.main,
  },
}));

const NewContentButton = styled(Button)(({ theme }) => ({
  marginLeft: 10,
  marginRight: 10,
  color: "black",
  backgroundColor: theme.palette.primary.light,
  "&:hover": {
    backgroundColor: theme.palette.primary.main,
  },
}));

const ButtonContainer = styled("div")({
  marginLeft: "auto",
});

const ProblemAction = styled(Button)(({ theme }) => ({
  marginRight: theme.spacing(2),
  color: "black",
  "&:hover": {
    backgroundColor: theme.palette.primary.light,
  },
}));

const ProblemIcon = styled(IconButton)(({ theme }) => ({
  marginRight: theme.spacing(2),
  "&:hover": {
    backgroundColor: theme.palette.primary.light,
  },
}));

const moveProblem = async (
  problemId: string,
  moduleId: string,
  direction: string,
  dispatch: any
) => {
  try {
    const { data }: { data: IProblemBase } = await apiClient.post(
      apiRoutes.admin.changeProblemOrder,
      { moduleId, problemId, direction }
    );

    dispatch(
      changeProblemOrderSuccess({
        moduleId: String(moduleId),
        problemId: String(problemId),
        direction: direction,
      })
    );
    toast.success("Problem was moved successfully");
  } catch (e) {
    toast.error("Error moving problem");
  }
};

interface moduleProps {
  setModuleToDelete: (module: IAdminModule) => void;
  setProblemToGrade: (problem: IProblemBase) => void;
}

export function ModuleAccordian({
  setModuleToDelete,
  setProblemToGrade,
}: moduleProps) {
  const dispatch = useDispatch();

  const router = useRouter();
  const modulesState = useSelector((state: RootState) => state.modules.modules);
  return (
    <>
      {modulesState.length > 0 ? (
        <>
          {modulesState.map((module, index) => {
            return (
              <Module key={`${module._id}-module-${index}`} disableGutters>
                <ModuleTitle expandIcon={<ExpandMore />}>
                  <ModuleMenu
                    module={module}
                    setModuleToDelete={setModuleToDelete}
                  />

                  <Title variant="h6">
                    Module {module.number}: {module.name}
                  </Title>

                  <NewProblemButton
                    startIcon={<Add />}
                    variant="outlined"
                    onClick={(event) => {
                      event.stopPropagation();
                      router.push({
                        pathname:
                          Routes.ProblemCreatorBaseWithoutId + module._id,
                        query: {
                          moduleName: module.name,
                        },
                      });
                    }}
                  >
                    Add Problem
                  </NewProblemButton>

                  <NewContentButton
                    startIcon={<Add />}
                    variant="outlined"
                    onClick={(event) => {
                      event.stopPropagation();
                      router.push({
                        pathname:
                          Routes.ContentCreatorBaseWithoutId + module._id,
                        query: {
                          moduleName: module.name,
                        },
                      });
                    }}
                  >
                    Add Content
                  </NewContentButton>
                </ModuleTitle>

                {module.problems.length > 0 || module.lessons.length > 0 ? (
                  <>
                    {module.problems.length > 0 ? (
                      <>
                        <ModuleContent
                          sx={{
                            backgroundColor: "#f5f5f5",
                            alignItems: "center",
                          }}
                        >
                          <Code
                            weight="duotone"
                            size={18}
                            //dark grey
                            color={"#4f4f4f"}
                            style={{
                              marginRight: "5px",
                            }}
                          />
                          <Title>
                            <b>Problems</b>
                          </Title>
                        </ModuleContent>
                        {module.problems.map((problem, i) => (
                          <ModuleContent key={i}>
                            <Title>
                              <b>
                                Problem {module.number}.{i + 1}:
                              </b>
                              {` ${problem.title}`}
                            </Title>
                            <ButtonContainer>
                              <ProblemIcon
                                onClick={() => {
                                  moveProblem(
                                    problem._id!,
                                    module._id!,
                                    "up",
                                    dispatch
                                  );
                                }}
                              >
                                <ArrowUpward />
                              </ProblemIcon>
                              <ProblemIcon
                                onClick={() => {
                                  moveProblem(
                                    problem._id!,
                                    module._id!,
                                    "down",
                                    dispatch
                                  );
                                }}
                              >
                                <ArrowDownward />
                              </ProblemIcon>
                              <ProblemAction
                                startIcon={<AssignmentTurnedIn />}
                                size="small"
                                variant="outlined"
                                onClick={() => {
                                  const toGrade: IProblemBase = {
                                    _id: problem._id,
                                    title: problem.title,
                                  };
                                  setProblemToGrade(toGrade);
                                }}
                              >
                                Grade
                              </ProblemAction>
                              <ProblemAction
                                startIcon={<Edit />}
                                size="small"
                                variant="outlined"
                                onClick={() => {
                                  router.push({
                                    pathname:
                                      Routes.ProblemEditorBaseWithoutId +
                                      problem._id,
                                    query: {
                                      moduleName: module.name,
                                      moduleId: module._id,
                                    },
                                  });
                                }}
                              >
                                Edit
                              </ProblemAction>
                            </ButtonContainer>
                          </ModuleContent>
                        ))}
                      </>
                    ) : null}
                    {module.lessons.length > 0 ? (
                      <>
                        <ModuleContent
                          sx={{
                            backgroundColor: "#f5f5f5",
                            alignItems: "center",
                          }}
                        >
                          <BookOpen
                            weight="duotone"
                            size={18}
                            //dark grey
                            color={"#4f4f4f"}
                            style={{
                              marginRight: "5px",
                            }}
                          />
                          <Title>
                            <b>Lessons</b>
                          </Title>
                        </ModuleContent>
                        {module.lessons.map((lesson, i) => (
                          <ModuleContent key={i}>
                            <Title>
                              <b>
                                Lesson {module.number}.{i + 1}:
                              </b>
                              {` ${lesson.title}`}
                            </Title>

                            <ButtonContainer>
                              <ProblemAction
                                startIcon={<Edit />}
                                size="small"
                                variant="outlined"
                                onClick={() => {
                                  router.push({
                                    pathname:
                                      Routes.ContentEditorBaseWithoutId +
                                      lesson._id,
                                    query: {
                                      moduleName: module.name,
                                      moduleId: module._id,
                                    },
                                  });
                                }}
                              >
                                Edit
                              </ProblemAction>
                            </ButtonContainer>
                          </ModuleContent>
                        ))}
                      </>
                    ) : null}
                  </>
                ) : (
                  <ModuleContent>
                    <Title>
                      There is no content for this module. Click add
                      problem/content to begin.
                    </Title>
                  </ModuleContent>
                )}
              </Module>
            );
          })}
        </>
      ) : (
        // Needs to say something else when getting modules failed
        // and allow user to retry
        <Typography variant="h6">Click Add Modules to get started</Typography>
      )}
    </>
  );
}
