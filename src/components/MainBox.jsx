export default function MainBox({ children, isOpen }) {
  return (
    <div
      className={`box box--movies ${isOpen ? '' : 'hide-list fade-out hide-scrollbar'}`}
    >
      {children}
    </div>
  );
}
