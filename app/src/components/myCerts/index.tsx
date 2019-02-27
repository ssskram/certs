import * as React from 'react'
import { connect } from 'react-redux'
import { ApplicationState } from '../../store'
import * as user from '../../store/user'
import * as userProfile from '../../store/userProfile'
import * as certifications from '../../store/certifications'
import * as certHistory from '../../store/certHistory'
import * as types from '../../store/types'
import HydrateStore from '../utilities/hydrateStore'
import Messages from '../utilities/messages'
import UserProfile from './markup/userInfo'
import CertHistory from './markup/completedCerts'
import ExpirationDates from './markup/expirationDates'

type props = {
    user: types.user
    userProfile: types.userProfile
    certifications: types.certification[]
    certHistory: types.certRecord[]
}

export class Home extends React.Component<props, {}> {

    componentDidMount() {
        window.scrollTo(0, 0)
    }

    render() {
        return (
            <div className='col-md-8 col-md-offset-2'>
                <HydrateStore />
                <Messages />
                <UserProfile
                    user={this.props.user}
                    userProfile={this.props.userProfile}
                />
                {this.props.certifications.length > 0 && this.props.certHistory.length > 0 &&
                    <div>
                        <ExpirationDates
                            certifications={this.props.certifications}
                            certHistory={this.props.certHistory.filter(c => c.user == this.props.user.email)}
                        />
                        <CertHistory
                            certifications={this.props.certifications}
                            certHistory={this.props.certHistory.filter(c => c.user == this.props.user.email)}
                        />
                    </div>
                }
            </div>
        )
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
)(Home)