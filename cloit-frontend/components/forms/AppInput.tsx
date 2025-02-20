interface AppInputProps {
    value: string | number,
    isDisabled?: boolean,
    placeholder: string,
    name: string,
    label: string,
    isFocused?: boolean,
    className?: string
}

export default function AppInput(props: AppInputProps) {
    const {value, isDisabled, name, placeholder, isFocused, label, className} = props;
    return <div className="space-y-2 flex flex-col">
        <label className={"font-light"} htmlFor={name}>{label}</label>
        <input type="text" id={name} className={`bg-gray-200 p-3 rounded-2xl md:max-w-72 ${className}`}
               autoFocus={isFocused}
               name={name}
               placeholder={placeholder} defaultValue={value} disabled={isDisabled}/>
    </div>
}