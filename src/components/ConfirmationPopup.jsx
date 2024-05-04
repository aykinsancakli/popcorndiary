export default function ConfirmationPopup({ isOpen, onCancel, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="confirmation-popup">
      <p>Delete all movies?</p>
      <div className="confirmation-buttons">
        <button onClick={onConfirm} className="btn-confirm btn-yes">
          Yes
        </button>
        <button onClick={onCancel} className="btn-confirm btn-no">
          No
        </button>
      </div>
    </div>
  );
}
