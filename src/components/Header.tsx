import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import { UserType } from '../types';

function Header() {
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState<UserType | any>({});
  useEffect(() => {
    const getUsername = async () => {
      const user = await getUser();
      setUserInfo(user);
      setLoading(false);
    };
    getUsername();
  }, []);
  if (loading) {
    return (
      <header data-testid="header-component"><h2>Carregando...</h2></header>
    );
  }
  return (
    <header data-testid="header-component">
      <NavLink data-testid="link-to-search" to="/search">Procurar</NavLink>
      <NavLink data-testid="link-to-favorites" to="/favorites">Favoritos</NavLink>
      <NavLink data-testid="link-to-profile" to="/profile">Perfil</NavLink>
      <span data-testid="header-user-name">{ userInfo.name }</span>
    </header>
  );
}

export default Header;
