import * as React from "react";
import * as types from "../../../store/types";
import ReactTable from "react-table";
import "react-table/react-table.css";
import certificationName from "../functions/certificationName";

type props = {
  admin: boolean;
  certifications: types.certification[];
  certHistory: types.certRecord[];
  delete: (record: types.certRecord) => void;
  edit: (record: types.certRecord) => void;
};

export default class Certifications extends React.Component<props, {}> {
  render() {
    const columns = [
      {
        Header: "Certification",
        accessor: "certId",
        Cell: props => (
          <div>
            {certificationName(
              props.original.certId,
              this.props.certifications
            )}
          </div>
        )
      },
      {
        Header: "ICC Exp.",
        accessor: "iccExp"
      },
      {
        Header: "UCC Exp.",
        accessor: "uccExp"
      },
      {
        Header: "",
        accessor: "entryId",
        Cell: props => (
          <button
            onClick={() => this.props.edit(props.original)}
            className="btn btn-warning"
            title="Edit record"
          >
            <span className="glyphicon glyphicon-edit" />
          </button>
        ),
        maxWidth: 65
      },
      {
        Header: "",
        accessor: "entryId",
        Cell: props => (
          <button
            onClick={() => this.props.delete(props.original)}
            className="btn btn-danger"
            title="Delete record"
          >
            <span className="glyphicon glyphicon-remove" />
          </button>
        ),
        maxWidth: 65
      }
    ];

    if (this.props.admin) {
      columns.unshift({
        Header: "User",
        accessor: "user"
      });
    }

    return (
      <div>
        <ReactTable
          data={this.props.certHistory}
          columns={columns}
          loading={false}
          minRows={0}
          pageSize={this.props.admin ? 50 : 5}
          showPageSizeOptions={false}
          noDataText=""
        />
      </div>
    );
  }
}
