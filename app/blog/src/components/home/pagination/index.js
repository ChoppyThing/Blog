import React from 'react';
import { withRouter } from 'react-router'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getPosts } from '../../../modules/posts';
import { Link } from 'react-router-dom';
import { Grid, Image } from 'semantic-ui-react'
import { Button } from 'semantic-ui-react'

class Pagination extends React.Component {
  componentWillUpdate(nextProps, nextState) {
    let page = nextProps.match.params.pageNumber;
    this.props.getPosts(page);
  }

  render() {
    let 
      before = null,
      next = null
    ;

    if (this.props.page < (this.props.total / this.props.perPage)) {
      let url = '/page/' + (parseInt(this.props.page) + 1);
      before = (
        <Link className="page" to={url}>
          <Button basic color='teal'>Precedent</Button>
        </Link>
      )
    }

    if (this.props.page != 1) {
      let url = '/page/' + (parseInt(this.props.page) - 1);
      next = (
        <Link className="page" to={url}>
          <Button basic color='teal'>Suivant</Button>
        </Link>
      )
    }

    return (
      <div className="pagination">
        <Grid relaxed='very' columns={2}>
          <Grid.Column textAlign='left'>
            {next}
          </Grid.Column>
          <Grid.Column textAlign='right'>
            {before}
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  page: state.posts.page,
  total: state.posts.total,
  perPage: state.posts.perPage,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  getPosts
}, dispatch)

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Pagination))
