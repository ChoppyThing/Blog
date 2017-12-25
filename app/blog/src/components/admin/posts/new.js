import React from 'react';
import { withRouter } from 'react-router'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createPosts } from '../../../modules/adminPosts';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
import { EditorState, convertToRaw } from 'draft-js';

import { Input } from 'semantic-ui-react';
import { Button } from 'semantic-ui-react';
import "./new.css";

class NewPosts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      editorState: EditorState.createEmpty()
    };

    this.handleTitle = this.handleTitle.bind(this);
    this.onEditorStateChange = this.onEditorStateChange.bind(this);
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

    return ( 
      <div>
        <h2>Nouvelle note</h2>
        <Input
          fluid
          value={this.state.title}
          onChange={this.handleTitle}
        />

        <br/><br/>

        <Editor
          editorState={editorState}
          toolbarClassName="toolbarClassName"
          wrapperClassName="wrapperClassName"
          editorClassName="editorClassName"
          onEditorStateChange={this.onEditorStateChange}
        />

        <br/><br/>

        <Button
          content='Creer'
          primary
          onClick={() => this.props.createPosts(
            this.state.title,
            draftToHtml(convertToRaw(editorState.getCurrentContent())))}
        />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  //posts: state.posts,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  createPosts
}, dispatch)

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(NewPosts))
