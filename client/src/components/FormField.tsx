interface FormFieldProps {
    label: string;
    type: string;
    name: string;
    value?: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function FormField({label, type, name, value, onChange}: FormFieldProps){
    return (
        <div>
            <label>{label}</label>
            <input type={type} name={name} value={value} onChange={onChange}/>
         </div>
    )
}