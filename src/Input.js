const Input = ({ type, onChange, placeholder, value }) => {
  return (
    <input
      value={value}
      placeholder={placeholder}
      className="input"
      type={type}
      onChange={(e) => onChange(e)}
    />
  );
};

export default Input;
