
import { Action, Reducer } from 'redux'
import { AppThunkAction } from '.'
import * as constants from './constants'
import * as types from './types'

const unloadedState = {
    userProfile: {
        department: '...loading',
        title: '...loading',
        isAdmin: false
    } as types.userProfile
}

export const actionCreators = {
    isUserAdmin: (user): AppThunkAction<any> => async (dispatch) => {
        const response = await fetch("https://365proxy.azurewebsites.us/pghcerts/isAdmin?user=" + user.email, {
            method: 'get',
            headers: new Headers({
                'Authorization': 'Bearer ' + process.env.REACT_APP_365_PROXY
            })
        })
        const adminStatus = await response.json()
        dispatch({ type: constants.setAdminStatus, adminStatus: adminStatus.isAdmin })
    },
    loadUserProfile: (user): AppThunkAction<any> => async (dispatch) => {
        const response = await fetch("https://365proxy.azurewebsites.us/pghcerts/userProfile?user=" + user.email, {
            method: 'get',
            headers: new Headers({
                'Authorization': 'Bearer ' + process.env.REACT_APP_365_PROXY
            })
        })
        if (response.status != 404) {
            const profile = await response.json()
            dispatch({
                type: constants.setProfile, userProfile: profile
            })
            return profile
        } else return undefined
    },
    setUserProfile: (profile): AppThunkAction<any> => (dispatch) => {
        fetch('https://365proxy.azurewebsites.us/pghcerts/userProfile', {
            method: 'POST',
            body: JSON.stringify(profile),
            headers: new Headers({
                'Authorization': 'Bearer ' + process.env.REACT_APP_365_PROXY,
                'Content-Type': 'application/json'
            })
        })
        dispatch({ type: constants.setProfile, userProfile: profile })
    }
}

export const reducer: Reducer<types.userProfile> = (state: any, incomingAction: Action) => {
    const action = incomingAction as any
    switch (action.type) {
        case constants.setAdminStatus:
            return {
                ...state,
                userProfile: {
                    isAdmin: action.adminStatus,
                    department: state.userProfile.department,
                    title: state.userProfile.title
                }
            }
        case constants.setProfile:
            return {
                ...state,
                userProfile: {
                    isAdmin: state.userProfile.isAdmin,
                    department: action.userProfile.department,
                    title: action.userProfile.title
                }
            }
    }
    return state || unloadedState
}