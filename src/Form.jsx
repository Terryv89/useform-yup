import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";

const Form = () => {
  const schema = yup.object().shape({
    fullName: yup.string().required(),
    email: yup.string().email().required(),
    age: yup.number().positive().integer().min(18).required(),
    password: yup.string().min(4).max(20).required(),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null])
      .required(),
  });

  const { register, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });

  const [users, setUsers] = useState([]);

  const onSubmit = (data) => {
    const newUsers = [...users, data];
    setUsers(newUsers);
    console.log(newUsers);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        name=""
        id=""
        placeholder="Full name"
        {...register("fullName")}
      />
      <input type="text" placeholder="Email" {...register("email")} />
      <input type="number" placeholder="Age" {...register("age")} />
      <input type="text" placeholder="Password" {...register("password")} />
      <input
        type="text"
        placeholder="Confirm Password"
        {...register("confirmPassword")}
      />
      <input type="submit" value="submit" placeholder="submit" />
    </form>
  );
};

export default Form;
