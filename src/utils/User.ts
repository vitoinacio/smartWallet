import axios from 'axios';

const User = async () => {
  const userEmail = sessionStorage.getItem('UserProvider');
  const apiUrl = import.meta.env.VITE_API_URL;
  
  if (!userEmail) {
    throw new Error("Email do usuário não encontrado no sessionStorage.");
  }

  try {
    const response = await axios.get(`${apiUrl}users?email=${userEmail}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    return response.data; 
  } catch (error: unknown) { 
    console.error('Erro ao buscar informações do usuário:', error);

    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data || 'Erro desconhecido ao buscar as informações';
      throw new Error(`${errorMessage}`);
    } else if (error instanceof Error) {
      throw new Error(`Erro desconhecido: ${error.message}`);
    } else {
      throw new Error('Erro desconhecido ao tentar buscar as informações.');
    }
  }
};

export default User;