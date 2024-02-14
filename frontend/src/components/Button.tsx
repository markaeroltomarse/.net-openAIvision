import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import { FaArrowsSpin } from "react-icons/fa6";
export interface ButtonProps {
    buttonAttributes?: DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
    children?: React.ReactNode
    isLoading?: React.ReactNode
}

const Button: React.FC<ButtonProps> = (props) => {
    const { buttonAttributes, children, isLoading } = props;
    return <button {...buttonAttributes} disabled={!!isLoading || buttonAttributes?.disabled} className={`rounded-md p-5 flex gap-3 bg-gray-300 hover:opacity-70 ${(buttonAttributes?.disabled || isLoading) && 'opacity-50'} ${buttonAttributes?.className}`} >
        {isLoading ? <FaArrowsSpin size={40} className="animate-spin" /> : children}
    </button>
};

export default Button;
