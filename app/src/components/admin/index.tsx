import * as React from 'react'
import { connect } from 'react-redux'
import { ApplicationState } from '../../store'
import * as types from '../../store/types'
import * as userProfile from '../../store/userProfile'
import * as certifications from '../../store/certifications'
import * as certHistory from '../../store/certHistory'
import CertHistory from '../certificationRecords/markup/certTable'
import DeleteRecord from '../certificationRecords/markup/deleteRecord'
import CertForm from '../certificationRecords/markup/input'
import { Redirect } from 'react-router-dom'
import Filter from './markup/filter'
import UserInfo from './markup/userInfo'

type props = {
    userProfile: types.userProfile
    certifications: types.certification[]
    certHistory: types.certRecord[]
    deleteCertRecord: (entryId: number) => void
    updateCertRecord: (record: object) => void
}

type state = {
    certHistory: types.certRecord[]
    redirect: boolean
    delete: boolean
    edit: boolean
    selectedRecord: types.certRecord
    filter: string
}

export class Admin extends React.Component<props, state> {
    constructor(props) {
        super(props)
        this.state = {
            certHistory: props.certHistory,
            redirect: false,
            delete: false,
            edit: false,
            selectedRecord: undefined,
            filter: undefined
        }
    }

    componentDidMount() {
        if (!this.props.userProfile.isAdmin) {
            this.setState({ redirect: true })
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.filter != prevState.filter) {
            if (this.state.filter) {
                this.setState({ certHistory: this.props.certHistory.filter(h => h.user == this.state.filter) })
            } else {
                this.setState({ certHistory: this.props.certHistory })
            }
        }
    }

    componentWillReceiveProps(nextProps) {
        if (!this.state.filter) {
            this.setState({ certHistory: nextProps.certHistory })
        }
    }

    delete = (record) => this.setState({ delete: true, selectedRecord: record })
    edit = (record) => this.setState({ edit: true, selectedRecord: record })
    close = () => this.setState({ edit: false, delete: false, selectedRecord: undefined })

    render() {

        if (this.state.redirect) {
            return <Redirect push to={'/'} />
        }

        return (
            <div className='col-md-10 col-md-offset-1' style={{ marginBottom: '50px' }}>
                <h2>Certifications <b>Admin</b></h2>
                <hr />
                <Filter
                    setState={this.setState.bind(this)}
                    certHistory={this.props.certHistory}
                    filter={this.state.filter}
                />
                {this.state.filter &&
                    <UserInfo
                        certHistory={this.props.certHistory.filter(h => h.user == this.state.filter)}
                        filter={this.state.filter}
                    />
                }
                {this.props.certHistory &&
                    <CertHistory
                        admin={true}
                        certifications={this.props.certifications}
                        certHistory={this.state.certHistory}
                        delete={this.delete.bind(this)}
                        edit={this.edit.bind(this)}
                    />
                }
                {this.state.delete &&
                    <DeleteRecord
                        close={this.close.bind(this)}
                        selectedRecord={this.state.selectedRecord}
                        deleteRecord={this.props.deleteCertRecord.bind(this)}
                    />
                }
                {this.state.edit &&
                    <CertForm
                        user={undefined}
                        cert={this.state.selectedRecord}
                        certifications={this.props.certifications}
                        close={this.close.bind(this)}
                        updateCertRecord={this.props.updateCertRecord.bind(this)}
                        addCertRecord={undefined}
                    />
                }
            </div>

        )
    }
}

export default connect(
    (state: ApplicationState) => ({
        ...state.userProfile,
        ...state.certifications,
        ...state.certHistory
    }),
    ({
        ...userProfile.actionCreators,
        ...certifications.actionCreators,
        ...certHistory.actionCreators
    })
)(Admin as any)