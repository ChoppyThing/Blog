import React from 'react';
//import { push } from 'react-router-redux';
import { withRouter } from 'react-router'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';
import { Icon, Menu } from 'semantic-ui-react'
import { PrivateRoute } from '../../utils/PrivateRoute';
import Links from './links';
import Calendar from './calendar';
import NewPost from './posts/new';
import Files from './files';

import './admin.css';

class Admin extends React.Component {

  render() {

    let activeItem = this.props.location.pathname;

    return (
      <div>
        <section className="left-menu">
          <Grid>
            <Grid.Row>
              <Grid.Column width={2}>
                <Menu compact icon='labeled' vertical>
                  <Menu.Item name='post' active={activeItem === '/admin/posts/new'}>
                    
                    <Link to="/admin/posts/new">
                      <Icon name='mail outline' /><br />
                      Postes
                    </Link>
                  </Menu.Item>
    
                  <Menu.Item name='link' active={activeItem === '/admin/links'}>
                    <Link to="/admin/links">
                      <Icon name='linkify' /><br />
                      Liens
                    </Link>
                  </Menu.Item>
    
                  <Menu.Item name='calendar' active={activeItem === '/admin/calendar'}>
                    <Link to="/admin/calendar">
                      <Icon name='calendar' /><br />
                      Calendar
                    </Link>
                  </Menu.Item>

                  <Menu.Item name='file' active={activeItem === '/admin/files'}>
                    <Link to="/admin/files">
                      <Icon name='folder outline' /><br />
                      Files
                    </Link>
                  </Menu.Item>
                </Menu>
              </Grid.Column>

              <Grid.Column width={14}>
                <div className="main">
                  <PrivateRoute path="/admin/posts/new" component={NewPost} />
                  <PrivateRoute path="/admin/links" component={Links} />
                  <PrivateRoute path="/admin/calendar" component={Calendar} />
                  <PrivateRoute path="/admin/files" component={Files} />
                </div>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </section>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  connected: state.logged
})


export default withRouter(connect(
  mapStateToProps
)(Admin))