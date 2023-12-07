import { useState } from 'react';
import { Link } from 'react-router-dom';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import { AlbumType } from '../types';

function FormArtists() {
  const [showBtn, setShowBtn] = useState(true);
  const [artist, setArtist] = useState('');
  const [artistArr, setArtistArr] = useState<AlbumType[]>([]);
  const [showArtist, setShowArtist] = useState(false);
  const [showError, setShowError] = useState(false);
  const [artistTitle, setArtistTitle] = useState('');
  const handleChange = (event: any) => {
    if ((event.target.value).length >= 2) {
      setShowBtn(false);
    } else {
      setShowBtn(true);
    }
  };
  const handleSubmit = async () => {
    const artistResult = await searchAlbumsAPI(artist);
    if (artistResult.length <= 0) {
      setShowError(true);
    } else {
      setShowArtist(true);
      setShowError(false);
    }
    setArtistArr(artistResult);
    setArtistTitle(artist);
    setArtist('');
  };
  const textArtist = `Resultado de álbuns de: ${artistTitle}`;
  return (
    <>
      <form
        onSubmit={ (e) => {
          e.preventDefault();
          handleSubmit();
        } }
      >
        <input
          onChange={ (e: any) => {
            handleChange(e);
            setArtist(e.target.value);
          } }
          data-testid="search-artist-input"
          placeholder="Nome do Artista"
          value={ artist }
          type="text"
          name="artist"
          id="artist"
        />
        <button
          disabled={ showBtn }
          data-testid="search-artist-button"
        >
          Pesquisar
        </button>
      </form>
      {showArtist && <h3>{textArtist}</h3>}
      {showArtist && artistArr.map((artistData) => (
        <Link
          data-testid={ `link-to-album-${artistData.collectionId}` }
          to={ `/album/${artistData.collectionId}` }
          key={ artistData.collectionName }
        >
          <p>{artistData.collectionName}</p>
        </Link>
      ))}
      {showError && <p>Nenhum álbum foi encontrado</p>}
    </>
  );
}

export default FormArtists;
