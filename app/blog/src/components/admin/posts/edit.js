import React from 'react';
import { withRouter } from 'react-router'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import htmlToDraft from 'html-to-draftjs';
import { getPost, updatePost } from '../../../modules/adminPosts';

import { Input, Button, Message } from 'semantic-ui-react';

import "./new.css";

class EditPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      editorState: EditorState.createEmpty()
    };

    this.handleTitle = this.handleTitle.bind(this);
    this.onEditorStateChange = this.onEditorStateChange.bind(this);

    this.props.getPost(this.props.match.params.postId);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.title === '') {
      let post = this.props.editPost;
      const contentBlock = htmlToDraft(post.post);

      if (contentBlock) {
        const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
        const editorState = EditorState.createWithContent(contentState);

        this.setState({
          title: post.title,
          editorState: editorState
        });
      }
    }
  }

  handleTitle(event) {
    this.setState({title: event.target.value});
  }

  onEditorStateChange(editorState) {
    this.setState({
      editorState,
    });
  };

  render() {
    const { editorState } = this.state;
    let message = null;

    if (this.props.editPostMessage) {
      let postMessage = this.props.editPostMessage;
      message = <Message info>
        <Message.Header>{postMessage.success}</Message.Header>
        <p>{postMessage.message}</p>
      </Message>;
    }

    return ( 
      <div>
        <h2>Editer une note</h2>
        <Input
          fluid
          value={this.state.title}
          onChange={this.handleTitle}
        />

        <br/><br/>

        <Editor
          editorState={editorState}
          onEditorStateChange={this.onEditorStateChange}
        />

        <br/><br/>

        {message}

        <Button
          content='Mettre a jour'
          primary
          onClick={() => this.props.updatePost(
            this.state.title,
            draftToHtml(convertToRaw(editorState.getCurrentContent())),
            this.props.editPost.id,
            this.props.editPost
          )}
        />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  editPost: state.adminPosts.editPost,
  editPostMessage: state.adminPosts.editPostMessage,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  getPost,
  updatePost
}, dispatch)

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(EditPost))
