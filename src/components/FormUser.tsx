import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../services/userAPI';

function FormUser() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [showBtn, setShowBtn] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleChange = (event: any) => {
    if ((event.target.value).length >= 3) {
      setShowBtn(false);
    } else {
      setShowBtn(true);
    }
  };

  const handleSearch = async (e: any) => {
    setLoading(true);
    await createUser({ name });
    setLoading(false);
    setName('');
    e.preventDefault();
    navigate('/search');
  };
  return (
    <>
      <form onSubmit={ (e) => e.preventDefault() }>
        <input
          placeholder="Usuário"
          onChange={ (e: any) => {
            handleChange(e);
            setName(e.target.value);
          } }
          type="text"
          name="name"
          id="name"
          value={ name }
          data-testid="login-name-input"
        />
        <button
          onClick={ handleSearch }
          disabled={ showBtn }
          data-testid="login-submit-button"
        >
          Entrar
        </button>
      </form>
      {loading && <p>Carregando...</p>}
    </>
  );
}

export default FormUser;
