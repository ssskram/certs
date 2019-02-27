import * as React from 'react'
import * as types from '../../../store/types'
import ReactTable from "react-table"
import "react-table/react-table.css"
import certificationName from '../functions/certificationName'

type props = {
    certifications: types.certification[]
    certHistory: types.certRecord[]
}

export default class Certifications extends React.Component<props, {}> {

    render() {

        const columns = [{
            Header: 'Certification',
            accessor: 'certId',
            Cell: props => <div>{certificationName(props.original.certId, this.props.certifications)}</div>
        }, {
            Header: 'Expires',
            accessor: 'date'
        }, {
            Header: '',
            accessor: 'entryId',
            Cell: props => <button onClick={props => console.log(props)} className='btn btn-warning' title='Edit record'><span className='glyphicon glyphicon-edit'></span></button>,
            maxWidth: 65
        }, {
            Header: '',
            accessor: 'entryId',
            Cell: props => <button onClick={props => console.log(props)} className='btn btn-danger' title='Delete record'><span className='glyphicon glyphicon-remove'></span></button>,
            maxWidth: 65
        }]

        return (
            <div style={{ margin: '25px 0px' }}>
                <ReactTable
                    data={this.props.certHistory.sort((a, b) => +new Date(a.date) - +new Date(b.date))}
                    columns={columns}
                    loading={false}
                    minRows={0}
                    pageSize={5}
                    showPageSizeOptions={false}
                    noDataText=''
                />
            </div>
        )
    }
}