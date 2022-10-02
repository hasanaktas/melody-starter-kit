import * as React from "react";
import { TextField, Button } from "../components";
import { useFormik, FormikHelpers, FormikErrors } from "formik";
import { isEmpty, isStartCapitalLetter } from "../utils";
import { HomeForm, UseStateDispatcher } from "../types";

const initialValues: HomeForm = { name: "", surname: "", address: "" };

type Props = {
  setFormValues: UseStateDispatcher<HomeForm | null>;
};
const HomePage = ({ setFormValues }: Props) => {
  const handleSubmit = React.useCallback(
    (values: HomeForm, helpers: FormikHelpers<HomeForm>) => {
      setFormValues(values);
    },
    []
  );

  const handleValidate = React.useCallback((values: HomeForm) => {
    const errors: FormikErrors<HomeForm> = {};

    for (const [key, value] of Object.entries(values)) {
      if (isEmpty(value)) {
        errors[key as keyof HomeForm] = "Required";
      } else if (isStartCapitalLetter(value)) {
        errors[key as keyof HomeForm] = "Must start with a capital letter";
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

export default HomePage;
