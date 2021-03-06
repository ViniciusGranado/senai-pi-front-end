import { useState } from 'react';
import { useMutation } from 'react-query';
import { storeApi } from '../api/store.api';
import { NewUserDTO } from '../models/models';

const initialNewUserDTO: NewUserDTO = {
  name: '',
  email: '',
  username: '',
  password: '',
};

export const useSaveNewUserHook = () => {
  const [newUserDTO, setNewUserDTO] = useState(initialNewUserDTO);

  const {
    mutate: saveNewUser,
    isLoading: isSaveLoading,
    isSuccess: isSaveSuccess,
    isError: isSaveError,
  } = useMutation(storeApi.saveNewUser(newUserDTO));

  const handleFormValues = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setNewUserDTO((prev) => {
      const stateCopy = { ...prev };

      stateCopy[event.target.name] = event.target.value.trim();

      return stateCopy;
    });
  };

  return {
    saveNewUser,
    handleFormValues,
    isSaveLoading,
    isSaveSuccess,
    isSaveError,
  };
};
