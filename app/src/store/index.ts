import * as user from './user'
import * as types from './types'
import * as messages from './messages'
import * as userProfle from './userProfile'
import * as certifications from './certifications'
import * as certHistory from './certHistory'

export interface ApplicationState {
    user: types.user,
    messages: types.messsage,
    userProfile: types.userProfile,
    certifications: types.certifications,
    certHistory: types.certHistory
}

export const reducers = {
    user: user.reducer,
    messages: messages.reducer,
    userProfile: userProfle.reducer,
    certifications: certifications.reducer,
    certHistory: certHistory.reducer
}

export interface AppThunkAction<TAction> {
    (dispatch: (action: TAction) => void, getState: () => ApplicationState): void;
}