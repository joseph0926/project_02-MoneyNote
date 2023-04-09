const InputHelper = ({
  type,
  name,
  value,
  handleChange,
  handleBluer,
  labelText,
}) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>

      <input
        type={type}
        value={value}
        name={name}
        onChange={handleChange}
        onBlur={handleBluer}
        className="form-input"
      />
    </div>
  );
};

export default InputHelper;
