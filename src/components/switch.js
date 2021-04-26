import './switch.css';

function Switch({ onClick }) {
  return (
    <label class="switch">
      <input type="checkbox" onClick={onClick} /> <div></div>
    </label>
  );
}

export default Switch;
