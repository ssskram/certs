import * as React from "react";
import { connect } from "react-redux";
import { ApplicationState } from "../../store";
import * as user from "../../store/user";
import * as userProfile from "../../store/userProfile";
import * as certifications from "../../store/certifications";
import * as certHistory from "../../store/certHistory";
import * as types from "../../store/types";
import HydrateStore from "../utilities/hydrateStore";
import Messages from "../utilities/messages";
import UserProfile from "./markup/userInfo";
import CertHistory from "./markup/certTable";
import ExpirationDates from "./markup/expirationDates";
import DeleteRecord from "./markup/deleteRecord";
import CertForm from "./markup/input";
import { Cat } from "react-kawaii";
import Spinner from "../utilities/spinner";

type props = {
  user: types.user;
  userProfile: types.userProfile;
  certifications: types.certification[];
  certHistory: types.certRecord[];
  deleteCertRecord: (entryId: number) => void;
  addCertRecord: (record: object) => void;
  updateCertRecord: (record: object) => void;
};

type state = {
  delete: boolean;
  edit: boolean;
  add: boolean;
  selectedRecord: types.certRecord;
};

export class Home extends React.Component<props, state> {
  constructor(props: props) {
    super(props);
    this.state = {
      delete: false,
      edit: false,
      add: false,
      selectedRecord: undefined
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  delete = record => this.setState({ delete: true, selectedRecord: record });
  edit = record => this.setState({ edit: true, selectedRecord: record });
  add = () => this.setState({ add: true });
  close = () =>
    this.setState({
      add: false,
      edit: false,
      delete: false,
      selectedRecord: undefined
    });

  render() {
    return (
      <div
        className="col-md-8 col-md-offset-2"
        style={{ marginBottom: "50px" }}
      >
        <HydrateStore />
        <Messages />
        <UserProfile
          user={this.props.user}
          userProfile={this.props.userProfile}
        />
        <h2>Certifications</h2>
        <hr />
        {this.props.certifications.length > 0 &&
          this.props.certHistory.length > 0 && (
            <div>
              {this.props.certHistory.filter(
                c => c.user == this.props.user.email
              ).length > 0 ? (
                <div>
                  <ExpirationDates
                    certHistory={this.props.certHistory.filter(
                      c => c.user == this.props.user.email
                    )}
                  />
                  <CertHistory
                    admin={false}
                    certifications={this.props.certifications}
                    certHistory={this.props.certHistory.filter(
                      c => c.user == this.props.user.email
                    )}
                    delete={this.delete.bind(this)}
                    edit={this.edit.bind(this)}
                  />
                  <button
                    onClick={() => this.setState({ add: true })}
                    className="btn btn-success"
                    style={{ marginTop: "8px" }}
                  >
                    <span
                      style={{ marginRight: "10px" }}
                      className="glyphicon glyphicon-plus"
                    />
                    Add a certification record
                  </button>
                </div>
              ) : (
                <div className="text-center">
                  <br />
                  <Cat size={220} mood="shocked" color="#617487" />
                  <h4 className="oswald-header" style={{ color: "#2C3E50" }}>
                    You haven't completed any certifications
                  </h4>
                  <button
                    onClick={() => this.setState({ add: true })}
                    className="btn btn-success"
                    style={{ marginTop: "8px" }}
                  >
                    <span
                      style={{ marginRight: "10px" }}
                      className="glyphicon glyphicon-plus"
                    />
                    Add a certification record
                  </button>
                </div>
              )}
            </div>
          )}
        {this.state.delete && (
          <DeleteRecord
            close={this.close.bind(this)}
            selectedRecord={this.state.selectedRecord}
            deleteRecord={this.props.deleteCertRecord.bind(this)}
          />
        )}
        {this.state.edit && (
          <CertForm
            user={this.props.user}
            cert={this.state.selectedRecord}
            certifications={this.props.certifications}
            close={this.close.bind(this)}
            updateCertRecord={this.props.updateCertRecord.bind(this)}
            addCertRecord={this.props.addCertRecord.bind(this)}
          />
        )}
        {this.state.add && (
          <CertForm
            user={this.props.user}
            cert={undefined}
            certifications={this.props.certifications}
            close={this.close.bind(this)}
            updateCertRecord={this.props.updateCertRecord.bind(this)}
            addCertRecord={this.props.addCertRecord.bind(this)}
          />
        )}
      </div>
    );
  }
}

export default connect(
  (state: ApplicationState) => ({
    ...state.user,
    ...state.userProfile,
    ...state.certifications,
    ...state.certHistory
  }),
  {
    ...user.actionCreators,
    ...userProfile.actionCreators,
    ...certifications.actionCreators,
    ...certHistory.actionCreators
  }
)(Home);
