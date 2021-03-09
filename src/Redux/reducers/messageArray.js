export default function(state = {
    array:[],
    length:0
  }, action) {
    switch (action.type) {
      case "ADD_MESSAGE": {
        return {
          ...state,
          array:action.payload.array,
          length:action.payload.length
        }
          }
      default:
        return state;
    }
  }