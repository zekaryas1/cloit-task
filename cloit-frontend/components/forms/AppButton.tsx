interface AppButtonPropType {
    variant: "Primary" | "Secondary" | "Danger" | "WhiteOutlined",
    onClick?: () => void,
    className?: string
    type: "submit" | "button"
    label: string
}

export default function AppButton(props: AppButtonPropType) {
    const {variant, label, type, onClick, className} = props

    if (variant == "Primary") {
        return <button type={type} className={`bg-primary-950 p-2 px-6 text-white rounded-3xl ${className}`}
                       onClick={onClick}>{label}</button>
    }
    if (variant == "Secondary") {
        return <button type={type}
                       className={`bg-secondary-600 p-2 px-6 text-white rounded-3xl ${className}`}
                       onClick={onClick}>{label}</button>
    }

    return <button type={type} className={`border p-2 px-6 text-black rounded-3xl ${className}`}
                   onClick={onClick}>{label}</button>
}