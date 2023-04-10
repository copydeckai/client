import useNavigator from "@copydeck/hooks/useNavigator";
import axios from "axios";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState
} from "react";

const initialState = {
  user: JSON.parse(localStorage.getItem("persist:root")) || null,
  loading: false,
  error: null
};

interface AuthContextProviderProps {
  children: ReactNode;
}

interface AuthContext {
  user: any;
  login: any;
  getUser: any;
  isActive: boolean;
  signup: any;
  resendConfirm: () => void;
  dispatch: any;
  loading: boolean;
  showConfirmation: boolean;
  error: any;
  checkForgot: any;
  setUser: (any) => void;
  updateUserAccount: any;
}

const AuthContext = createContext({} as AuthContext);

export function useAuth() {
  return useContext(AuthContext);
}
const AuthReducer = (state, action) => {
  switch (action.type) {
    case "loginStart":
      return {
        user: null,
        loading: true,
        error: null
      };
    case "loginSuccess":
      return {
        user: action.payload,
        loading: false,
        error: null
      };
    case "signupStart":
      return {
        user: null,
        loading: true,
        error: null
      };
    case "signupSuccess":
      return {
        user: action.payload,
        loading: false,
        showConfirmation: true,
        error: null
      };
    case "actionFailure":
      return {
        user: null,
        loading: false,
        error: action.payload
      };
    case "logout":
      return {
        user: null,
        loading: false,
        error: null
      };
    default:
      return state;
  }
};

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const stateAndDispatch = useReducer(AuthReducer, initialState);
  const [state, dispatch] = stateAndDispatch;
  const [user, setUser] = useState(initialState.user);
  const [isActive, setIsActive] = useState(true);
  const navigate = useNavigator();

  const dataFetchedRef = useRef(false);

  const fetchData = () => {
    axios.get(`/auth/fetch`).then(({ data }) => {
      if (data.isActive) {
        setUser(data);
      }
    });
  };

  useEffect(() => {
    if (dataFetchedRef.current) {
      return;
    }
    dataFetchedRef.current = true;
    // if (!user) {
    //   fetchData();
    // }
    setTimeout(() => {
      fetchData();
    }, 2000);
  }, [user]);

  const getUser = async id => {
    await axios.get(`/users/${id}/fetch`);
  };

  const updateUserAccount = async payload => {
    const { data } = await axios.put(`/users/update`, payload, {
      withCredentials: true
    });
    fetchData();
    return data;
  };

  const login = async payload => {
    const { data } = await axios.post(`/auth/login`, payload, {
      withCredentials: true
    });

    if (data.isActive) {
      setUser(data);
      navigate("/");
    } else {
      setIsActive(false);
    }
  };

  const signup = async payload => {
    await axios.post(`/auth/register`, payload);
  };

  const resendConfirm = async () => {
    const { data } = await axios.post(`/auth/resend-confirm`);
    return data;
  };

  const checkForgot = async payload => {
    const { data } = await axios.post(`/auth/forgot-password`, payload);
    return data;
  };

  useEffect(() => {
    localStorage.setItem("persist:root", JSON.stringify(user));
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        setUser,
        user,
        isActive,
        loading: state.loading,
        error: state.error,
        showConfirmation: state.showConfirmation,
        dispatch,
        getUser,
        login,
        signup,
        resendConfirm,
        checkForgot,
        updateUserAccount
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
