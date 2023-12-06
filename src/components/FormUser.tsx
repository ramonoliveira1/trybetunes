import { useState } from 'react';
import { createUser } from '../services/userAPI';

function FormUser() {
  const [name, setName] = useState('');
  const [showBtn, setShowBtn] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleChange = (event: any) => {
    if ((event.target.value).length >= 3) {
      setShowBtn(false);
    }
  };

  const handleSearch = async (e: any) => {
    setLoading(true);
  };
  return (
    <form>
      <input
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
        onClick={ () => createUser({ name }) }
        disabled={ showBtn }
        data-testid="login-submit-button"
      >
        Entrar
      </button>
    </form>
  );
}

export default FormUser;
