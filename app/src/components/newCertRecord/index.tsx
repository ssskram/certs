import * as React from 'react'
import Modal from 'react-responsive-modal'
import * as types from '../../store/types'
import Form from './markup/form'

type props = {
    user: types.user
    userProfile: types.userProfile
    certifications: types.certification[]
    certHistory: types.certRecord[]
}

export default class NewCert extends React.Component<props, {}> {

    render() {
        return (
            <Modal
                open={true}
                onClose={() => { }}
                showCloseIcon={false}
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