import Switch from './switch';

const spanStyle = {
  fontSize: 14,
};

function SetCurrencyComponent({ onClick }) {
  return (
    <div
      style={{
        display: 'flex',
        width: 150,
        justifyContent: 'space-around',
      }}
    >
      <span style={spanStyle}>USD</span>
      <Switch onClick={onClick} />
      <span style={spanStyle}>CAD</span>
    </div>
  );
}

export default SetCurrencyComponent;
