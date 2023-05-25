import { useEffect, useState } from "react";
import { httpClient } from "../../../util/Api";

export const useProvideAuth = () => {
  const [userLoginData, setUserLogin] = useState(null);
  const [authUser, setAuthUser] = useState(null);
  const [error, setError] = useState("");
  const [isLoadingUser, setLoadingUser] = useState(true);
  const [isLoading, setLoading] = useState(false);

  const fetchStart = () => {
    setLoading(true);
    setError("");
  };

  const fetchSuccess = () => {
    setLoading(false);
    setError("");
  };

  const fetchError = (error) => {
    setLoading(false);
    setError(error);
  };

  const userLogin = (user, callbackFun) => {
    fetchStart();
    httpClient
      .post("auth/login", user)
      .then(({ data }) => {
        if (data.status.code === 200) {
          fetchSuccess();
          httpClient.defaults.headers.common["Authorization"] = data.data.token;
          localStorage.setItem("token", data.data.token);
          localStorage.setItem("role", data.data.jobdesk);
          getAuthUser();
          if (callbackFun) callbackFun();
        } else {
          fetchError(data.error);
        }
      })
      .catch(function (error) {
        fetchError(error.message);
      });
  };

  const userSignup = (user, callbackFun) => {
    fetchStart();
    httpClient
      .post("auth/register", user)
      .then(({ data }) => {
        if (data.result) {
          fetchSuccess();
          localStorage.setItem("token", data.token.access_token);
          httpClient.defaults.headers.common["Authorization"] =
            "Bearer " + data.token.access_token;
          getAuthUser();
          if (callbackFun) callbackFun();
        } else {
          fetchError(data.error);
        }
      })
      .catch(function (error) {
        fetchError(error.message);
      });
  };

  const sendPasswordResetEmail = (email, callbackFun) => {
    fetchStart();

    setTimeout(() => {
      fetchSuccess();
      if (callbackFun) callbackFun();
    }, 300);
  };

  const confirmPasswordReset = (code, password, callbackFun) => {
    fetchStart();

    setTimeout(() => {
      fetchSuccess();
      if (callbackFun) callbackFun();
    }, 300);
  };

  const renderSocialMediaLogin = () => null;

  const userSignOut = (callbackFun) => {
    fetchStart();
    httpClient.defaults.headers.common["Authorization"] = "";
    localStorage.removeItem("token");
    setAuthUser(false);
    if (callbackFun) callbackFun();
    fetchSuccess();
    httpClient
      .post("auth/logout")
      .then(({ data }) => {
        if (data.result) {
          fetchSuccess();
          httpClient.defaults.headers.common["Authorization"] = "";
          localStorage.removeItem("token");
          setAuthUser(false);
          if (callbackFun) callbackFun();
        } else {
          fetchError(data.error);
        }
      })
      .catch(function (error) {
        fetchError(error.message);
      });
  };

  const getAuthUser = () => {
    fetchStart();
    httpClient
      .get("auth/get-profile")
      .then(({ data }) => {
        if (data.data) {
          fetchSuccess();
          setAuthUser(data.data);
        } else {
          fetchError(data.error);
        }
      })
      .catch(function (error) {
        httpClient.defaults.headers.common["Authorization"] = "";
        fetchError(error.message);
      });
  };

  // Subscribe to user on mount
  // Because this sets state in the callback it will cause any ...
  // ... component that utilizes this hook to re-render with the ...
  // ... latest auth object.

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      httpClient.defaults.headers.common["Authorization"] = token;
    }

    httpClient
      .get("auth/get-profile")
      .then(({ data }) => {
        if (data.data) {
          setAuthUser(data.data);
        }
        setLoadingUser(false);
      })
      .catch(function () {
        localStorage.removeItem("token");
        httpClient.defaults.headers.common["Authorization"] = "";
        setLoadingUser(false);
      });
  }, []);

  // Return the user object and auth methods
  return {
    isLoadingUser,
    isLoading,
    authUser,
    error,
    setError,
    setAuthUser,
    getAuthUser,
    userLogin,
    userSignup,
    userSignOut,
    renderSocialMediaLogin,
    sendPasswordResetEmail,
    confirmPasswordReset,
  };
};
