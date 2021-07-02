const reducer = (state, action) => {
  if (action.type === "LOADING") {
    return { ...state, loading: true };
  }

  if (action.type === "NEW") {
    return {
      ...state,
      cocktails: action.payload,
      loading: false,
      prevSearchText: state.searchText,
    };
  }

  if (action.type === "SEARCH") {
    return {
      ...state,
      searchText: action.payload,
    };
  }
};

export default reducer;
