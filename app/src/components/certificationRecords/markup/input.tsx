import * as React from 'react'
import Modal from 'react-responsive-modal'
import * as types from '../../../store/types'
import certificationName from '../functions/certificationName'
import Select from '../../formElements/select'
import Datepicker from '../../formElements/datepicker'
import * as certifications from '../certficiations'

type props = {
    cert: types.certRecord
    certifications: types.certification[]
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
            certification: props.cert ? certificationName(props.cert.certId, props.certifications) : undefined,
            expiration: props.cert ? props.cert.date : undefined
        }
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
                <div>
                    <h3 className='text-center'>
                        {this.props.cert ? "Edit record" : "New certification record"}
                    </h3>
                    <hr />
                    <br />
                    <Select
                        value={this.props.cert ? { value: this.state.certification, label: this.state.certification } : undefined}
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
                        callback={(expiration) => {
                            console.log(expiration)
                            this.setState({ expiration })
                        }}
                        required
                    />
                </div>
            </Modal>
        )
    }
}