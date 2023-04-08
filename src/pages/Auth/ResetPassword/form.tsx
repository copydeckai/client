import useForm, { FormChange, SubmitPromise } from "@copydeck/hooks/useForm";
import handleFormSubmit from "@copydeck/utils/handlers/handleFormSubmit";
import React from "react";

export interface ResetPasswordFormData {
  password: string;
  passwordConfirm: string;
}

export interface UseResetPasswordFormResult {
  change: FormChange;
  data: ResetPasswordFormData;
  hasChanged: boolean;
  disabled: boolean;
  submit: () => Promise<boolean>;
}

export interface ResetPasswordFormProps {
  children: (props: UseResetPasswordFormResult) => React.ReactNode;
  onSubmit: (data: ResetPasswordFormData) => SubmitPromise;
}

const getResetPasswordFormData = () => ({ password: "", passwordConfirm: "" });

function useResetPasswordForm(
  onSubmit: (data: ResetPasswordFormData) => SubmitPromise
): UseResetPasswordFormResult {
  const [changed, setChanged] = React.useState(false);
  const triggerChange = () => setChanged(true);

  const form = useForm(getResetPasswordFormData());

  // validate form
  // const validate = (data: ResetPasswordFormData) => {
  //   const errors: any = {};

  //   if (!data.password) {
  //     errors.password = 'Password is required';
  //   }

  //   if (!data.passwordConfirm) {
  //     errors.passwordConfirm = 'Password confirmation is required';
  //   }

  //   if (data.password !== data.passwordConfirm) {
  //     errors.password = 'Passwords do not match';
  //   }

  //   return errors;
  // };

  const handleChange: FormChange = (event, cb) => {
    form.change(event, cb);
    triggerChange();
  };

  const data: ResetPasswordFormData = {
    ...form.data
  };

  const handleSubmit = async (data: ResetPasswordFormData) => {
    // const errors = validate(data);
    // if (Object.keys(errors).length) {
    //   return errors;
    // } else {
    const errors = await onSubmit(data);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    React.useState({ password: "" });
    return errors;
    // }
  };

  const submit = async () => handleFormSubmit(data, handleSubmit, setChanged);

  const disabled = !data.password || !data.passwordConfirm;

  return {
    change: handleChange,
    data,
    hasChanged: changed,
    disabled,
    submit
  };
}

const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({
  children,
  onSubmit
}) => {
  const props = useResetPasswordForm(onSubmit);

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        props.submit();
      }}
    >
      {children(props)}
    </form>
  );
};

ResetPasswordForm.displayName = "ResetPasswordForm";
export default ResetPasswordForm;
