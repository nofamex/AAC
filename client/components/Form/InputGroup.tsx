export default function InputGroup({
  validation = {},
  label,
  name,
  value = "",
  fUtils: { register, errors },
  errmsg = "Invalid input!",
  type = "text",
  placeholder = "",
  disabled = false,
  autoFocus = false,
  className,
}: any) {
  const currentError = errors[name];
  switch (currentError?.type) {
    case "required":
      errmsg = "This field is required.";
      break;

    case "min":
      errmsg = "You need longer input.";
      break;

    case "pattern":
      errmsg = "Invalid URL, Dont forget to put http://";
      break;

    default:
      break;
  }

  const Wrapper = ({ children }: any) =>
    disabled ? (
      <fieldset disabled className="w-full">
        {children}
      </fieldset>
    ) : (
      <>{children}</>
    );

  return (
    <Wrapper>
      <div
        className={`flex ${
          type == "radio" ? "items-center" : "flex-col"
        } w-full ${className} relative`}
      >
        <label
          htmlFor={name}
          className={`text-red-default text-lg ${
            type == "radio" && "order-2 ml-3"
          }`}
        >
          {label}
        </label>
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          autoFocus={autoFocus}
          {...register(name, validation)}
          className="bg-compe border-white border-2 h-10 w-full p-2 rounded-lg focus:outline-none text-white"
        />
        {errors[name] && (
          <p className="text-red py-1 px-3 mt-3 absolute right-0 -top-2">
            {errmsg}
          </p>
        )}
      </div>
    </Wrapper>
  );
}
