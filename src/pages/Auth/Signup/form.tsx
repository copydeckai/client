import useForm, { FormChange, SubmitPromise } from "@copydeck/hooks/useForm";
import handleFormSubmit from "@copydeck/utils/handlers/handleFormSubmit";
import React from "react";

export interface SignupFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface UseSignupFormResult {
  change: FormChange;
  data: SignupFormData;
  hasChanged: boolean;
  disabled: boolean;
  submit: () => Promise<boolean>;
}

export interface SignupFormProps {
  children: (props: UseSignupFormResult) => React.ReactNode;
  onSubmit: (data: SignupFormData) => SubmitPromise;
  emailAddress: string;
}

function useSignupForm(
  onSubmit: (data: SignupFormData) => SubmitPromise,
  emailAddress
): UseSignupFormResult {
  const [changed, setChanged] = React.useState(false);
  const triggerChange = () => setChanged(true);
  let _formData = {
    firstName: "",
    lastName: "",
    email: emailAddress,
    password: ""
  };
  const form = useForm(_formData);
  const handleChange: FormChange = (event, cb) => {
    form.change(event, cb);
    triggerChange();
  };

  const data: SignupFormData = {
    ...form.data
  };

  const handleSubmit = async (data: SignupFormData) => {
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
    !data.firstName ||
    !data.lastName ||
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

const SignupForm: React.FC<SignupFormProps> = ({
  children,
  onSubmit,
  emailAddress,
  ...rest
}) => {
  const props = useSignupForm(onSubmit, emailAddress);

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

SignupForm.displayName = "SignupForm";
export default SignupForm;
