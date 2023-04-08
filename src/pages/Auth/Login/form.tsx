import useForm, { FormChange, SubmitPromise } from "@copydeck/hooks/useForm";
import handleFormSubmit from "@copydeck/utils/handlers/handleFormSubmit";
import React from "react";

export interface LoginFormData {
  email: string;
  password: string;
}

export interface UseLoginFormResult {
  change: FormChange;
  data: LoginFormData;
  hasChanged: boolean;
  disabled: boolean;
  submit: () => Promise<boolean>;
}

export interface LoginFormProps {
  children: (props: UseLoginFormResult) => React.ReactNode;
  onSubmit: (data: LoginFormData) => SubmitPromise;
}

const getLoginFormData = () => ({ email: "", password: "" });

function useLoginForm(
  onSubmit: (data: LoginFormData) => SubmitPromise
): UseLoginFormResult {
  const [changed, setChanged] = React.useState(false);
  const triggerChange = () => setChanged(true);

  const form = useForm(getLoginFormData());

  const handleChange: FormChange = (event, cb) => {
    form.change(event, cb);
    triggerChange();
  };

  const data: LoginFormData = {
    ...form.data
  };

  const handleSubmit = async (data: LoginFormData) => {
    const errors = await onSubmit(data);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    React.useState({ password: "" });
    return errors;
  };

  const submit = async () => handleFormSubmit(data, handleSubmit, setChanged);

  /**
   * checks if email is a valid email
   * @param email
   * @returns {boolean}
   */
  const isEmailValid = (email: string): boolean => {
    if (
      email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    ) {
      return true;
    }
    return false;
  };

  const disabled =
    !data.email ||
    !data.password ||
    data.password.length < 5 ||
    !isEmailValid(data.email);

  return {
    change: handleChange,
    data,
    hasChanged: changed,
    disabled,
    submit
  };
}

const LoginForm: React.FC<LoginFormProps> = ({
  children,
  onSubmit,
  ...rest
}) => {
  const props = useLoginForm(onSubmit);

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        props.submit();
      }}
      {...rest}
    >
      {children(props)}
    </form>
  );
};

LoginForm.displayName = "LoginForm";
export default LoginForm;
