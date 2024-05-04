import { ReactComponent as Loading } from '../assets/icons/Loading.svg';

export default function Loader() {
  return (
    <span className="loader">
      <Loading className="loading-icon" />
      <p>Loading...</p>
    </span>
  );
}
