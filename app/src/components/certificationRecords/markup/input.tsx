import * as React from 'react'
import Modal from 'react-responsive-modal'
import * as types from '../../../store/types'
import certificationName from '../functions/certificationName'
import Select from '../../formElements/select'
import Datepicker from '../../formElements/date'
import * as certifications from '../certficiations'
import { Helmet } from "react-helmet"

type props = {
    user: types.user
    cert: types.certRecord
    certifications: types.certification[]
    addCertRecord: (record: object) => void
    updateCertRecord: (record: object) => void
    close: () => void
}

type state = {
    certification: string
    expiration: string
}

export default class CertForm extends React.Component<props, state> {
    constructor(props) {
        super(props)
        this.state = {
            certification: props.cert ? props.cert.certId : undefined,
            expiration: props.cert ? props.cert.date : undefined
        }
    }

    save() {
        if (this.props.cert) {
            this.props.updateCertRecord({
                certId: this.state.certification,
                date: this.state.expiration,
                entryId: this.props.cert.entryId
            })
        } else {
            this.props.addCertRecord({
                user: this.props.user.email,
                certId: this.state.certification,
                date: this.state.expiration
            })
        }
        this.props.close()
    }

    render() {
        return (
            <Modal
                open={true}
                onClose={() => this.props.close()}
                showCloseIcon={true}
                classNames={{
                    overlay: 'custom-overlay',
                    modal: 'custom-modal'
                }}
                center>
                <div className='text-center'>
                    <Helmet>
                        <style>{'.custom-modal { overflow: visible; } .Select-menu-outer { overflow: visible}'}</style>
                    </Helmet>
                    <h3>
                        {this.props.cert ? "Edit record" : "New certification record"}
                    </h3>
                    <hr />
                    <br />
                    <Select
                        value={this.props.cert ? { value: this.state.certification, label: certificationName(this.state.certification, this.props.certifications) } : undefined}
                        header="Certification"
                        placeholder='Select certification'
                        onChange={certification => this.setState({ certification: certification.value })}
                        multi={false}
                        options={certifications.Certifications}
                        required
                    />
                    <Datepicker
                        value={this.state.expiration}
                        header='Expiration date'
                        placeholder="Enter a date"
                        callback={(e) => this.setState({ expiration: e.target.value })}
                        required
                    />
                    <button disabled={(!this.state.certification) || (!this.state.expiration)} onClick={this.save.bind(this)} className='btn btn-success'>Save</button>
                </div>
            </Modal>
        )
    }
}