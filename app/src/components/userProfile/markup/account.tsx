
// displays users account & profile information within nav bar
// button calls updateProfile modal from parent

import * as React from 'react'
import * as types from '../../../store/types'
import * as style from '../style'

type props = {
    user: types.user,
    setState: (object) => void
}

export default class AccountContainer extends React.Component<props, {}> {

    render() {
        const {
            user,
            setState
        } = this.props

        return (

            <div style={style.profileButtons} className="navbar-right">
                <div className='pull-right'>
                    <button onClick={() => window.location.href = "/logout"} className="btn btn-link navbar-logout-btn">Logout</button>
                </div>
                <div className='pull-right'>
                    {user &&
                        <button onClick={() => setState({ updateProfile: true })} className='btn btn-secondary'><span className='glyphicon glyphicon-user nav-glyphicon'></span>{user.name}</button>
                    }
                </div>
            </div>
        )
    }
}