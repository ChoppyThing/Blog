import React from 'react';
import { withRouter } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getPosts } from '../../modules/posts';
import  Posts  from './posts';
import  Pagination  from './pagination';

class Home extends React.Component {
  componentDidMount() {
    //this.props.history.push("/page/1"); // This sucks, react router don't update from first button call
    this.props.getPosts(1);
  }

  render(match) {
    return (
      <div>
        <div>
          <Posts/>
        </div>

        <Pagination />
      </div>
    )
  }
}

const mapStateToProps = state => ({ 
  //posts: state.posts,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  getPosts
}, dispatch)

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Home))
