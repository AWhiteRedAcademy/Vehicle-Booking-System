import { InputGroup, Label, Input } from "./TextInput.style";

function TextInput({ label, type = "text", placeholder }) {
  return (
    <InputGroup>
      <Label>{label}</Label>
      <Input type={type} placeholder={placeholder} />
    </InputGroup>
  );
}

export default TextInput;