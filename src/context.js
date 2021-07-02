import React, { useContext, useEffect, useReducer } from "react";
import { useCallback } from "react";
import reducer from "./reducer";

const url = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";
const AppContext = React.createContext();

const defaultState = {
  loading: false,
  searchText: "",
  cocktails: [],
  prevSearchText: "",
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, defaultState);

  const fetchDrinks = useCallback(async () => {
    dispatch({ type: "LOADING" });
    try {
      const response = await fetch(`${url}${state.searchText}`);
      const data = await response.json();
      let newCocktails;

      if (data.drinks) {
        newCocktails = data.drinks.map((item) => {
          const { idDrink, strDrink, strDrinkThumb, strAlcoholic, strGlass } =
            item;
          return {
            id: idDrink,
            name: strDrink,
            image: strDrinkThumb,
            info: strAlcoholic,
            glass: strGlass,
          };
        });
      } else {
        newCocktails = [];
      }

      dispatch({ type: "NEW", payload: newCocktails });
    } catch (error) {
      console.log(error);
    }
  }, [state.searchText]);

  useEffect(() => {
    fetchDrinks();
  }, [state.searchText, fetchDrinks]);

  return (
    <AppContext.Provider value={{ state }}>{children}</AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
