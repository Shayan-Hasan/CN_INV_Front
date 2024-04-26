//Controls Settings of the Application

import { createContext, useContext, useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
const StateContext = createContext();

const initialState = {
  chat: false,
  cart: false,
  userProfile: true,
  notification: false,
};

export const ContextProvider = ({ children }) => {
  const [activeMenu, setActiveMenu] = useState(true);
  const [activeProdMenu, setActiveProdMenu] = useState(false);
  const [activeProdMenuId, setActiveProdMenuId] = useState({
    product_id: null,
    store_id: null,
  });
  const [isClicked, setIsClicked] = useState(initialState);
  const [screenSize, setScreenSize] = useState(undefined);
  const [currentColor, setCurrentColor] = useState("#03C9D7");
  const [currentMode, setCurrentMode] = useState("Light");
  const [themeSettings, setThemeSettings] = useState(false);

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--my-current-color",
      currentColor
    );
  }, [currentColor]);

  useEffect(() => {
    if (!localStorage.getItem("themeMode")) {
      localStorage.setItem("themeMode", currentMode);
    }
    const storedThemeMode = localStorage.getItem("themeMode");
    setCurrentMode(storedThemeMode);

    if (!localStorage.getItem("colorMode")) {
      localStorage.setItem("colorMode", currentColor);
    }
    const storedColorMode = localStorage.getItem("colorMode");
    setCurrentColor(storedColorMode);
    //console.log(storedThemeMode, storedColorMode);
  }, []);

  const handleLogoutClick = async (event) => {
    // event.preventDefault();
    try {
      const userData = {
        user_id: null,
        role: null,
      };
      localStorage.setItem("userData", JSON.stringify(userData));
      window.location.reload();
      return <Navigate to="/login" />;
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const setMode = (e) => {
    setCurrentMode(e.target.value);
    localStorage.setItem("themeMode", e.target.value);
    setThemeSettings(false);
  };

  const setColor = (color) => {
    setCurrentColor(color);
    localStorage.setItem("colorMode", color);
    setThemeSettings(false);
  };

  const handleClick = (clicked) => {
    setIsClicked({ ...initialState, [clicked]: true });
  };

  return (
    <StateContext.Provider
      value={{
        activeMenu,
        setActiveMenu,
        activeProdMenu,
        setActiveProdMenu,
        activeProdMenuId,
        setActiveProdMenuId,
        isClicked,
        setIsClicked,
        handleClick,
        screenSize,
        setScreenSize,
        currentColor,
        currentMode,
        setMode,
        setColor,
        handleLogoutClick,
        themeSettings,
        setThemeSettings,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
