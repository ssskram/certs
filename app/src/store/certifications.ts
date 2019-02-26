import { Action, Reducer } from 'redux'
import { AppThunkAction } from '.'
import * as constants from './constants'
import * as types from './types'

const unloadedState: types.certifications = {
    certifications: []
}

export const actionCreators = {
    loadItems: (): AppThunkAction<any> => (dispatch) => {
        fetch("https://365proxy.azurewebsites.us/pghcerts/certTypes", {
            method: 'get',
            headers: new Headers({
                'Authorization': 'Bearer ' + process.env.REACT_APP_365_PROXY
            })

        })
            .then(res => res.json())
            .then(data => {
                dispatch({ type: constants.loadCerts, certifications: data })
            })
    }
}

export const reducer: Reducer<types.certifications> = (state: types.certifications, incomingAction: Action) => {
    const action = incomingAction as any
    switch (action.type) {
        case constants.loadCerts:
            return { ...state, certifications: action.certifications }
    }
    return state || unloadedState
}