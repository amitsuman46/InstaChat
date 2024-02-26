import { useCallback, useRef, useState } from "react";
import validator from "validator";
import passwordValidator from "password-validator";

const useValidateForm = (signIn) => {
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const validateForm = () => {
    let isValid = true;

    // Validate Name
    if (!signIn) {
      if (!name.current.value.trim()) {
        setNameError("Name is required");
        isValid = false;
      } else {
        setNameError("");
      }
    }

    // Validate Email
    if (!email.current.value.trim()) {
      setEmailError("Email is required");
      isValid = false;
    } else if (!validator.isEmail(email.current.value)) {
      setEmailError("Invalid email address");
      isValid = false;
    } else {
      setEmailError("");
    }

    // Validate Password
    const schema = new passwordValidator();
    schema
      .is().min(8)
      .is().max(100)
      .has().uppercase()
      .has().lowercase()
      .has().digits()
      .has().symbols();

    if (!password.current.value.trim()) {
      setPasswordError("Password is required");
      isValid = false;
    } else if (!schema.validate(password.current.value)) {
      setPasswordError("Password does not meet requirements");
      isValid = false;
    } else {
      setPasswordError("");
    }

    return isValid;
  };
  const clearErrors = useCallback(() => {
    setNameError("");
    setEmailError("");
    setPasswordError("");
  }, []);

  return { name, email, password, nameError, emailError, passwordError, validateForm,clearErrors };
};

export default useValidateForm;
