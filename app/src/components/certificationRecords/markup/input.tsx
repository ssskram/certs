import * as React from "react";
import Modal from "react-responsive-modal";
import * as types from "../../../store/types";
import certificationName from "../functions/certificationName";
import Select from "../../formElements/select";
import Datepicker from "../../formElements/date";
import * as certifications from "../certficiations";
import { Helmet } from "react-helmet";

type props = {
  user: types.user;
  cert: types.certRecord;
  certifications: types.certification[];
  addCertRecord: (record: object) => void;
  updateCertRecord: (record: object) => void;
  close: () => void;
};

type state = {
  certification: string;
  iccExp: string;
  uccExp: string;
};

export default class CertForm extends React.Component<props, state> {
  constructor(props) {
    super(props);
    this.state = {
      certification: props.cert ? props.cert.certId : undefined,
      iccExp: props.cert ? props.cert.iccExp : undefined,
      uccExp: props.cert ? props.cert.uccExp : undefined
    };
  }

  save() {
    if (this.props.cert) {
      this.props.updateCertRecord({
        certId: this.state.certification,
        entryId: this.props.cert.entryId,
        iccExp: this.state.iccExp,
        uccExp: this.state.uccExp
      });
    } else {
      this.props.addCertRecord({
        user: this.props.user.email,
        certId: this.state.certification,
        iccExp: this.state.iccExp,
        uccExp: this.state.uccExp
      });
    }
    this.props.close();
  }

  render() {
    return (
      <Modal
        open={true}
        onClose={() => this.props.close()}
        showCloseIcon={true}
        classNames={{
          overlay: "custom-overlay",
          modal: "custom-modal"
        }}
        center
      >
        <div>
          <Helmet>
            <style>
              {
                ".custom-modal { overflow: visible; } .Select-menu-outer { overflow: visible}"
              }
            </style>
          </Helmet>
          <h3 className="text-center">
            {this.props.cert ? "Edit record" : "New certification record"}
          </h3>
          <hr />
          <br />
          <Select
            value={
              this.props.cert
                ? {
                    value: this.state.certification,
                    label: certificationName(
                      this.state.certification,
                      this.props.certifications
                    )
                  }
                : undefined
            }
            header="Certification"
            placeholder="Select certification"
            onChange={certification =>
              this.setState({ certification: certification.value })
            }
            multi={false}
            options={certifications.Certifications}
            required
          />
          <Datepicker
            value={this.state.iccExp}
            header="ICC Expiration Date"
            placeholder="Enter a date"
            callback={e => this.setState({ iccExp: e.target.value })}
            required
          />
          <Datepicker
            value={this.state.uccExp}
            header="UCC Expiration Date"
            placeholder="Enter a date"
            callback={e => this.setState({ uccExp: e.target.value })}
            required
          />
          <div className='text-center'>
            <button
              disabled={
                !this.state.certification ||
                (!this.state.iccExp || !this.state.uccExp)
              }
              onClick={this.save.bind(this)}
              className="btn btn-success"
            >
              Save
            </button>
          </div>
        </div>
      </Modal>
    );
  }
}
