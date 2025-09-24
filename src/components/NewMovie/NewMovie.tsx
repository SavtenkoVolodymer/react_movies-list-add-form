/* eslint-disable max-len */
import React, { useState, FormEvent } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

const urlPattern =
  /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!\/\\\w]*))?)$/;

const imdbIdPattern = /^tt\d+$/;

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [movie, setMovie] = useState<Movie>({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const [formKey, setFormKey] = useState(0);

  const handleChange = (field: keyof Movie, value: string) => {
    setMovie(prev => ({ ...prev, [field]: value }));
  };

  const isFormValid = (): boolean => {
    const title = movie.title.trim();
    const imgUrl = movie.imgUrl.trim();
    const imdbUrl = movie.imdbUrl.trim();
    const imdbId = movie.imdbId.trim();

    return (
      Boolean(title && imgUrl && imdbUrl && imdbId) &&
      urlPattern.test(imgUrl) &&
      urlPattern.test(imdbUrl) &&
      imdbIdPattern.test(imdbId)
    );
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isFormValid()) {
      return;
    }

    onAdd({
      title: movie.title.trim(),
      imgUrl: movie.imgUrl.trim(),
      imdbUrl: movie.imdbUrl.trim(),
      imdbId: movie.imdbId.trim(),
      description: movie.description?.trim() || '',
    });

    setMovie({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
    setFormKey(prev => prev + 1);
  };

  return (
    <form key={formKey} onSubmit={handleSubmit} className="box mt-5">
      <h2 className="title is-4">Add a new movie</h2>

      <TextField
        name="title"
        label="Title"
        placeholder="Movie title"
        value={movie.title}
        required
        minLength={1}
        onChange={(value: string) => handleChange('title', value)}
        data-cy="title"
      />

      <TextField
        name="description"
        label="Description"
        placeholder="Optional description"
        value={movie.description ?? ''}
        onChange={(value: string) => handleChange('description', value)}
        data-cy="description"
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        placeholder="https://some.site/image.jpg"
        value={movie.imgUrl}
        required
        pattern={urlPattern}
        patternError="Enter a valid URL"
        onChange={(value: string) => handleChange('imgUrl', value)}
        data-cy="imgUrl"
      />

      <TextField
        name="imdbUrl"
        label="IMDB URL"
        placeholder="https://imdb.com/title/..."
        value={movie.imdbUrl}
        required
        pattern={urlPattern}
        patternError="Enter a valid URL"
        onChange={(value: string) => handleChange('imdbUrl', value)}
        data-cy="imdbUrl"
      />

      <TextField
        name="imdbId"
        label="IMDB ID"
        placeholder="tt1234567"
        value={movie.imdbId}
        required
        pattern={imdbIdPattern}
        patternError="Use format tt1234567"
        onChange={(value: string) => handleChange('imdbId', value)}
        data-cy="imdbId"
      />

      <button
        type="submit"
        className="button is-primary"
        disabled={!isFormValid()}
        data-cy="submit-button"
      >
        Add
      </button>
    </form>
  );
};
