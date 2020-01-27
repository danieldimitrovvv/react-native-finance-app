import React, { useEffect, useRef } from "react";
import { NavigationActions } from "react-navigation";

import Navigator from "./Navigator";
import AuthRest from "../rests/AuthRest";

const NavigationContainer = props => {
  const navRef = useRef();
  const isAuth = AuthRest.isAuth();

  useEffect(() => {
    if (!isAuth) {
      navRef.current.dispatch(
        NavigationActions.navigate({ routeName: "Auth" })
      );
    }
  }, [isAuth]);

  return <Navigator ref={navRef} />;
};

export default NavigationContainer;
