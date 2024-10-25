import { useRef, useImperativeHandle, forwardRef } from "react";

import Input from "./Input"

const NewProject = forwardRef(function NewProject ({onSave, onCancel}, ref) {
    const title = useRef();
    const date = useRef();
    const description = useRef();

    useImperativeHandle (ref, () => {
        return {
            open () {
                return {
                    title: title.current.value,
                    date: date.current.value,
                    description: description.current.value,
                    projectId: Math.random(), 
                    tasks: []
                }
            }
        }
    })

    return (
        <div className="flex flex-col my-auto ml-14 w-3/5">
            <div className="flex justify-end">
                <button className="bg-white text-black m-2 py-1 px-3 rounded" onClick={onCancel}>Cancel</button>
                <button className="bg-black text-white m-2 py-1 px-3 rounded" onClick={onSave}>Save</button>
            </div>
            <Input ref={title} label='Title' type='text'/>
            <Input ref={description} label='Description' textArea/>
            <Input ref={date} label='Due Date' type='date'/>
        </div>
    )
})

export default NewProject;