import React from 'react';
import { withRouter } from 'react-router'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class Links extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return ( 
      <div>
        LINKS
      </div>
    )
  }
}

const mapStateToProps = state => ({
  //posts: state.posts,
})

const mapDispatchToProps = dispatch => bindActionCreators({
}, dispatch)

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Links))
