import * as React from "react";
import { TextField, Button } from "./components";
import { isStartCapitalRegex } from "./utils";
import { useForm } from "./hooks";

type HomeForm = {
  name: string;
  surname: string;
  address: string;
};

const initialValues: HomeForm = { name: "", surname: "", address: "" };

const App = () => {
  const [isModalVisible, setIsModalVisible] = React.useState(false);

  const showModal = React.useCallback(() => {
    setIsModalVisible(true);
  }, []);

  const hideModal = React.useCallback(() => {
    setIsModalVisible(false);
  }, []);

  const handleSubmit = React.useCallback((values: HomeForm) => {
    showModal();
  }, []);

  const form = useForm({
    initialValues,
    onSubmit: handleSubmit,
    validationSchema: {
      name: {
        required: true,
        regex: isStartCapitalRegex,
      },
      address: {
        required: true,
        regex: isStartCapitalRegex,
      },
      surname: {
        required: true,
        regex: isStartCapitalRegex,
      },
    },
  });

  React.useEffect(() => {
    if (!isModalVisible) {
      form.resetForm();
    }
  }, [isModalVisible]);

  return (
    <div className="bg-indigo-200 flex min-h-screen justify-center items-center">
      <form
        noValidate
        onSubmit={form.handleSubmit}
        className="bg-white p-6 flex flex-col gap-4 rounded-lg"
      >
        <TextField
          name="name"
          onChange={form.handleChange}
          label="Name"
          value={form.values.name}
          helperText={form.errors.name}
        />
        <TextField
          name="surname"
          onChange={form.handleChange}
          label="Surname"
          value={form.values.surname}
          helperText={form.errors.surname}
        />
        <TextField
          name="address"
          onChange={form.handleChange}
          label="Address"
          value={form.values.address}
          helperText={form.errors.address}
        />
        <Button label="Submit" type="submit" />
      </form>

      {isModalVisible && (
        <div className="fixed top-0 bottom-0 left-0 right-0 bg-black/30 z-10 backdrop-blur-md flex justify-center items-center">
          <div className="bg-white p-6 flex flex-col rounded-lg w-72">
            <div className="mb-4">
              <p className="text-gray-500">Name</p>
              <p>{form.values.name}</p>
              <p className="text-gray-500">Surname</p>
              <p>{form.values.surname}</p>
              <p className="text-gray-500">Address</p>
              <p>{form.values.address}</p>
            </div>
            <Button label="Reset" onClick={hideModal} />
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
