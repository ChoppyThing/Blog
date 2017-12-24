import React from 'react';
//import { push } from 'react-router-redux';
import { withRouter } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getPosts } from '../../modules/posts';
import  Posts  from './posts';
import  Pagination  from './pagination';
import { Redirect } from 'react-router-dom';

class Home extends React.Component {
  componentDidMount() {
    this.props.history.push("/page/1"); // This sucks, react router don't update from first button call
    //this.props.getPosts(1);
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
  //changePage: () => push('/about-us')
}, dispatch)

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Home))
