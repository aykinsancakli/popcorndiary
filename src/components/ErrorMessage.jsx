import { ReactComponent as ErrorIcon } from '../assets/icons/Error.svg';

export default function ErrorMessage({ message }) {
  return (
    <p className="error">
      <span>
        <ErrorIcon />
      </span>{' '}
      {message}
    </p>
  );
}
