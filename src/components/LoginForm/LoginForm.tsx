import { showSuccessRegistrationPopup } from "../../redux/Slices/doesShowSuccessRegistrationPopupSlice";
import { showRegisterPopup } from "../../redux/Slices/doesShowRegisterPopupSlice";
import { hideLoginPopup } from "../../redux/Slices/doesShowLoginPopupSlice";
import { FormField } from "../../components/FormField/FormField";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useAppDispatch } from "../../redux/hooks";
import { queryClient } from "../../queryClient";
import { loginUser } from "../../api/AuthApi";
import { useForm } from "react-hook-form";
import { z } from "zod";
import "./LoginForm.css";

const LoginFormSchema = z.object({
    email: z.string().email("Неправильный адрес почты"),
    password: z.string().min(10, "Длина пароля должна быть не менее 10 символов").max(15, "Длина пароля должна быть не более 15 символов"),
});
type TLoginForm = z.infer<typeof LoginFormSchema>;

export const LoginForm = () => {
    const { register, handleSubmit, formState: {errors} } = useForm<TLoginForm>({ resolver: zodResolver(LoginFormSchema), mode: "all" });

    const loginMutation = useMutation({
        mutationFn: ({ email, password }: TLoginForm) => loginUser(email, password),
        onSuccess() {
            queryClient.invalidateQueries({ queryKey: ["users", "me"] });
            dispatch(hideLoginPopup());
            dispatch(showSuccessRegistrationPopup());
        },
        onError(e) {
            console.log(JSON.parse(e.message)[0].message);
        },
    }, queryClient);
    
    const dispatch = useAppDispatch();
    const handleOnClickLoginChangeBtn = () => {
        dispatch(hideLoginPopup());
        dispatch(showRegisterPopup());
    };

    return (
        <form className="login-form" onSubmit={handleSubmit(({ email, password }) => loginMutation.mutate({ email, password }))}>
            <div className="login-form__inputs">
                <FormField>
                    <input className={`login-form__input ${errors.email?.message && "error"}`} placeholder="Электронная почта" type="email" {...register("email")}/>
                </FormField>
                <FormField>
                    <input className={`login-form__input ${errors.password?.message && "error"}`} placeholder="Пароль" type="password" {...register("password")}/>
                </FormField>
                {loginMutation.error && <span className="login-form__error">{loginMutation.error.message}</span>}
            </div>
            
            <button className="login-form__submit-btn primary__btn" type="submit">Войти</button>
            <button className="login-form__change-btn" onClick={handleOnClickLoginChangeBtn} type="button">Регистрация</button>
        </form>
    );
};