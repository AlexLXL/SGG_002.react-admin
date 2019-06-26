import React,{Component} from 'react';
import { EditorState} from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';

import './index.less'

export default class RichTextEditor extends Component{
  state = {
    editorState: EditorState.createEmpty(),
  };

  onEditorStateChange: Function = (editorState) => {
    this.setState({
      editorState,
    });
  };

  render() {
    const { editorState } = this.state;
    return <div className="text-editor">
      <Editor
        editorState={editorState}
        wrapperClassName="demo-wrapper"
        editorClassName="demo-editor"
        onEditorStateChange={this.onEditorStateChange}
      />
    </div>
  }
}