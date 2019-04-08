import { Action, Reducer, combineReducers } from "redux";
import { AppThunkAction } from ".";
import * as constants from "./constants";
import * as types from "./types";

const unloadedState: types.uccHistory = {
  uccHistory: []
};

export const actionCreators = {
  loadUccHistory: (): AppThunkAction<any> => dispatch => {
    fetch("https://365proxy.azurewebsites.us/pghcerts/uccHistory", {
      method: "get",
      headers: new Headers({
        Authorization: "Bearer " + process.env.REACT_APP_365_API
      })
    })
      .then(res => res.json())
      .then(data => {
        dispatch({ type: constants.loadUccHistory, uccHistory: data });
      });
  },
  addUccRecord: (record): AppThunkAction<any> => dispatch => {
    const forSP = {
      User: record.user,
      Certification_x0020_ID: record.certId,
      Date: record.date
    };
    fetch("https://365proxy.azurewebsites.us/pghcerts/uccHistory", {
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
        dispatch({ type: constants.addUccRecord, uccRecord: record });
      });
  },
  updateUccRecord: (record): AppThunkAction<any> => dispatch => {
    const forSP = {
      Certification_x0020_ID: record.certId,
      Date: record.date
    };
    fetch(
      "https://365proxy.azurewebsites.us/pghcerts/updateUccRecord?id=" +
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
      dispatch({ type: constants.updateUccRecord, uccRecord: record })
    );
  },
  deleteUccRecord: (entryId): AppThunkAction<any> => dispatch => {
    dispatch({ type: constants.deleteUccRecord, entryId: entryId });
    fetch(
      "https://365proxy.azurewebsites.us/pghcerts/deleteUccRecord?id=" +
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

export const reducer: Reducer<types.uccHistory> = (
  state: types.uccHistory,
  incomingAction: Action
) => {
  const action = incomingAction as any;
  switch (action.type) {
    case constants.loadUccHistory:
      return { ...state, uccHistory: action.uccHistory };
    case constants.addUccRecord:
      return {
        ...state,
        uccHistory: state.uccHistory.concat(action.uccRecord)
      };
    case constants.updateUccRecord:
      return {
        ...state,
        uccHistory: state.uccHistory.map(record =>
          record.entryId === action.uccRecord.entryId
            ? {
                ...record,
                certId: action.uccRecord.certId,
                date: action.uccRecord.date
              }
            : record
        )
      };
    case constants.deleteUccRecord:
      let copy = state.uccHistory.slice();
      const index = copy.map(e => e.entryId).indexOf(action.entryId);
      copy.splice(index, 1);
      return {
        ...state,
        uccHistory: copy
      };
  }

  return state || unloadedState;
};
