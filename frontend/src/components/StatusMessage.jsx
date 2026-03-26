function StatusMessage({ type, text }) {
  if (!text) {
    return null;
  }

  return (
    <div className={`status-message ${type}`}>
      <span className="status-indicator" aria-hidden="true" />
      <span>{text}</span>
    </div>
  );
}

export default StatusMessage;
