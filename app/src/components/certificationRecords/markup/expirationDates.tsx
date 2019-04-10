import * as React from 'react'
import * as types from '../../../store/types'
import expirationDate from '../functions/calculateExpired'

type props = {
    certHistory: types.certRecord[]
}

export default class ExpirationDates extends React.Component<props, {}> {

    render() {
        return (
            <div className='col-md-12 text-center'>
                <div className='col-md-3 panel' style={{ margin: '15px 5px' }}>
                    <h5>ICC Expiration</h5>
                    <h4 className='crimson-text'><b>{expirationDate(this.props.certHistory, "ICC")}</b></h4>
                </div>
                <div className='col-md-3 panel' style={{ margin: '15px 5px' }}>
                    <h5>UCC Expiration</h5>
                    <h4 className='crimson-text'><b>{expirationDate(this.props.certHistory, "UCC")}</b></h4>
                </div>
            </div>
        )
    }
}