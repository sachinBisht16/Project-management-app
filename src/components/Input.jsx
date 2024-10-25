import { forwardRef } from "react";

const Input = forwardRef(function Input ({label, textArea, type}, ref) {
    return (
        <>
            <label className='text-3xl font-semibold mb-2' htmlFor="">{label}</label>
            {textArea ? <textarea className="bg-slate-300 rounded-sm border-b-2 border-slate-500 h-28" ref={ref}></textarea> : <input className="bg-slate-300 rounded-sm border-b-2 border-slate-500 h-8" ref={ref} type={type} />}
        </>
    )
})

export default Input;