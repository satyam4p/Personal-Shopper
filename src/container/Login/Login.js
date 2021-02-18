import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Label,
  FormGroup,
  Button,
  Alert
} from "reactstrap";
import {
  AvForm,
  AvField,
  AvGroup,
  AvInput,
  AvFeedback
} from "availity-reactstrap-validation";

// import { loginUser } from "../../redux/actions";
// import { isUserAuthenticated } from "../../helpers/authUtils";
// import Loader from "../../components/Loader";
// import logo from "../../assets/images/logo.png";
// import "../../assets/scss/DefaultTheme.scss";

class Login extends Component {

  constructor(props) {
    super(props);
    this.handleValidSubmit = this.handleValidSubmit.bind(this);
    this.toggleUser = this.toggleUser.bind(this);
    this.state = {
      isGuest: false
    };
  }

  componentDidMount() {
    this._isMounted = true;

    document.body.classList.add("authentication-bg");
    document.body.classList.add("authentication-bg-pattern");
  }

  componentWillUnmount() {
    this._isMounted = false;

    document.body.classList.remove("authentication-bg");
    document.body.classList.remove("authentication-bg-pattern");
  }

  toggleUser(event) {
    let value = event.target.value;
    if (value === "true") {
      this.setState({ isGuest: false });
    } else {
      this.setState({ isGuest: true });
    }
  }
  /**
   * Handles the submit
   */
  handleValidSubmit = (event, values) => {
    let username = "";
    if (values.checkGuestUser) {
      username = "guest@bridgesgi.com";
    } else {
      username = values.username;
    }
    this.props.loginUser(username, values.password, this.props.history);
  };

  /**
   * Redirect to root
   */
//   renderRedirectToRoot = () => {
//     const isAuthTokenValid = isUserAuthenticated();
//     if (isAuthTokenValid) {
//       return <Redirect to="/" />;
//     }
//   };

  render() {
    // const isAuthTokenValid = isUserAuthenticated();
    return (
      <React.Fragment>
        {/* {this.renderRedirectToRoot()} */}
        {/* {(this._isMounted || !isAuthTokenValid) && ( */}
          <div className="account-pages mt-5 mb-5">
            <Container>
              <Row className="justify-content-center">
                <Col md={8} lg={6} xl={5}>
                  <Card className="bg-pattern">
                    <CardBody className="p-4 position-relative">
                      {/* preloader */} {this.props.loading && <Loader />}
                      <div className="text-center w-75 m-auto">
                        <a href="/">
                          <span>
                            {/* <h3 className="logo">Magnum</h3> */}
                            <img src={logo} className="logo-login" alt="logo" />
                          </span>
                        </a>
                        {/* {!this.state.isGuest && (
                          <p className="text-muted mb-4 mt-3">
                            Enter your BridgeSGI Email and Password to Access
                            Portal
                          </p>
                        )} */}
                        {this.state.isGuest && (
                          <p className="text-muted mb-4 mt-3">
                            Enter Password to Access Portal
                          </p>
                        )}
                      </div>
                      {this.props.error && (
                        <Alert
                          color="danger"
                          isOpen={this.props.error ? true : false}
                        >
                          <div> {this.props.error} </div>
                        </Alert>
                      )}
                      <AvForm onValidSubmit={this.handleValidSubmit}>
                        {!this.state.isGuest && (
                          <AvField
                            name="username"
                            label="Username"
                            type="email"
                            placeholder="Enter Email"
                            value={this.props.value}
                            required
                          />
                        )}
                        <AvGroup className="mb-3">
                          <Label for="password"> Password </Label>
                          <AvInput
                            type="password"
                            name="password"
                            id="password"
                            value={this.props.value}
                            placeholder="Enter password"
                            required
                          />
                          <AvFeedback> This field is invalid </AvFeedback>
                        </AvGroup>
                        <div style={{ marginLeft: "20px" }}>
                          <AvInput
                            type="checkbox"
                            name="checkGuestUser"
                            id="checkGuestUser"
                            onChange={this.toggleUser}
                          />
                          <Label for="checkGuestUser"> Login as guest </Label>
                        </div>
                        <FormGroup>
                          <Button color="primary" className="btn-block">
                            Log In
                          </Button>
                        </FormGroup>
                      </AvForm>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </Container>
          </div>
        )}
        <footer className="footer footer-alt">
          2019 - 2020 &copy; BridgeSGI Corp.
        </footer>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  const { user, loading, error } = state.Auth;
  return {
    user,
    loading,
    error
  };
};

export default connect(mapStateToProps, {
  loginUser
})(Login);
