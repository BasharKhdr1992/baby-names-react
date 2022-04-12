const CustomSpan = ({ id, children, className, handleClick }) => {
  return (
    <div onClick={() => handleClick(id)} className={`name-label ${className}`}>
      {children}
    </div>
  );
};

export default CustomSpan;
