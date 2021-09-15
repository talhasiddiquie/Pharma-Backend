import axios from "axios";
import ApiService from "../../ApiService";
import AuthToken from "../../setAuthToken";
import Cookies from "universal-cookie";
const cookies = new Cookies();

export const add_user = (user) => {
  return {
    type: "SET_USER",
    data: user,
  };
};

export const remove_user = () => {
  return {
    type: "REMOVE_USER",
    type: "LOGOUT",
  };
};

export const login_user = (values) => {
  return (dispatch) => {
    dispatch({ type: "LOGIN_USER" });
    axios
      .post(ApiService.getBaseUrl() + "/users/login", values)
      .then((res) => {
        console.log(res, "respone");
        if (res.data.message !== undefined) {
        } else {
          cookies.set("data", res.data);
          dispatch({ type: "LOGIN_USER_SUCCESS", user: res.data });
        }
      })
      .catch((error) => {
        dispatch({ type: "LOGIN_USER_FAILURE", user: error });
      });
  };
};

export const all_users = () => {
  return (dispatch) => {
    axios
      .get(
        ApiService.getBaseUrl() + "/users/all",
        // , { headers: { "Authorization": `Bearer ${token}` } }
        AuthToken()
      )
      .then((res) => {
        var data = res.data;
        if (data.message === "Token is not valid") {
          dispatch({ type: "TOKEN_INVALID", payload: data });
        } else if (data.message === "Auth token is not supplied") {
          dispatch({ type: "TOKEN_INVALID", payload: data });
        } else {
          dispatch({ type: "ALL_USERS", payload: res.data });
        }
      })
      .catch((error) => {
        dispatch({ type: "ALL_USERS_FAILURE", payload: error });
      });
  };
};

export const create_user = (values) => {
  return (dispatch) => {
    axios
      .post(ApiService.getBaseUrl() + "/users/signUp", values)
      .then((res) => {
        dispatch({ type: "CREATE_USER", payload: res.data.content });
      })
      .catch((error) => {
        dispatch({ type: "CREATE_USER_FAILURE", payload: error });
      });
  };
};

export const update_user = (values) => {
  return (dispatch) => {
    axios
      .post(ApiService.getBaseUrl() + "/users/userUpdate", values)
      .then((res) => {
        dispatch({ type: "UPDATE_USER", payload: res.data.content });
      })
      .catch((error) => {
        dispatch({ type: "UPDATE_USER_FAILURE", payload: error });
      });
  };
};

export const delete_user = (values) => {
  return (dispatch) => {
    axios
      .post(ApiService.getBaseUrl() + "/users/deleteUser", values)
      .then((res) => {
        dispatch({ type: "DELETE_USER", payload: values.objectId });
      })
      .catch((error) => {
        dispatch({ type: "DELETE_USER_FAILURE", payload: error });
      });
  };
};

export const user_loged_in = () => {
  return (dispatch) => {
    dispatch({ type: "USER_LOGGED_IN", payload: true });
  };
};

export const user_loged_in_checked = () => {
  return (dispatch) => {
    dispatch({ type: "USER_LOGGED_IN_CHECKED", payload: false });
  };
};
