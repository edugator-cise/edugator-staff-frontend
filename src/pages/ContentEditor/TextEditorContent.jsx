import React, { Component, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import { EditorState, EditorBlock, AtomicBlockUtils } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import MultipleChoiceOption from "./components/MultipleChoiceOption";
import styled from "@emotion/styled";
import { stateToHTML } from "draft-js-export-html";

// https://www.npmjs.com/package/draft-js-export-html
const options = {
  blockRenderers: {
    atomic: (block) => {
      // const editorState = state;
      // const contentState = editorState.getCurrentContent();
      // const entityKey = block.getEntityAt(0);
      // const entity = contentState.getEntity(entityKey);
      // let data = entity.data;
      // let data = block.getData();
      // console.log("Data", data);
      return (
        "<atomic_entity />"
      );
    },
  },
};

const QuestionHolder = styled("div")({
  width: "70%",
  marginTop: 20,
  height: "auto",
  borderRadius: 4,
  display: "flex",
  flexDirection: "column",
  boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
  alignSelf: "center",
  padding: 20,
});

const AnswerHolder = styled("div")({
  width: "100%",
  height: "auto",
  paddingTop: 10,
  paddingBottom: 10,
  backgroundColor: "#dbeafe",
  borderRadius: 4,
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  cursor: "pointer",
  duration: 150,
  transition: "background-color .2s ease-out, color .2s ease-out",
  ":hover": {
    backgroundColor: "#3b82f6",
    color: "white",
  },
});

class TextEditorContent extends Component {
  //Constructor creates new text box object upon program start
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
      html: "",
    };
  }
  //Updates editorstate (text box content) when changed
  onEditorStateChange = (editorState) => {
    // console.log(editorState)
    let html = stateToHTML(editorState.getCurrentContent(), options);
    this.onTrigger();
    this.setState({
      editorState,
      html,
    });
  };

  onTrigger = () => {
    let atomicEntities = this.getEntities(this.state.editorState)
    let html = this.state.html
    
    console.log("Callback Data", atomicEntities, html);
    this.props.callbackData(atomicEntities, html)
  };
 
  getEntities = (editorState, entityType = null) => {
    const content = editorState.getCurrentContent();
    const entities = [];
    content.getBlocksAsArray().forEach((block) => {
        let selectedEntity = null;
        block.findEntityRanges(
            (character) => {
                if (character.getEntity() !== null) {
                  const entity = content.getEntity(character.getEntity());  
                    if (!entityType || (entityType && entity.getType() === entityType)) {
                        selectedEntity = {
                            entityKey: character.getEntity(),
                            blockKey: block.getKey(),
                            data: content.getEntity(character.getEntity()).getData(),
                            type: content.getEntity(character.getEntity()).getType(),
                        };
                        return true;
                    }
                }
                return false;
            },
            (start, end) => {
                entities.push({...selectedEntity, start, end});
            });
    });
    return entities;
};

  //displayed component when multiple choice is added
  MultipleChoiceDisplayBlock = (props) => {
    const data = props.contentState;
    //get metadata passed in via insertBlock() function passed to MultipleChoiceOption
    const values = data.getEntity(props.block.getEntityAt(0)).getData();
    // console.log(values);

    return (
      <QuestionHolder>
        <Typography
          variant="overline"
          sx={{ fontWeight: 600, fontSize: "0.9em" }}
          fontSize="subtitle2"
          color={"#3b82f6"}
        >
          Question 1
        </Typography>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          {values.question}
        </Typography>
        <Grid
          container
          rowSpacing={2}
          columnSpacing={2}
          sx={{ marginTop: 1, alignSelf: "center", justifySelf: "center" }}
        >
          <Grid item xs={6}>
            <AnswerHolder>
              <Typography
                variant="body2"
                sx={{ fontWeight: 500, marginLeft: 2, marginRight: 2 }}
                key={values.answer1}
              >
                {values.answer1}
              </Typography>
            </AnswerHolder>
          </Grid>
          <Grid item xs={6}>
            <AnswerHolder>
              <Typography
                variant="body2"
                sx={{ fontWeight: 500, marginLeft: 2, marginRight: 2 }}
                key={values.answer2}
              >
                {values.answer2}
              </Typography>
            </AnswerHolder>
          </Grid>
          <Grid item xs={6}>
            <AnswerHolder>
              <Typography
                variant="body2"
                sx={{ fontWeight: 500, marginLeft: 2, marginRight: 2 }}
                key={values.answer3}
              >
                {values.answer3}
              </Typography>
            </AnswerHolder>
          </Grid>
          <Grid item xs={6}>
            <AnswerHolder>
              <Typography
                variant="body2"
                sx={{ fontWeight: 500, marginLeft: 2, marginRight: 2 }}
                key={values.answer4}
              >
                {values.answer4}
              </Typography>
            </AnswerHolder>
          </Grid>
        </Grid>
      </QuestionHolder>
    );
  };

  //util function for editor to render blocks based on passed content type
  //Seems you ONLY put if conditions for custom types, i.e. MULTIPLE_CHOICE
  //Attempting to render existing components (like IMAGE) or having an else statement messes up rendering of all components
  blockRenderer = (contentBlock) => {
    const { editorState } = this.state;
    console.log("consoleBlock: ", contentBlock);
    const type = contentBlock.getType();
    if (type === "atomic") {
      const contentState = editorState.getCurrentContent();
      const entityKey = contentBlock.getEntityAt(0);
      const entity = contentState.getEntity(entityKey);
      if (entity && entity.type === "MULTIPLE_CHOICE") {
        return {
          component: this.MultipleChoiceDisplayBlock,
          editable: false,
        };
      }
    }
  };

  // https://draftjs.org/docs/advanced-topics-custom-block-render-map/
  // https://codesandbox.io/s/3ozykkmy6?file=/index.js:400-416

  //will generate mc block as unique entity with given values as metadata
  insertBlock = (question, answer1, answer2, answer3, answer4) => {
    const { editorState } = this.state;

    const contentState = editorState.getCurrentContent();

    const contentStateWithEntity = contentState.createEntity(
      "MULTIPLE_CHOICE",
      "MUTABLE",
      {
        question: question,
        answer1: answer1,
        answer2: answer2,
        answer3: answer3,
        answer4: answer4,
      }
    );

    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(editorState, {
      currentContent: contentStateWithEntity,
    });

    this.setState({
      editorState: AtomicBlockUtils.insertAtomicBlock(
        newEditorState,
        entityKey,
        " "
      ),
    });
  };

  //Class object " <EditorContainer />" renders the text box
  render() {
    //Tried looking into what the "this" object is for this class, seems vague
    //Passing editorState is difficult, but might be possible
    const { editorState } = this.state;

    console.log("return this: ", this);

    return (
      <div className="editor">
        <Editor
          //Update and show text box content
          editorState={editorState}
          onEditorStateChange={this.onEditorStateChange}
          //Display toolbar on top
          toolbar={{
            inline: { inDropdown: true },
            list: { inDropdown: true },
            textAlign: { inDropdown: true },
            link: { inDropdown: true },
            history: { inDropdown: true },
          }}
          //ONLY pass blockRendered to customBlockRenderFunc
          //passing to "blockRendererFn" overwrites existing block rendering (like IMAGE, HYPERLINK)
          customBlockRenderFunc={this.blockRenderer}
          toolbarCustomButtons={[
            <MultipleChoiceOption insertMC={this.insertBlock} />,
          ]}
        />
      </div>
    );
  }
}

export default TextEditorContent;
