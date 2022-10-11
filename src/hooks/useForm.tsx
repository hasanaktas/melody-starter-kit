import * as React from "react";

type Props<T extends {}> = {
  initialValues: T;
  onSubmit: (values: T) => any;
  validationSchema?: {
    [key in keyof T]?: {
      required?: boolean;
      regex?: RegExp;
    };
  };
};

const useForm = <T extends {}>({
  initialValues,
  onSubmit,
  validationSchema,
}: Props<T>) => {
  const [values, setValues] = React.useState(initialValues);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [touched, setTouched] = React.useState(false);

  //Form event handler

  const handleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setValues((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }));
    },
    []
  );

  //Form errors

  const errors = React.useMemo<{ [key in keyof T]?: string }>(() => {
    const e: { [key in keyof T]?: string } = {};

    if (!touched || !validationSchema) {
      return e;
    }

    for (const [key, validateType] of Object.entries(validationSchema) as [
      keyof T,
      {
        required?: boolean;
        regex?: RegExp;
      }
    ][]) {
      const selectedValue = values[key] as string;

      if (validateType.required && !selectedValue) {
        e[key] = "Required";
      } else if (
        validateType.regex &&
        !validateType.regex.test(selectedValue)
      ) {
        e[key] = "Regex Error";
      }
    }

    return e;
  }, [values, validationSchema, touched]);

  //Form Submit

  const handleSubmit = React.useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setTouched(true);
      setIsSubmitting(true);
    },
    [errors, values]
  );

  //Listen submitting status

  //Form Reset

  const resetForm = React.useCallback(() => {
    setValues(initialValues);
    setIsSubmitting(false);
    setTouched(false);
  }, [initialValues]);

  React.useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      onSubmit(values);
      setIsSubmitting(false);
    } else {
      setIsSubmitting(false);
    }
  }, [isSubmitting]);

  return {
    values,
    handleChange,
    handleSubmit,
    resetForm,
    errors,
  };
};

export default useForm;
