import React, { Component } from "react";
import { getAllUsers } from "../api";
import Button from "@material-ui/core/Button";
class Login extends Component {
  state = {
    users: [],
    userName: "",
    placeholder: "Enter username...",
    isValid: false,
  };

  componentDidMount() {
    getAllUsers().then((data) => {
      const { users } = data;
      this.setState({ users: users });
    });
  }

  handleChange = (event) => {
    event.preventDefault();
    this.setState({ [event.target.id]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    this.state.users.forEach((user) => {
      if (user.username === this.state.userName) {
        this.setState({
          userName: "",
          placeholder: `Logged in as ${user.username}`,
          isValid: true,
        });
        //   } else {
        //     if (user.username !== this.state.userName) {
        //       this.setState({
        //         userName: "",
        //         placeholder: "Invalid username!",
        //       });
        //     }
        //   }
      }
    });
  };
  render() {
    const { loggedIn } = this.props;

    const { placeholder } = this.state;
    const { login } = this.props;
    const { logout } = this.props;
    return (
      <div className="login">
        {loggedIn ? (
          <div className="login-success">
            <h4>Welcome {this.state.userName}</h4>
            <Button
              style={{ background: "white" }}
              onClick={() => {
                logout();
              }}
            >
              Logout
            </Button>
          </div>
        ) : (
          <form className="login-form" onSubmit={this.handleSubmit}>
            <input
              id="userName"
              value={this.state.userName}
              onChange={this.handleChange}
              placeholder={placeholder}
              type="text"
            ></input>
            <Button
              type="submit"
              style={{ background: "white" }}
              onClick={() => login(this.state.userName)}
            >
              Login
            </Button>
            <p>Please login to post, comment and vote</p>
          </form>
        )}
      </div>
    );
  }
}

export default Login;
