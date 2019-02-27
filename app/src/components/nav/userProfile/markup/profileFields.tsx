
// fields for profile information, currently just department
// on change, triggers setUserProfile() from userProfile store

import * as React from 'react'
import { connect } from 'react-redux'
import { ApplicationState } from '../../../../store'
import * as types from '../../../../store/types'
import * as user from '../../../../store/user'
import * as userProfile from '../../../../store/userProfile'
import * as style from '../style'
import Select from '../../../formElements/select'
import { Helmet } from "react-helmet"
import Spinner from '../../../utilities/spinner'

type props = {
    user: types.user
    userProfile: types.userProfile
    setUserProfile: (object) => void
    updateUserProfile: (object) => void
}

type state = {
    department: any
    title: any,
    spinner: boolean
}

export class SelectDepartmentTitle extends React.Component<props, state> {
    constructor(props) {
        super(props)
        this.state = {
            department: props.userProfile.department ? { value: props.userProfile.department, label: props.userProfile.department } : undefined,
            title: props.userProfile.title ? { value: props.userProfile.title, label: props.userProfile.title } : undefined,
            spinner: false
        }
        this.setUserProfile = this.setUserProfile.bind(this)
    }

    componentWillUpdate(nextProps, nextState) {
        if (nextState.department && nextState.title && !nextState.spinner) {
            this.setState({ spinner: true })
            this.setUserProfile(nextState)
        }
    }

    setUserProfile(state) {
        if (!this.props.userProfile.id) {
            this.props.setUserProfile({
                user: this.props.user.email,
                department: state.department.value,
                title: state.title.value
            })
        } else {
            this.props.updateUserProfile({
                id: this.props.userProfile.id,
                user: this.props.user.email,
                department: state.department.value,
                title: state.title.value
            })
        }
    }

    render() {
        return (
            <div>
                {this.state.spinner &&
                    <Spinner notice='...saving your profile...' />
                }
                <Helmet>
                    <style>{style.dropdownStyle}</style>
                </Helmet>
                <Select
                    value={this.state.department}
                    header=""
                    placeholder='Select department'
                    onChange={department => this.setState({ department })}
                    multi={false}
                    options={style.departments}
                />
                <Select
                    value={this.state.title}
                    header=""
                    placeholder='Select job title'
                    onChange={title => this.setState({ title })}
                    multi={false}
                    options={style.jobTitles}
                />
            </div>
        )
    }
}

export default connect(
    (state: ApplicationState) => ({
        ...state.userProfile,
        ...state.user
    }),
    ({
        ...userProfile.actionCreators,
        ...user.actionCreators
    })
)(SelectDepartmentTitle as any)