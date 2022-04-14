// import React, { useEffect } from "react";
// import { useDispatch } from "react-redux";
import { TextStack } from "./TextStack";
import { useLocation, useParams } from "react-router-dom";
import "./TextEditorStyles.css";
import { LayoutContainer } from "../../shared/LayoutContainer";
import { useEffect } from "react";

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

    useEffect( () => {
        console.log(moduleId, contentId, moduleName);
    })

    // const dispatch = useDispatch();

    const actions = {
        back: {
          label: "Back to Modules",
          onClick: () => console.log("Back clicked"),//dispatch(openWarningModal(WarningTypes.Quit)),
          variant: "contained",
          color: "primary",
        },
        delete: {
          label: "Delete Problem",
          onClick: () => console.log("Delete clicked"),//dispatch(openWarningModal(WarningTypes.Delete)),
          variant: "contained",
          color: "error",
        },
      };

    return (
        <LayoutContainer
            pageTitle={`${moduleName ? moduleName + " - " : ""}${
                "New Content"
            }`}
            actionButtons={
                contentId ? [actions.back, actions.delete] : [actions.back]
            }
        >            
            <TextStack />
        </LayoutContainer>
    )
}