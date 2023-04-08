import useForm, { FormChange, SubmitPromise } from "@copydeck/hooks/useForm";
import handleFormSubmit from "@copydeck/utils/handlers/handleFormSubmit";
import React from "react";

export interface ForgotPasswordFormData {
  email: string;
}

export interface UseForgotPasswordFormResult {
  change: FormChange;
  data: ForgotPasswordFormData;
  hasChanged: boolean;
  disabled: boolean;
  submit: () => Promise<boolean>;
}

export interface ForgotPasswordFormProps {
  children: (props: UseForgotPasswordFormResult) => React.ReactNode;
  onSubmit: (data: ForgotPasswordFormData) => SubmitPromise;
}

const getForgotPasswordFormData = () => ({ email: "" });

function useForgotPasswordForm(
  onSubmit: (data: ForgotPasswordFormData) => SubmitPromise
): UseForgotPasswordFormResult {
  const [changed, setChanged] = React.useState(false);
  const triggerChange = () => setChanged(true);

  const form = useForm(getForgotPasswordFormData());

  const handleChange: FormChange = (event, cb) => {
    form.change(event, cb);
    triggerChange();
  };

  const data: ForgotPasswordFormData = {
    ...form.data
  };

  const handleSubmit = async (data: ForgotPasswordFormData) => {
    const errors = await onSubmit(data);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    React.useState({ email: "" });
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

  const disabled = !data.email || !isEmailValid(data.email);

  return {
    change: handleChange,
    data,
    hasChanged: changed,
    disabled,
    submit
  };
}

const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({
  children,
  onSubmit,
  ...rest
}) => {
  const props = useForgotPasswordForm(onSubmit);

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

ForgotPasswordForm.displayName = "ForgotPasswordForm";
export default ForgotPasswordForm;
