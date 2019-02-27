import * as React from 'react'
import * as types from '../../../store/types'

type props = {
    certifications: types.certification[]
    certHistory: types.certRecord[]
}

export default class Certifications extends React.Component<props, {}> {

    render() {
        return (
            <div>
                Certifications here
            </div>
        )
    }
}