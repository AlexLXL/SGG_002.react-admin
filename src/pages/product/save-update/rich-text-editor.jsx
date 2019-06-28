import React,{Component} from 'react';
import { EditorState, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import PropTypes from 'prop-types'
import htmlToDraft from 'html-to-draftjs';

import './index.less'

export default class RichTextEditor extends Component{
  static propTypes = {
    detail: PropTypes.string.isRequired
  };

  state = {
    editorState: EditorState.createEmpty(),
  };

  componentWillMount() {
    if (this.props.detail) {
      // 匹配富文本编辑器格式，回显保存的内容
      const contentBlock = htmlToDraft(this.props.detail);
      if (contentBlock) {
        const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
        const editorState = EditorState.createWithContent(contentState);
        this.setState({ editorState })
      }
    }
  }

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