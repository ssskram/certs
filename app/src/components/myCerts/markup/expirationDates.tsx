import * as React from 'react'
import * as types from '../../../store/types'
import iccExp from '../functions/ICCexpiration'
import uccExp from '../functions/UCCexpiration'

type props = {
    certifications: types.certification[]
    certHistory: types.certRecord[]
}

export default class ExpirationDates extends React.Component<props, {}> {

    render() {

        console.log(this.props)

        return (
            <div style={{ margin: '25px 0px' }} className='row text-center'>
                <div className='col-md-6'>
                    <h4><u>ICC Expiration</u></h4>
                    <h4><b>{iccExp(this.props.certHistory, this.props.certifications)}</b></h4>
                </div>
                <div className='col-md-6'>
                    <h4><u>UCC Expiration</u></h4>
                    <h4><b>{uccExp(this.props.certHistory, this.props.certifications)}</b></h4>
                </div>
            </div>
        )
    }
}