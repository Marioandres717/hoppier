import './switch.css';

function Switch({ onClick }) {
  return (
    <label className="switch">
      <input type="checkbox" onClick={onClick} /> <div></div>
    </label>
  );
}

export default Switch;
