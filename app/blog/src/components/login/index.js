import React from 'react';
import { withRouter } from 'react-router'
import { connect } from 'react-redux';
import { login } from '../../modules/user'
import { bindActionCreators } from 'redux';
import {
  Redirect,
} from 'react-router-dom';
import Cookies from 'universal-cookie';

class Login extends React.Component {
  constructor(props) {
    super(props);
    
    const cookies = new Cookies();
    let user = cookies.get('user');
    if (user !== undefined) {
      this.props.login(null, null)
    }
  
    this.state = {
      username: '',
      password: '',
      loginMessage: '',
    };

    this.handleUsername = this.handleUsername.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
  }

  handleUsername(event) {
    this.setState({username: event.target.value});
  }
  handlePassword(event) {
    this.setState({password: event.target.value});
  }

  render() {
    if (this.props.user.logged) {
      return (
        <Redirect to='/admin'/>
      )
    }

    return(
      <div>
        <h1>Login</h1>

        {this.props.user.loginMessage}<br/>
        <input type="text" value={this.state.username} onChange={this.handleUsername} /><br/>
        <input type="password" value={this.state.password} onChange={this.handlePassword} /><br/><br/>

        <button onClick={() => this.props.login(this.state.username, this.state.password)}>Login</button>
        <br/>
      </div>
    )
  }

}

const mapStateToProps = state => ({
  user: state.user
})

const mapDispatchToProps = dispatch => bindActionCreators({
    login
  }, dispatch)

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Login))