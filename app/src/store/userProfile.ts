
import { Action, Reducer } from 'redux'
import { AppThunkAction } from '.'
import * as constants from './constants'
import * as types from './types'

const unloadedState = {
    userProfile: {
        id: undefined,
        department: undefined,
        title: undefined,
        isAdmin: false
    } as types.userProfile
}

export const actionCreators = {
    isUserAdmin: (user): AppThunkAction<any> => async (dispatch) => {
        const response = await fetch("https://365proxy.azurewebsites.us/pghcerts/isAdmin?user=" + user.email, {
            method: 'get',
            headers: new Headers({
                'Authorization': 'Bearer ' + process.env.REACT_APP_365_API
            })
        })
        const adminStatus = await response.json()
        dispatch({ type: constants.setAdminStatus, adminStatus: adminStatus.isAdmin })
    },
    loadUserProfile: (user): AppThunkAction<any> => async (dispatch) => {
        const response = await fetch("https://365proxy.azurewebsites.us/pghcerts/userProfile?user=" + user.email, {
            method: 'get',
            headers: new Headers({
                'Authorization': 'Bearer ' + process.env.REACT_APP_365_API
            })
        })
        if (response.status != 404) {
            const profile = await response.json()
            dispatch({
                type: constants.setProfile, userProfile: profile[0]
            })
            return profile
        } else return undefined
    },
    setUserProfile: (profile): AppThunkAction<any> => (dispatch) => {
        const forSP = {
            Email: profile.user,
            Department: profile.department,
            Title: profile.title
        }
        fetch('https://365proxy.azurewebsites.us/pghcerts/userProfile', {
            method: 'POST',
            body: JSON.stringify(forSP),
            headers: new Headers({
                'Authorization': 'Bearer ' + process.env.REACT_APP_365_API,
                'Content-Type': 'application/json'
            })
        })
            .then(res => res.json())
            .then(data => {
                const storeProfile = {
                    id: data.id,
                    department: profile.department,
                    title: profile.title,
                }
                dispatch({ type: constants.setProfile, userProfile: storeProfile })
            })
    },
    updateUserProfile: (profile): AppThunkAction<any> => (dispatch) => {
        dispatch({ type: constants.setProfile, userProfile: profile })
        const forSP = {
            Email: profile.user,
            Department: profile.department,
            Title: profile.title
        }
        fetch('https://365proxy.azurewebsites.us/pghcerts/userProfile?id=' + profile.id, {
            method: 'PUT',
            body: JSON.stringify(forSP),
            headers: new Headers({
                'Authorization': 'Bearer ' + process.env.REACT_APP_365_API,
                'Content-Type': 'application/json'
            })
        })
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
                    title: state.userProfile.title,
                    id: state.userProfile.id
                }
            }
        case constants.setProfile:
            return {
                ...state,
                userProfile: {
                    isAdmin: state.userProfile.isAdmin,
                    department: action.userProfile.department,
                    title: action.userProfile.title,
                    id: action.userProfile.id
                }
            }
    }
    return state || unloadedState
}