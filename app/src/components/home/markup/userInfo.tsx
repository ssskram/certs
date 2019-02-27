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
                User info here
            </div>
        )
    }
}