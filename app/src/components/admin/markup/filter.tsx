import * as React from 'react'
import * as types from '../../../store/types'
import Select from 'react-select'

type props = {
    filter: string
    certHistory: types.certRecord[]
    setState: (stateObj: object) => void
}

export default class Filter extends React.Component<props, {}> {

    dropdown() {
        let selects = [] as any
        this.props.certHistory.forEach(i => {
            selects.push({ value: i.user, label: i.user })
        })
        selects.sort((a, b) => a.label.localeCompare(b.label))
        return Array.from(selects.reduce((m, t) => m.set(t.value, t), new Map()).values())
    }

    render() {
        return (
            <div className='row'>
                <div className={this.props.filter ? 'col-sm-6' : 'col-md-12'} style={{ margin: '10px 0px' }}>
                    <Select
                        placeholder='Search for user'
                        value={this.props.filter ? { value: this.props.filter, label: this.props.filter } : null}
                        onChange={f => this.props.setState({ filter: f.value })}
                        options={this.dropdown()}
                    />
                </div>
                {this.props.filter &&
                    <div className='col-sm-6' style={{ margin: '10px 0px' }}>
                        <button
                            className='btn btn-warning'
                            onClick={() => this.props.setState({ filter: undefined })}
                            style={{ width: '100%' }}
                        >Clear</button>
                    </div>
                }
            </div>
        )
    }
}