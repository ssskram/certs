import * as React from 'react'
import * as types from '../../../store/types'

type props = {
    user: types.user
    userProfile: types.userProfile
}

export default class User extends React.Component<props, {}> {

    render() {
        return (
            <div>
                <h2 className='oswald-header'>{this.props.user.name}</h2>
                <h4><i>{this.props.userProfile.title}</i></h4>
                <h5>{this.props.userProfile.department}</h5>
            </div>
        )
    }
}