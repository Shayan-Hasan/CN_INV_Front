import TimeoutUtility from "./TimeoutUtility";

const validateEmail = (mail) => {
  TimeoutUtility.resetTimeout();
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
    return true;
  }
  return false;
};

function validateName(name) {
  TimeoutUtility.resetTimeout();
  if (/^[A-Za-z0-9\s-,.+?()&*]+$/.test(name)) {
    return true;
  }
  return false;
}

const ValidPhone = (phone) => {
  TimeoutUtility.resetTimeout();
  // const phoneRegex = /^\d{10}$/;     /^[\d()+\s-]+$/
  if (
    /^(\(\d{1,3}\)\s*)?(\+?\d{1,3}(\s*-?\s*\d{1,3})*|\d{1,3}(\s*-?\s*\d{1,3})*)$/.test(
      phone
    )
  ) {
    return true;
  }
  return false;
};

const ValidWebsite = (web) => {
  if (
    /^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]+\.){1,}([a-zA-Z]{2,})(:\d+)?(\/[a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;%=]*)?$/.test(
      web
    )
  ) {
    return true;
  }
  return false;
};

const ValidAmount = (amount) => {
  TimeoutUtility.resetTimeout();
  if (/^(\d+|\d{1,3}(,\d{3})*)(\.\d+)?$/.test(amount)) {
    return true;
  }
  return false;
};

const ValidText = (text) => {
  TimeoutUtility.resetTimeout();
  if (/^[\w\s\d.,&()\-]+$/u.test(text) && !/[-']{2}|'/.test(text)) {
    return true;
  }
  return false;
};

export { validateEmail };
export { validateName };
export { ValidPhone };
export { ValidWebsite };
export { ValidAmount };
export { ValidText };
