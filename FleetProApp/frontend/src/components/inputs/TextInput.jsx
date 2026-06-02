import {
  InputGroup,
  Label,
  InputWrapper,
  LeftIcon,
  RightIconButton,
  Input,
  ErrorText,
} from "./TextInput.style";

function TextInput({
  label,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  leftIcon,
  rightIcon,
  onRightIconClick,
  error,
}) {
  return (
    <InputGroup>
      {label && <Label htmlFor={name}>{label}</Label>}

      <InputWrapper>
        {leftIcon && <LeftIcon>{leftIcon}</LeftIcon>}

        <Input
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          $hasLeftIcon={!!leftIcon}
          $hasRightIcon={!!rightIcon}
        />

        {rightIcon && (
          <RightIconButton type="button" onClick={onRightIconClick}>
            {rightIcon}
          </RightIconButton>
        )}
      </InputWrapper>

      {error && <ErrorText>{error}</ErrorText>}
    </InputGroup>
  );
}

export default TextInput;