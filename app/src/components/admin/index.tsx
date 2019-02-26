import * as React from 'react'
import { connect } from 'react-redux'
import { ApplicationState } from '../../store'
import * as types from '../../store/types'
import * as userProfile from '../../store/userProfile'
import { Redirect } from 'react-router-dom'

type props = {
    userProfile: types.userProfile
}

type state = {
    redirect: boolean
}

export class Admin extends React.Component<props, state> {
    constructor(props) {
        super(props)
        this.state = {
            redirect: false
        }
    }

    componentDidMount() {
        if (!this.props.userProfile.isAdmin) {
            this.setState({ redirect: true })
        }
    }

    render() {

        if (this.state.redirect) {
            return <Redirect push to={'/'} />
        }

        return (
            <div>
                Admin stuff here
            </div>

        )
    }
}

export default connect(
    (state: ApplicationState) => ({
        ...state.userProfile
    }),
    ({
        ...userProfile.actionCreators
    })
)(Admin as any)