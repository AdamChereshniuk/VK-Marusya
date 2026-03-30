import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../queryClient";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormField } from "../FormField/FormField";
import Api from "../../api/api";
import "./RegisterForm.css";

const RegisterUserSchema = z.object({
    email: z.string().email("Неправильный адрес почты"),
    firstname: z.string().min(6, "Длина имени должна быть не менее 6 символов").max(10, "Длина имени должна быть не более 10 символов"),
    surname: z.string().min(8, "Длина фамилии должна быть не менее 8 символов").max(20, "Длина фамилии должна быть не более 20 символов"),
    password: z.string().min(10, "Длина пароля должна быть менее 10 символов").max(14, "Длина пароля должна быть не более 14 символов"),
});
type RegisterForm = z.infer<typeof RegisterUserSchema>;

export const RegisterForm = ({handleOnClickRegisterFormBtn}: {handleOnClickRegisterFormBtn: () => void}) => {
    const {
        register, handleSubmit, formState: { errors },
    } = useForm<RegisterForm>({
        resolver: zodResolver(RegisterUserSchema),
    });
    
    const registerMutation = useMutation(
        {
            mutationFn: ({email, password, firstname, surname}: RegisterForm) => Api.registerUser(email, password, firstname, surname),
            onSuccess() {
                queryClient.invalidateQueries({ queryKey: ["users", "me"] });
                handleOnClickRegisterFormBtn();
            },
            onError(e) {
                console.log(JSON.parse(e.message)[0].message);
            },
        },
        queryClient
    );
    
    return (
        <form className="register__form" action="POST" onSubmit={handleSubmit(({ email, firstname, surname, password }: RegisterForm) => {
            registerMutation.mutate({ email, password, firstname, surname });
        })}>
            <FormField errorMessage={errors.email?.message}>
                <input className="register__input register__input--email"
                    placeholder="Электронная почта"
                    type="text"
                    {...register("email")}
                />
            </FormField>
            
            <FormField errorMessage={errors.firstname?.message}>
                <input className="register__input register__input--first-name"
                    placeholder="Имя"
                    type="text"
                    {...register("firstname")}
                />
            </FormField>

            <FormField errorMessage={errors.surname?.message}>
                <input className="register__input register__input--last-name"
                    placeholder="Фамилия"
                    type="text"
                    {...register("surname")}
                />
            </FormField>

            <FormField errorMessage={errors.password?.message}>
                <input className="register__input register__input--password"
                    placeholder="Пароль"
                    type="text"
                    {...register("password")}
                />
            </FormField>

            <FormField>
                <input className="register__input register__input--repeat-password"
                    placeholder="Подтвердите пароль"
                    type="text"
                />
            </FormField>
            
            {registerMutation.error && <span style={{ color: "red" }}>{registerMutation.error.message}</span>}

            <button className="register__btn--submit primary__btn" type="submit">Создать аккаунт</button>
        </form>
    )
};