import * as React from "react";
import { Button } from "../components";
import { HomeForm, UseStateDispatcher } from "../types";

type Props = {
  formValues: HomeForm;
  setFormValues: UseStateDispatcher<HomeForm | null>;
};

const ResultPage = ({ formValues, setFormValues }: Props) => {
  const reset = React.useCallback(() => setFormValues(null), []);

  return (
    <div className="bg-indigo-200 flex min-h-screen justify-center items-center">
      <div className="bg-white p-6 flex flex-col rounded-lg w-72">
        <div className="mb-4">
          <p className="text-gray-500">Name</p>
          <p>{formValues.name}</p>
          <p className="text-gray-500">Surname</p>
          <p>{formValues.surname}</p>
          <p className="text-gray-500">Address</p>
          <p>{formValues.address}</p>
        </div>
        <Button label="Reset" onClick={reset} />
      </div>
    </div>
  );
};

export default ResultPage;
