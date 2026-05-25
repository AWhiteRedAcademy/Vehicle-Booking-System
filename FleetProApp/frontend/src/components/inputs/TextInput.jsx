import { InputGroup, Label, Input } from "./TextInput.style";

function TextInput({ label, type, placeholder, value, onChange }) {
  return (
    <InputGroup>
      <Label>{label}</Label>
      <Input type={type} placeholder={placeholder} value={value} onChange={onChange} />
    </InputGroup>
  );
}

export default TextInput;