import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { logout } from './modules/user'
import { bindActionCreators } from 'redux';
import { PrivateRoute } from './utils/PrivateRoute';

import { Menu } from 'semantic-ui-react'
import { Icon } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';

import Home from './components/home';
import Login from './components/login';
import Admin from './components/admin';

import './App.css';

class App extends Component {
  render() {
    //const { activeItem } = this.state;
    const active = this.props.location.pathname;

    let logout = null;
    let admin = null;
    
    if (this.props.user.token) {
      logout = (<Menu.Menu position='right'>
          <Menu.Item name='logout' onClick={() => this.props.logout()}>
            <Icon disabled name='log out' />
          </Menu.Item>
        </Menu.Menu>);

      admin = (<Menu.Item
          name='reviews'
          active={active === '/admin'}
          onClick={this.handleItemClick}
        >
          <Link to="/admin">
            <Icon disabled name='user outline' />
          </Link>
        </Menu.Item>);
    }

    return (
      <div>
        <header>
          <Menu>
            <Menu.Item
              name='editorials'
              active={active === '/'}
            >
              <Link to="/">
                <Icon disabled name='home' />
              </Link>
            </Menu.Item>

            {admin}
            {logout}
          </Menu>
        </header>

        <main>
          <div className="container">
            <Route exact path="/" component={Home} />
            <Route exact path="/page/:pageNumber" component={Home} />
          </div>

          <Route exact path="/login" component={Login} />
          <PrivateRoute path="/admin" component={Admin} />
          {/*<PrivateRoute path="/admin/posts" component={Posts} />*/}
        </main>

        {/*JSON.stringify(this.props)*/}
      </div>
    );
  }
}





const mapStateToProps = state => {
  return {
    user: state.user,
  }
}
  
const mapDispatchToProps = dispatch => bindActionCreators({
  logout
}, dispatch)
  
export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(App))
