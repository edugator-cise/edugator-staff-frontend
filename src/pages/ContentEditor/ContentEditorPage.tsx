import React, { useEffect } from "react";
import { TextStack } from "./TextStack";
import { useLocation, useParams, useHistory } from "react-router-dom";
import { LayoutContainer } from "../../shared/LayoutContainer";
import { Routes } from "../../shared/Routes.constants";

interface ContentEditorURL {
  contentId?: string;
}

interface ContentCreatorURL {
  moduleId?: string;
}

interface ContentLocationState {
  moduleName?: string;
}

export const ContentEditorPage = () => {
  const { moduleId, contentId } = useParams<
    ContentEditorURL & ContentCreatorURL
  >();

  const { moduleName } = useLocation<ContentLocationState>().state;

  useEffect(() => {
    console.log(moduleId, contentId, moduleName);
  });

  //Simple redirect fix with useHistory https://stackoverflow.com/questions/51393153/react-routing-redirect-onclick
  //Would recommend looking for more detailed fix in future
  const history = useHistory();

  const actions = {
    back: {
      label: "Back to Modules",
      onClick: () => history.push(Routes.Modules), //dispatch(openWarningModal(WarningTypes.Quit)),
      variant: "contained",
      color: "primary",
    },
    delete: {
      label: "Delete Problem",
      onClick: () => console.log("Delete clicked"), //dispatch(openWarningModal(WarningTypes.Delete)),
      variant: "contained",
      color: "error",
    },
  };

  return (
    <LayoutContainer
      pageTitle={`${moduleName ? moduleName + " - " : ""}${"New Content"}`}
      actionButtons={
        contentId ? [actions.back, actions.delete] : [actions.back]
      }
    >
      <TextStack />
    </LayoutContainer>
  );
};
