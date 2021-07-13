export const reducerOne = (state = {count: 0}, action) => {
  switch (action.type) {
    case 'add_count':
      return {
        count: state.count + 1,
      };
    default:
      return state;
  }
};
