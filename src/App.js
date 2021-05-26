import logo from "./logo.svg";
import "./App.css";
import { useForm, Controller } from "react-hook-form";
import { forwardRef, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  size: yup.number().positive().integer().required(),
  transparency: yup.number().positive().integer().required(),
});

const NumberField = forwardRef(({ onChange, onBlur, value, name }, ref) => {
  return (
    <>
      <button
        type="button"
        onClick={() => {
          onChange(Number(value) - 1);
        }}
      >
        -
      </button>
      <input
        type="text"
        onBlur={onBlur}
        onChange={onChange}
        name={name}
        ref={ref}
        value={value}
      />
      <button
        type="button"
        onClick={() => {
          onChange(Number(value) + 1);
        }}
      >
        +
      </button>
    </>
  );
});

function App() {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      size: "101",
      transparency: "100"
    },
    resolver: yupResolver(schema),
  });

  const [scale, setScale] = useState(1);
  const [transparency, setTransparency] = useState(1);

  const onSubmit = (data) => {
    setScale(Number(data.size) / 100);
    setTransparency(Number(data.transparency) / 100);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img
          src={logo}
          className="App-logo"
          alt="logo"
          style={{ transform: `scale(${scale})`, opacity: transparency }}
        />
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            control={control}
            name="size"
            render={({
              field,
              fieldState: { invalid, isTouched, isDirty, error },
              formState,
            }) => <NumberField {...field} />}
          />
          <p>{errors.size?.message}</p>

          <Controller
            control={control}
            name="transparency"
            render={({
              field,
              fieldState: { invalid, isTouched, isDirty, error },
              formState,
            }) => <NumberField {...field} />}
          />
          <p>{errors.transparency?.message}</p>

          <input {...register("exampleRequired", { required: true })} />
          {errors.exampleRequired && <span>This field is required</span>}

          <input type="submit" />
        </form>
      </header>
      <div></div>
    </div>
  );
}

export default App;
