/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-namespace */
import "./App.css";
import {
  defineCustomElementLoginForm,
  defineCustomElementShellPage,
} from "@tf-front-end/frontenduicomponents/components";
import { User } from "@tf-front-end/frontendchassis";
import { useEffect, useState } from "react";

defineCustomElementLoginForm();
defineCustomElementShellPage();

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "login-form": any; // specify the type of your custom element here
      "shell-page": any; // specify the type of your custom element here
    }
  }
}

function App() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const fechassisUser = new User(); // instantiate

  const onHandleLogin = async (e: Event) => {
    const customEvent = e as CustomEvent;
    console.info("handling login:", customEvent.detail);
    const { username, password } = customEvent.detail;
    const request = { username, password };
    await fechassisUser.login(request);
  };

  useEffect(() => {
    const handleShowLoginForm = () => {
      console.info("handling logonTimeout event");
      setIsLoggedIn(false);
    };

    const handleLoginSuccess = () => {
      console.info("loginSuccess event received");
      setIsLoggedIn(true);
    };

    fechassisUser.setEventHandler("logonTimeout", handleShowLoginForm);
    fechassisUser.setEventHandler("loginSuccess", handleLoginSuccess);

    console.info("calling assertLogon");
    fechassisUser.assertLogon();

    const loginForm = document.querySelector("login-form");
    if (loginForm) {
      loginForm.addEventListener("login", onHandleLogin as EventListener);
    }
  }, []);

  return (
    <>
      {isLoggedIn ? (
        // <div>Logged in</div> // or homepage
        <shell-page></shell-page>
      ) : (
        <login-form handleLogin={onHandleLogin}></login-form>
      )}
    </>
  );
}

export default App;
