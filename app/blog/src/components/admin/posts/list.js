import React from 'react';
import { withRouter } from 'react-router'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getPosts, deletePost } from '../../../modules/adminPosts';

import { Header, Table, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import { Container } from 'semantic-ui-react'
import "./list.css";

class AdminPostList extends React.Component {
  constructor(props) {
    super(props);

    //this.props.getPosts();
  }

  componentWillMount() {
    this.props.getPosts();
  }

  render() {
    let posts = this.props.adminPosts.posts;
    return ( 
      <div>
        <h2>Liste des notes</h2>

        <Link to="/admin/posts/new">
          <Button basic color='blue'>
            Nouveau poste
          </Button>
        </Link>

        <Container fluid>
          <Table basic='very' celled collapsing>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>#</Table.HeaderCell>
                <Table.HeaderCell>title</Table.HeaderCell>
                <Table.HeaderCell>action</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {
                posts.map(post => {
                  return(
                    <Table.Row key={post.id}>
                      <Table.Cell>
                        { post.id }
                      </Table.Cell>
                      <Table.Cell>
                        {
                          post.deleteDate === null ? post.title : post.title+' [deleted]'
                        }
                      </Table.Cell>
                      <Table.Cell>
                        <Link to={'/admin/posts/edit/' + post.id}>
                          <Icon name='write' size='large' />
                        </Link>

                        <Icon  name='delete' size='large'
                          onClick={() => this.props.deletePost(post.id)}
                        />
                      </Table.Cell>
                    </Table.Row>
                  )
                })
              }
            </Table.Body>
          </Table>
        </Container>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  adminPosts: state.adminPosts,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  getPosts,
  deletePost,
}, dispatch)

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminPostList))
