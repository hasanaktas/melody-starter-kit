import * as React from "react";
import { HomePage, ResultPage } from "./pages";
import { HomeForm } from "./types";

const App = () => {
  const [formValues, setFormValues] = React.useState<HomeForm | null>(null);

  if (formValues) {
    return <ResultPage formValues={formValues} setFormValues={setFormValues} />;
  }

  return <HomePage setFormValues={setFormValues} />;
};

export default App;
