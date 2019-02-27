import * as React from 'react'
import Modal from 'react-responsive-modal'
import * as types from '../../store/types'
import Form from './markup/form'

type props = {
    close: () => void
}

export default class NewCert extends React.Component<props, {}> {

    render() {
        return (
            <Modal
                open={true}
                onClose={() => this.props.close()}
                showCloseIcon={true}
                classNames={{
                    overlay: 'custom-overlay',
                    modal: 'custom-modal'
                }}
                center>
                <Form />
            </Modal>
        )
    }
}