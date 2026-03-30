import { FormField } from "../../components/FormField/FormField";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../queryClient";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginUser } from "../../api/AuthApi";
import { useAppDispatch } from "../../redux/hooks";
import { hideLoginPopupLoginPart } from "../../redux/Slices/doesShowLoginPopupLoginPartSlice";
import { showLoginPopupRegisterPart } from "../../redux/Slices/doesShowLoginPopupRegisterPartSlice";
import "./LoginForm.css";

const LoginFormSchema = z.object({
    email: z.string().email("Неправильный адрес почты"),
    password: z.string().min(8, "Длина пароля должна быть не менее 8 символов").max(14, "Длина пароля должна быть не более 14 символов"),
});
  
type LoginForm = z.infer<typeof LoginFormSchema>;  

export const LoginForm = () => {
    const {
        register, handleSubmit, formState: { errors }
    } = useForm<LoginForm>({
        resolver: zodResolver(LoginFormSchema),
    });
    const LoginMutation = useMutation(
        {
            mutationFn: ({email, password}: LoginForm) => loginUser(email, password),
            onSuccess() {
                queryClient.invalidateQueries({ queryKey: ["users", "me"] });
            },
            onError(e) {
                console.log(JSON.parse(e.message)[0].message);
            },
        },
        queryClient
    );
    
    const dispatch = useAppDispatch();
    const handleOnClickLoginChangeBtn = () => {
        dispatch(hideLoginPopupLoginPart());
        dispatch(showLoginPopupRegisterPart());
    };

    return (
        <form className="login-form" onSubmit={handleSubmit(({ email, password }) => {
            LoginMutation.mutate({ email, password });
        })}>
            <FormField errorMessage={errors.email?.message}>
                <input className="login__input login__input--email"
                    placeholder="Электронная почта"
                    type="email"
                    {...register("email")}
                />
            </FormField>
            <FormField errorMessage={errors.password?.message}>
                <input className="login__input login__input--password"
                    placeholder="Пароль"
                    type="password"
                    {...register("password")}
                />
            </FormField>
    
            {LoginMutation.error && <span>{LoginMutation.error.message}</span>}

            <button className="login__btn--submit primary__btn" type="submit">Войти</button>
            <button className="login-user__btn--change" onClick={handleOnClickLoginChangeBtn} type="button">Регистрация</button>
        </form>
    );    
};