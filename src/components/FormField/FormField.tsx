import { FC, ReactNode } from "react";

interface IFormFieldProps {
    children: ReactNode;
};

export const FormField: FC<IFormFieldProps> = ({ children }) => {
    return <label className="form-field">{children}</label>;
};