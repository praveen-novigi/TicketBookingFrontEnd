export default function(state = "", action) {
  switch (action.type) {
    case "SELECT_TODO": {
        state = action.payload
      return state
        }
    default:
      return state;
  }
}