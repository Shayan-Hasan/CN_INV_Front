export default class TimeoutUtility {
  static timeoutRef = null;

  static resetTimeout = (callback) => {
    clearTimeout(TimeoutUtility.timeoutRef);
    TimeoutUtility.timeoutRef = setTimeout(() => {
      console.log("Automatic logout due to inactivity");
      if (callback && typeof callback === "function") {
        callback();
      }

      const userData = {
        user_id: null,
        role: null,
      };
      localStorage.setItem("userData", JSON.stringify(userData));
      window.location.reload();
    }, 30 * 60 * 1000);
  };

  static attachEventListeners = (callback) => {
    const events = [
      "load",
      "mousemove",
      "mousedown",
      "click",
      "scroll",
      "keypress",
    ];
    events.forEach((event) => {
      window.addEventListener(event, () =>
        TimeoutUtility.resetTimeout(callback)
      );
    });
  };

  static removeEventListeners = () => {
    const events = [
      "load",
      "mousemove",
      "mousedown",
      "click",
      "scroll",
      "keypress",
    ];
    events.forEach((event) => {
      window.removeEventListener(event, TimeoutUtility.resetTimeout);
    });
  };
}
