import * as React from "react";
import { FormikHelpers, useFormik, FormikErrors } from "formik";
import { Button, TextField } from "./components";
import { isEmpty, isStartCapitalLetter } from "./utils";

type FormValues = {
  name: string;
  surname: string;
  address: string;
};

type a = keyof FormValues;

const initialValues: FormValues = { name: "", surname: "", address: "" };

const App = () => {
  const handleSubmit = React.useCallback(
    (values: FormValues, helpers: FormikHelpers<FormValues>) => {
      console.log(values);
    },
    []
  );

  const handleValidate = React.useCallback((values: FormValues) => {
    const pattern = /^^[A-Z].*$/;

    const errors: FormikErrors<FormValues> = {};

    for (const [key, value] of Object.entries(values)) {
      if (isEmpty(value)) {
        errors[key as keyof FormValues] = "Required";
      } else if (isStartCapitalLetter(value)) {
        errors[key as keyof FormValues] = "Must start with a capital letter";
      }
    }

    return errors;
  }, []);

  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit,
    validate: handleValidate,
  });

  return (
    <div className="bg-indigo-200 flex min-h-screen justify-center items-center">
      <form
        noValidate
        onSubmit={formik.handleSubmit}
        className="bg-white p-6 flex flex-col gap-4 rounded-lg"
      >
        <TextField
          name="name"
          onChange={formik.handleChange}
          label="Name"
          value={formik.values.name}
          helperText={formik.errors.name}
        />
        <TextField
          name="surname"
          onChange={formik.handleChange}
          label="Surname"
          value={formik.values.surname}
          helperText={formik.errors.surname}
        />
        <TextField
          name="address"
          onChange={formik.handleChange}
          label="Address"
          value={formik.values.address}
          helperText={formik.errors.address}
        />
        <Button label="Submit" type="submit" />
      </form>
    </div>
  );
};

export default App;
