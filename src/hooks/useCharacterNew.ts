import axios from 'axios';

const baseUrl = import.meta.env.VITE_API_URL;

const useCharacterNew = () => {
  const getAll = async () => {
    const response = await axios.get(`${baseUrl}/v1/character`);
    return response.data;
  };

  return { getAll };
};

export default useCharacterNew;
