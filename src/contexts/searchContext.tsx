import axios from "axios";
import React, {
  createContext,
  ReactNode,
  useContext,
  useReducer,
  useState
} from "react";

const initialState = {
  // searchResults: null,
  loading: false,
  error: null
};

interface SearchContextProviderProps {
  children: ReactNode;
}

interface SearchContext {
  searchResults: any;
  dispatch: any;
  loading: boolean;
  setSearchResults: (any) => void;
  error: any;
  keyword: string;
  fetchSearchResults: any;
}

const SearchContext = createContext({} as SearchContext);

export function useSearch() {
  return useContext(SearchContext);
}

const SearchReducer = (state, action) => {
  switch (action.type) {
    case "searchStart":
      return {
        loading: true,
        error: null
      };
    case "newSearch":
      return {
        loading: true,
        error: null
      };
    case "resetSearch":
      return initialState;
    case "searchSuccess":
      return {
        loading: false,
        error: null
      };
    case "actionFailure":
      return {
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};

export function SearchContextProvider({
  children
}: SearchContextProviderProps) {
  const stateAndDispatch = useReducer(SearchReducer, initialState);
  const [state, dispatch] = stateAndDispatch;
  const [searchResults, setSearchResults] = useState(null);
  const [keyword, setKeyword] = useState("");

  const fetchSearchResults = async payload => {
    await axios.get(`/story/stories?search=${payload}`).then(({ data }) => {
      setSearchResults(data);
    });
    setKeyword(payload);
  };

  return (
    <SearchContext.Provider
      value={{
        searchResults,
        setSearchResults,
        keyword,
        loading: state.loading,
        error: state.error,
        fetchSearchResults,
        dispatch
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}
