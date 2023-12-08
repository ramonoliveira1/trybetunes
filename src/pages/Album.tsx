import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import getMusic from '../services/musicsAPI';
import { SongType, AlbumType } from '../types';
import MusicCard from '../components/MusicCard';

function Album() {
  const [loading, setLoading] = useState(true);
  const [songsArr, setSongsArr] = useState<SongType[]>([]);
  const [songsExist, setSongsExist] = useState(false);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const processSongs = async () => {
      if (id) {
        const songs: [AlbumType, ...SongType[]] = await getMusic(id);
        const [, ...songTypes] = songs;
        setSongsArr(songTypes);
        setLoading(false);
        setSongsExist(true);
      }
    };

    processSongs();
  }, [id]);

  if (loading) {
    return (
      <h1>Carregando...</h1>
    );
  }

  return (
    <div>
      { songsExist && <h1 data-testid="artist-name">{ songsArr[0].artistName}</h1>}
      { songsExist && <h1 data-testid="album-name">{ songsArr[0].collectionName}</h1>}
      { songsExist && songsArr.map((song) => (<MusicCard
        key={ song.trackId }
        trackName={ song.trackName }
        trackId={ song.trackId }
        previewUrl={ song.previewUrl }
      />))}
    </div>
  );
}

export default Album;
