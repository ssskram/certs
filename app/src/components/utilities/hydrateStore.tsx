// hydrates the wholeeeeee store

import * as React from "react";
import { connect } from "react-redux";
import { ApplicationState } from "../../store";
import * as user from "../../store/user";
import * as userProfile from "../../store/userProfile";
import * as certifications from "../../store/certifications";
import * as certHistory from "../../store/certHistory";
import * as iccHistory from "../../store/iccHistory";
import * as uccHistory from "../../store/uccHistory";

class Hydrate extends React.Component<any, {}> {
  componentDidMount() {
    this.props.loadUser();
    this.props.loadCertifications();
    this.props.loadCertHistory();
    this.props.loadIccHistory();
    this.props.loadUccHistory();
  }

  public render() {
    console.log(this.props);
    return null;
  }
}

export default connect(
  (state: ApplicationState) => ({
    ...state.user,
    ...state.userProfile,
    ...state.certifications,
    ...state.certHistory,
    ...state.iccHistory,
    ...state.uccHistory
  }),
  {
    ...user.actionCreators,
    ...userProfile.actionCreators,
    ...certifications.actionCreators,
    ...certHistory.actionCreators,
    ...iccHistory.actionCreators,
    ...uccHistory.actionCreators
  }
)(Hydrate);
