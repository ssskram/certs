import * as React from 'react'
import Select from './profileFields'

export default class SetProfile extends React.Component {

    render() {
        return (
            <div className='text-center'>
                <h2>Welcome to PGH Certs</h2>
                <h4>First, select your department and title</h4>
                <Select />
            </div>
        )
    }
}