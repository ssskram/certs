
// hydrates the wholeeeeee store

import * as React from 'react'
import { connect } from 'react-redux'
import { ApplicationState } from '../../store'
import * as user from '../../store/user'
import * as userProfile from '../../store/userProfile'
import * as certifications from '../../store/certifications'
import * as certHistory from '../../store/certHistory'

class Hydrate extends React.Component<any, {}> {

    componentDidMount() {
        this.props.loadUser()
        this.props.loadCertifications()
        this.props.loadCertHistory()
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps)
    }

    public render() {
        return null
    }
}

export default connect(
    (state: ApplicationState) => ({
        ...state.user,
        ...state.userProfile,
        ...state.certifications,
        ...state.certHistory
    }),
    ({
        ...user.actionCreators,
        ...userProfile.actionCreators,
        ...certifications.actionCreators,
        ...certHistory.actionCreators
    })
)(Hydrate)