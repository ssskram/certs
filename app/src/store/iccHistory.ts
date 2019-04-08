import { Action, Reducer, combineReducers } from "redux";
import { AppThunkAction } from ".";
import * as constants from "./constants";
import * as types from "./types";

const unloadedState: types.iccHistory = {
  iccHistory: []
};

export const actionCreators = {
  loadIccHistory: (): AppThunkAction<any> => dispatch => {
    fetch("https://365proxy.azurewebsites.us/pghcerts/iccHistory", {
      method: "get",
      headers: new Headers({
        Authorization: "Bearer " + process.env.REACT_APP_365_API
      })
    })
      .then(res => res.json())
      .then(data => {
        dispatch({ type: constants.loadIccHistory, iccHistory: data });
      });
  },
  addIccRecord: (record): AppThunkAction<any> => dispatch => {
    const forSP = {
      User: record.user,
      Certification_x0020_ID: record.certId,
      Date: record.date
    };
    fetch("https://365proxy.azurewebsites.us/pghcerts/iccHistory", {
      method: "post",
      body: JSON.stringify(forSP),
      headers: new Headers({
        Authorization: "Bearer " + process.env.REACT_APP_365_API,
        "Content-Type": "application/json"
      })
    })
      .then(response => response.json())
      .then(data => {
        record.entryId = data.entryId;
        dispatch({ type: constants.addIccRecord, iccRecord: record });
      });
  },
  updateIccRecord: (record): AppThunkAction<any> => dispatch => {
    const forSP = {
      Certification_x0020_ID: record.certId,
      Date: record.date
    };
    fetch(
      "https://365proxy.azurewebsites.us/pghcerts/updateIccRecord?id=" +
        record.entryId,
      {
        method: "post",
        body: JSON.stringify(forSP),
        headers: new Headers({
          Authorization: "Bearer " + process.env.REACT_APP_365_API,
          "Content-Type": "application/json"
        })
      }
    ).then(() =>
      dispatch({ type: constants.updateIccRecord, iccRecord: record })
    );
  },
  deleteIccRecord: (entryId): AppThunkAction<any> => dispatch => {
    dispatch({ type: constants.deleteIccRecord, entryId: entryId });
    fetch(
      "https://365proxy.azurewebsites.us/pghcerts/deleteIccRecord?id=" +
        entryId,
      {
        method: "delete",
        headers: new Headers({
          Authorization: "Bearer " + process.env.REACT_APP_365_API,
          "Content-Type": "application/json"
        })
      }
    );
  }
};

export const reducer: Reducer<types.iccHistory> = (
  state: types.iccHistory,
  incomingAction: Action
) => {
  const action = incomingAction as any;
  switch (action.type) {
    case constants.loadIccHistory:
      return { ...state, iccHistory: action.iccHistory };
    case constants.addIccRecord:
      return {
        ...state,
        iccHistory: state.iccHistory.concat(action.iccRecord)
      };
    case constants.updateIccRecord:
      return {
        ...state,
        iccHistory: state.iccHistory.map(record =>
          record.entryId === action.iccRecord.entryId
            ? {
                ...record,
                certId: action.iccRecord.certId,
                date: action.iccRecord.date
              }
            : record
        )
      };
    case constants.deleteIccRecord:
      let copy = state.iccHistory.slice();
      const index = copy.map(e => e.entryId).indexOf(action.entryId);
      copy.splice(index, 1);
      return {
        ...state,
        iccHistory: copy
      };
  }

  return state || unloadedState;
};
