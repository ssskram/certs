import * as React from 'react'
import * as types from '../../../store/types'

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
                </div>
                <div className='col-md-6'>
                    <h4><u>UCC Expiration</u></h4>
                </div>
            </div>
        )
    }
}