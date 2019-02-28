import * as React from 'react'
import * as types from '../../../store/types'
import getUserInfo from '../functions/getUserProfile'
import expirationDate from '../../certificationRecords/functions/calculateExpired'

type props = {
    filter: string
    certifications: types.certification[]
    certHistory: types.certRecord[]
}

type state = {
    userProfile: types.userProfile
}

export default class UserInfo extends React.Component<props, state> {
    constructor(props) {
        super(props)
        this.state = {
            userProfile: undefined
        }
    }

    async componentDidMount() {
        this.setState({
            userProfile: await getUserInfo(this.props.filter)
        })
    }

    render() {
        return (
            <div className='panel text-center'>
                <div className='panel-body'>
                    <div className='col-md-6'>
                        {this.state.userProfile ?
                            <div>
                                <h4 className='oswald-header'>{this.props.filter}</h4>
                                <div><i>{this.state.userProfile.title}</i></div>
                                <div>{this.state.userProfile.department}</div>
                            </div>
                            :
                            <div>...loading user profile...</div>
                        }
                    </div>
                    <div className='col-md-6'>
                        <div className='col-md-6'>
                            <h5>ICC Expiration</h5>
                            <h4 className='crimson-text'><b>{expirationDate(this.props.certHistory, this.props.certifications, "ICC")}</b></h4>
                        </div>
                        <div className='col-md-6'>
                            <h5>UCC Expiration</h5>
                            <h4 className='crimson-text'><b>{expirationDate(this.props.certHistory, this.props.certifications, "UCC")}</b></h4>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}