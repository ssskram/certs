import * as React from 'react'
import * as types from '../../../store/types'
import expirationDate from '../functions/calculateExpired'

type props = {
    certifications: types.certification[]
    certHistory: types.certRecord[]
}

export default class ExpirationDates extends React.Component<props, {}> {

    render() {
        return (
            <div style={{ margin: '25px 0px' }} className='row text-center'>
                <div className='col-md-6'>
                    <h4><u>ICC Expiration</u></h4>
                    <h4><b>{expirationDate(this.props.certHistory, this.props.certifications, "ICC")}</b></h4>
                </div>
                <div className='col-md-6'>
                    <h4><u>UCC Expiration</u></h4>
                    <h4><b>{expirationDate(this.props.certHistory, this.props.certifications, "UCC")}</b></h4>
                </div>
            </div>
        )
    }
}