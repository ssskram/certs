import * as React from 'react'
import Select from './profileFields'

export default class UpdateProfile extends React.Component {

    render() {
        return (
            <div className='text-center'>
                <h3>Update your department or title</h3>
                <Select />
            </div>
        )
    }
}