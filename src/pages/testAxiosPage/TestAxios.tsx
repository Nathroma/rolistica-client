import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';

const TestAxios = () => {
  const token = '';
  const [response, setResponse] = useState<any>(null);
  useEffect(() => {
    axios
      .get('http://localhost:3000/v1/characters', {
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setResponse(response.data);
      });
  }, []);

  return (
    <div>
      <h1>Test Axios</h1>
      <pre>
        {response ? JSON.stringify(response, null, 2) : 'Chargement...'}
      </pre>
    </div>
  );
};

export default TestAxios;
