import { showSuccessRegistrationPopup } from "../../redux/Slices/doesShowSuccessRegistrationPopupSlice";
import { hideRegisterPopup } from "../../redux/Slices/doesShowRegisterPopupSlice";
import { showLoginPopup } from "../../redux/Slices/doesShowLoginPopupSlice";
import { FormField } from "../FormField/FormField";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useAppDispatch } from "../../redux/hooks";
import { queryClient } from "../../queryClient";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Api from "../../api/api";
import "./RegisterForm.css";

const RegisterUserSchema = z.object({
    email: z.string().email("Неправильный адрес почты"),
    firstname: z.string().min(2, "Длина имени должна быть не менее 2 символов").max(15, "Длина имени должна быть не более 15 символов"),
    surname: z.string().min(4, "Длина фамилии должна быть не менее 4 символов").max(20, "Длина фамилии должна быть не более 20 символов"),
    password: z.string().min(10, "Длина пароля должна быть не менее 10 символов").max(15, "Длина пароля должна быть не более 15 символов"),
    confirmPassword: z.string().min(10, "Длина пароля должна быть не менее 10 символов").max(15, "Длина пароля должна быть не более 15 символов"),
});
type TRegisterForm = z.infer<typeof RegisterUserSchema>;

export const RegisterForm = () => {
    const dispatch = useAppDispatch();
    const handleOnClickChangeBtn = () => {
        dispatch(hideRegisterPopup());
        dispatch(showLoginPopup());
    };
    
    const { register, handleSubmit, watch, formState: {errors} } = useForm<TRegisterForm>({ resolver: zodResolver(RegisterUserSchema), mode: "all" });
    const password = watch("password");

    const registerMutation = useMutation({
        mutationFn: ({ email, password, firstname, surname }: TRegisterForm) => Api.registerUser(email, password, firstname, surname),
        onSuccess() {
            queryClient.invalidateQueries({ queryKey: ["users", "me"] });
            dispatch(hideRegisterPopup());
            dispatch(showSuccessRegistrationPopup());
        },
        onError(e) {
            console.log(JSON.parse(e.message)[0].message);
        },
    }, queryClient);
    
    return (
        <form className="register-form" action="POST" onSubmit={handleSubmit(({ email, firstname, surname, password, confirmPassword }: TRegisterForm) => {
            registerMutation.mutate({ email, password, firstname, surname, confirmPassword });
        })}>
            <h3 className="register-form__title">Регистрация</h3>
            <div className="register-form__inputs">
                <FormField>
                    <input className={`register-form__input ${errors.email?.message && "error"}`} placeholder="Электронная почта" type="email" {...register("email")}/>
                </FormField>
                <FormField>
                    <input className={`register-form__input ${errors.firstname?.message && "error"}`} placeholder="Имя" type="text" {...register("firstname", { minLength: { value: 2, message: "Минимум 2 символа" }, maxLength: { value: 50, message: "Максимум 50 символов" } })}/>
                </FormField>
                <FormField>
                    <input className={`register-form__input ${errors.surname?.message && "error"}`} placeholder="Фамилия" type="text" {...register("surname", { minLength: { value: 2, message: "Минимум 2 символа" }, maxLength: { value: 50, message: "Максимум 50 символов" } })} />
                </FormField>
                <FormField>
                    <input className={`register-form__input ${errors.password?.message && "error"}`} placeholder="Пароль" type="text" {...register("password", { pattern: { value: /^[A-Za-z0-9@]+$/, message: "Пароль может содержать буквы, цифры и @" }, minLength: { value: 8, message: "Минимум 8 символов" }, maxLength: { value: 50, message: "Максимум 50 символов" } })}/>
                </FormField>
                <FormField>
                    <input className={`register-form__input ${errors.confirmPassword?.message && "error"}`} placeholder="Подтвердите пароль" type="text" {...register("confirmPassword", { validate: value => password === value || "Пароли должны совпадать" })}/>
                </FormField>
                {registerMutation.error && <span className="register-form__error">Не удалось зарегистрироваться. Проверьте данные и попробуйте снова.</span>}
            </div>

            <button className="register-form__submit-btn primary__btn" type="submit">Создать аккаунт</button>
            <button className="register-form__change-btn" onClick={handleOnClickChangeBtn}>У меня есть пароль</button>
        </form>
    )
};