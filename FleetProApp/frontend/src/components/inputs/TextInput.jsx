import { InputGroup, Label, Input } from "./TextInput.style";

function TextInput({ label, type, placeholder, value, onChange, name, icon, error }) {
  return (
    <InputGroup>
      <Label>{label}</Label>
      

      <Input 
        name={name}
        type={type || "text"} // Fallback to 'text' if type isn't provided
        placeholder={placeholder} 
        value={value} 
        onChange={onChange} 
      />


      {icon && <div className="input-icon-container">{icon}</div>}


      {error && <span style={{ color: "red", fontSize: "12px" }}>{error}</span>}
    </InputGroup>
  );
}

export default TextInput;