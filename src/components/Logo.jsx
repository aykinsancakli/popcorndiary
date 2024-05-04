import logo from '../assets/images/popcornDiary-logo.png';

export default function Logo() {
  return (
    <div className="logo">
      <span role="img">
        <img
          src={logo}
          className="popcorn-logo"
          width={48}
          alt="popcornDiary logo"
        />
      </span>
      <h1>PopcornDiary</h1>
    </div>
  );
}
