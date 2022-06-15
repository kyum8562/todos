import { useForm } from 'react-hook-form';

interface IForm {
  email:  string;
  firstName : string;
  lastName : string;
  username : string;
  password : string;
  password1 : string;
  extraError?: string;
};
const Todos = () => {
const { register, handleSubmit, formState:{errors}, setError } = useForm<IForm>();
const onVaild = (data: IForm) => {
  if(data.password !== data.password1){
    setError('password1', 
      {message: "Password are not the same"}, 
      {shouldFocus: true},
    );
  }
};
// console.log(errors?.password1.message);
  return(
    <div>
        <form
          style={{display: "flex", flexDirection:"column"}}
          onSubmit={handleSubmit(onVaild)}
        >
        <input
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[A-Za-z0-9._%+-]+@naver.com$/,
              message: "Only naver.com emails allowed",
            },
          })}
          placeholder="Email"
        />
        <span>{errors?.email?.message}</span>
        <input
          {...register("firstName", {
            required: "write here",
            validate: {
              // 여기서 api와 요청을 통해 validation 체크
              noNico: (value) =>
                value.includes("nico") ? "no nicos allowed" : true,
              noNick: (value) =>
                value.includes("nick") ? "no nick allowed" : true,
            },
          })}
          placeholder="First Name"
        />
        <span>{errors?.firstName?.message}</span>
        <input
          {...register("lastName", { required: "write here" })}
          placeholder="Last Name"
        />
        <span>{errors?.lastName?.message}</span>
        <input
          {...register("username", { required: "write here", minLength: 10 })}
          placeholder="Username"
        />
        <span>{errors?.username?.message}</span>
        <input
          {...register("password", { required: "write here", minLength: 5 })}
          placeholder="Password"
        />
        <span>{errors?.password?.message}</span>
          <input 
            {...register("password1", {
              required: "Password is required", // 에러 메시지 출력(requried: true + 에러 메시지)
              minLength:{
                value: 5,
                message: "Your password is too short!",
              },
            })} placeholder="Password1" 
          />
          <span>{errors?.password1?.message}</span>
          {/* <span>{errors?.extraError?.message}</span> */}
          <button>add</button>
        </form>
    </div>
  );
}

export default Todos;
