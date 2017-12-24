import React from 'react';
import { withRouter } from 'react-router'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Title from './title';
import Text from './text';
import './post.css';

class Post extends React.Component {
  render() {
    let posts = this.props.posts.posts ? this.props.posts.posts : [];
    let ids = [];
    return ( 
      <div>
        {posts.map(post => {
          return(
            <div className="post" key={post.id}> {post.id/*tobedeleted*/}
              <Title title={post.Title} />
              <Text text={post.Post} />
            </div>
          )
        })}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  posts: state.posts,
})

const mapDispatchToProps = dispatch => bindActionCreators({

}, dispatch)

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Post))
