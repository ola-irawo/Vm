const defaultOptions = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
};

const constructURL = (url, id, params) => {
  let urlWithParams = url;
  if (id) {
    urlWithParams += `/${id}`;
  }
  if (params) {
    const queryString = Object.keys(params)
      .map((key) => `${key}=${encodeURIComponent(params[key])}`)
      .join("&");
    if (queryString) {
      urlWithParams += `?${queryString}`;
    }
  }
  return urlWithParams;
};

export const getFetch = async (
  url,
  options,
  id,
  params = {},
  responseFormat = "json"
) => {
  const constructedURL = constructURL(url, id, params);
  const mergedOptions = { ...defaultOptions, ...options };
  console.log("sending");

  try {
    const response = await fetch(constructedURL, mergedOptions);
    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.status}`);
    }

    let data;
    switch (responseFormat) {
      case "json":
        data = await response.json();
        break;
      case "text":
        data = await response.text();
        break;
      case "bytes":
        data = await response.arrayBuffer();
        break;
      default:
        throw new Error(`Invalid response format: ${responseFormat}`);
    }

    console.log(data);
    return data;
  } catch (error) {
    if (error.status === 404) {
      console.error(`Resource not found: ${url}`);
    } else if (error.status === 500) {
      console.error(`Internal server error: ${url}`);
    } else {
      console.error(`General fetch error: ${error.message}`);
    }
    return null;
  }
};

// import React, { useState, useEffect } from 'react';
// import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';

// const useAuth = () => {
//   const [currentUser, setCurrentUser] = useState(null);

//   useEffect(() => {
//     const auth = getAuth();
//     auth.onAuthStateChanged((user) => {
//       if (user) {
//         setCurrentUser(user);
//       } else {
//         setCurrentUser(null);
//       }
//     });
//   }, []);

//   const login = async (email, password) => {
//     const auth = getAuth();
//     try {
//       await signInWithEmailAndPassword(auth, email, password);
//       setCurrentUser(auth.currentUser);
//     } catch (error) {
//       console.error('Error logging in:', error);
//     }
//   };

//   const logout = async () => {
//     const auth = getAuth();
//     await signOut(auth);
//     setCurrentUser(null);
//   };

//   return { currentUser, login, logout };
// };

// export default useAuth;
