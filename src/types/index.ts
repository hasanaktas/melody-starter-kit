export type HomeForm = {
  name: string;
  surname: string;
  address: string;
};

export type UseStateDispatcher<T> = React.Dispatch<React.SetStateAction<T>>;
