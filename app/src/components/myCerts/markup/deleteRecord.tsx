import * as React from 'react'
import * as types from '../../../store/types'
import Modal from 'react-responsive-modal'

type props = {
    close: () => void
}

export default class DeleteRecord extends React.Component<props, {}> {

    render() {
        return (
            <Modal
                open={true}
                onClose={() => this.props.close()}
                classNames={{
                    overlay: 'custom-overlay',
                    modal: 'custom-modal'
                }}
                showCloseIcon={true}
                center>
                Delete confirmation here
            </Modal>
        )
    }
}