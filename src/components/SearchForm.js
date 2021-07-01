import React from "react";
import { useGlobalContext } from "../context";

const SearchForm = () => {
  const { setSearchText, prevSearchText } = useGlobalContext();
  const searchRef = React.useRef(null);

  React.useEffect(() => {
    searchRef.current.value = prevSearchText
    searchRef.current.focus()
  }, [prevSearchText])

  return (
    <section className="search search">
      <form className="search-form" onSubmit={(e) => e.preventDefault()}>
        <div className="form-control">
          <label htmlFor="name">Search your favourite cocktail</label>
          <input
            type="text"
            id="name"
            ref={searchRef}
            onChange={() => setSearchText(searchRef.current.value)}
          ></input>
        </div>
      </form>
    </section>
  );
};

export default SearchForm;
