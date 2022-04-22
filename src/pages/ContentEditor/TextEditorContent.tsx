import  { Component } from "react";
import { EditorState, AtomicBlockUtils } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import MultipleChoiceOption from "./components/MultipleChoiceOption";
import MultipleSelectOption from "./components/MultipleSelectOption";
import { convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { MultipleChoiceDisplayBlock, MultipleSelectDisplayBlock } from './components/displayBlockComponents'

class TextEditorContent extends Component<any, any> {
  //Constructor creates new text box object upon program start
  constructor(props: any) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
      html: "",
    };
  }
  //Updates editorstate (text box content) when changed
  onEditorStateChange = (editorState: EditorState) => {
    // console.log(editorState)
    let html = draftToHtml(convertToRaw(editorState.getCurrentContent()), {}, false, this.customEntityTransform);
    this.onTrigger();
    this.setState({
      editorState,
      html,
    });
  };

  //https://www.npmjs.com/package/draftjs-to-html
  //https://github.com/jpuri/draftjs-to-html/issues/18
  customEntityTransform = (entity: any, text: string) => {
    if (entity.type === "IMAGE" || entity.type === "MULTIPLE_CHOICE" || entity.type === "MULTIPLE_SELECT")
      return (
        "<atomic_entity />"
      );
  }

  onTrigger = () => {
    let atomicEntities = this.getEntities(this.state.editorState)
    let html = this.state.html
    
    console.log("Callback Data", atomicEntities, html);
    this.props.callbackData(atomicEntities, html)
  };
 
  getEntities = (editorState: any, entityType = null) => {
    const content = editorState.getCurrentContent();
    const entities: any[] = [];
    content.getBlocksAsArray().forEach((block: any) => {
        let selectedEntity: any = null;
        block.findEntityRanges(
            (character: any) => {
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
            (start: any, end: any) => {
                entities.push({...selectedEntity, start, end});
            });
    });
    return entities;
};

  //util function for editor to render blocks based on passed content type
  //Seems you ONLY put if conditions for custom types, i.e. MULTIPLE_CHOICE
  //Attempting to render existing components (like IMAGE) or having an else statement messes up rendering of all components
  blockRenderer = (contentBlock: any) => {
    const { editorState } = this.state;
    console.log("consoleBlock: ", contentBlock);
    const type = contentBlock.getType();
    if (type === "atomic") {
      const contentState = editorState.getCurrentContent();
      const entityKey = contentBlock.getEntityAt(0);
      const entity = contentState.getEntity(entityKey);
      if (entity && entity.type === "MULTIPLE_CHOICE") {
        return {
          component: MultipleChoiceDisplayBlock,
          editable: false,
        };
      } else if (entity && entity.type === "MULTIPLE_SELECT") {
        return {
          component: MultipleSelectDisplayBlock,
          editable: false,
        };
      }
    }
  };

  // https://draftjs.org/docs/advanced-topics-custom-block-render-map/
  // https://codesandbox.io/s/3ozykkmy6?file=/index.js:400-416

  //will generate mc block as unique entity with given values as metadata
  insertMCBlock = (question: string, correct: number, answer1: string, answer2: string, answer3: string, answer4: string) => {
    const { editorState } = this.state;

    const contentState = editorState.getCurrentContent();

    const contentStateWithEntity = contentState.createEntity(
      "MULTIPLE_CHOICE",
      "MUTABLE",
      {
        question: question,
        correct: correct,
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
  //will generate ms block as unique entity with given values as metadata
  insertMSBlock = (question: string, correct: number[], answer1: string, answer2: string, answer3: string, answer4: string) => {
    const { editorState } = this.state;

    const contentState = editorState.getCurrentContent();

    const contentStateWithEntity = contentState.createEntity(
      "MULTIPLE_SELECT",
      "MUTABLE",
      {
        question: question,
        correct: correct,
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
          // options removed: ['embedded', 'emoji', 'remove', 'history']
            options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'colorPicker', 'list', 'textAlign', 'link', 'image'],
            inline: { inDropdown: true },
            list: { inDropdown: true },
            textAlign: { inDropdown: true },
            link: { inDropdown: true },
            history: { inDropdown: true }
          }}
          //ONLY pass blockRendered to customBlockRenderFunc
          //passing to "blockRendererFn" overwrites existing block rendering (like IMAGE, HYPERLINK)
          customBlockRenderFunc={this.blockRenderer}
          toolbarCustomButtons={[
            <MultipleChoiceOption insertMC={this.insertMCBlock} />,
            <MultipleSelectOption insertMC={this.insertMSBlock} />,
          ]}
        />
      </div>
    );
  }
}

export default TextEditorContent;
