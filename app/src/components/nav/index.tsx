import * as React from "react";
import { connect } from "react-redux";
import { ApplicationState } from "../../store";
import * as userProfile from "../../store/userProfile";
import * as types from "../../store/types";
import { Link } from "react-router-dom";
import { Nav, NavItem, Navbar } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import Account from "./userProfile";

const btnStyle = {
  fontSize: "16px",
  margin: "6px 10px"
};

type props = {
  userProfile: types.userProfile;
};

export class NavMenu extends React.Component<props, {}> {
  public render() {
    return (
      <Navbar
        inverse
        fixedTop
        fluid
        collapseOnSelect
        style={{ zIndex: 1000 as any }}
      >
        <Navbar.Header>
          <Navbar.Brand>
            <Link to={"/"}>PGH Certs</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse className="text-xs-center">
          {this.props.userProfile.isAdmin && (
            <Nav>
              <LinkContainer to={"/Admin"}>
                <NavItem>
                  <button
                    className="btn btn-danger nav-button"
                    style={btnStyle}
                  >
                    Admin
                  </button>
                </NavItem>
              </LinkContainer>
            </Nav>
          )}
          <Account />
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default connect(
  (state: ApplicationState) => ({
    ...state.userProfile
  }),
  {
    ...userProfile.actionCreators
  }
)(NavMenu as any);
