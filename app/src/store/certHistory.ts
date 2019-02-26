
import { Action, Reducer, combineReducers } from 'redux'
import { AppThunkAction } from '.'
import * as constants from './constants'
import * as types from './types'

const unloadedState: types.certHistory = {
    certHistory: []
}

export const actionCreators = {
    loadCertHistory: (): AppThunkAction<any> => (dispatch) => {
        fetch("https://365proxy.azurewebsites.us/pghcerts/certHistory", {
            method: 'get',
            headers: new Headers({
                'Authorization': 'Bearer ' + process.env.REACT_APP_365_PROXY
            })
        })
            .then(res => res.json())
            .then(data => {
                dispatch({ type: constants.loadCertHistory, certHistory: data })
            })
    },
    addCertRecord: (record): AppThunkAction<any> => (dispatch) => {
        const forSP = {
            User: record.user,
            Certification_x0020_ID: record.certId,
            Date: record.date
        }
        fetch("https://365proxy.azurewebsites.us/pghcerts/certHistory", {
            method: 'post',
            body: JSON.stringify(forSP),
            headers: new Headers({
                'Authorization': 'Bearer ' + process.env.REACT_APP_365_PROXY,
                'Content-Type': 'application/json'
            })
        })
            .then(() => {
                dispatch({ type: constants.addCertRecord, certRecord: record })
            })
    },
    updateCertRecord: (record): AppThunkAction<any> => (dispatch) => {
        const forSP = {
            Certification_x0020_ID: record.certId,
            Date: record.date
        }
        fetch("https://365proxy.azurewebsites.us/pghcerts/updateCertRecord?id=" + record.entryId, {
            method: 'post',
            body: JSON.stringify(forSP),
            headers: new Headers({
                'Authorization': 'Bearer ' + process.env.REACT_APP_365_PROXY,
                'Content-Type': 'application/json'
            })
        })
            .then(() => {
                dispatch({ type: constants.updateCertRecord, certRecord: record })
            })
    }
}

export const reducer: Reducer<types.certHistory> = (state: types.certHistory, incomingAction: Action) => {
    const action = incomingAction as any
    switch (action.type) {
        case constants.loadCertHistory:
            return { ...state, certHistory: action.certHistory }
        case constants.addCertRecord:
            return { ...state, certHistory: state.certHistory.concat(action.certRecord) }
        case constants.updateCertRecord:
            return {
                ...state,
                myCourses: state.certHistory.map(record => record.entryId === action.entryId ? {
                    ...record,
                    certId: action.certRecord.certId,
                    date: action.certRecord.date
                } : record
                )
            };
    }

    return state || unloadedState
}