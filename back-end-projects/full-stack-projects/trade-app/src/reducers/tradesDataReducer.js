import { GET_INITIAL_TRADES_STATE, ACCEPT_TRADE_REQ, UPDATE_TRADE_STATE, UPDATE_TRADEREQUESTS_STATE } from '../constants/actionTypes';
import objectAssign from 'object-assign';
import initialState from './initialState';

export default function tradesDataReducer(state = initialState.trades, action) {
  let tradeRequests, item, newState;

  switch (action.type) {
    case GET_INITIAL_TRADES_STATE:
      return objectAssign({}, state, action.payload);
    case UPDATE_TRADE_STATE:
      return objectAssign({}, state, action.payload);
    case UPDATE_TRADEREQUESTS_STATE:
      tradeRequests = state.tradeRequests.filter(elem => {
        item = elem.itemRequests.filter(
          elemItem => elemItem.docId.toString() !== action.payload
        );
        return item.length > 0;
      });
      return objectAssign({}, state, { tradeRequests });
    case ACCEPT_TRADE_REQ:
      newState = objectAssign({}, state);
      newState.tradeRequests = newState.tradeRequests.map(elem => {
        const arr = objectAssign({}, elem);
        arr.itemRequests = arr.itemRequests.map(
          elemItem => {
            const itemRequest = objectAssign({}, elemItem);
            if (elemItem.docId.toString() === action.payload) {
              itemRequest.reqStatus = 'ACCEPTED';
            }
            return itemRequest;
          }
        );
        return arr;
      });
      return {
        proposedTrades: newState.proposedTrades,
        tradeRequests: newState.tradeRequests
      };
    default:
      return state;
  }
}
