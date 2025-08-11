import { useId, useState } from "react";
import CloseIcon from "./icons/CloseIcon";

const TextInput = ({
  label,
  value,
  onChange,
  error,
  onClear,
  type = "text",
  name = "",
  placeholder = "",
  className = "",
  ...rest
}) => {
  const autoId = useId();
  const inputId = name || autoId;
  const errId = `${inputId}-error`;

  const [isFocused, setIsFocused] = useState(false);
  const showError = !!error;
  const isLabelActive = isFocused || (!!value && String(value).length > 0);

  const handleClear = () => {
    onChange("");
    onClear && onClear();
  };

  return (
    <>
      <div className={`relative w-full ${className}`}>
        <input
          id={inputId}
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          aria-invalid={showError ? "true" : "false"}
          aria-describedby={showError ? errId : undefined}
          className={`input-base ${showError ? "error" : ""} ${
            isFocused && !showError ? "focus" : ""
          } ${isLabelActive ? "label-active" : ""}`}
          {...rest}
        />

        {label && (
          <label
            htmlFor={inputId}
            className={`label-base ${isLabelActive ? "active" : ""}`}
          >
            {label}
          </label>
        )}

        {value && (
          <button
            type="button"
            onClick={handleClear}
            className="close-button"
            aria-label="Clear input"
          >
            <CloseIcon />
          </button>
        )}
      </div>

      {showError && (
        <p id={errId} className="error-text" role="alert">
          {error}
        </p>
      )}
    </>
  );
};

export default TextInput;
