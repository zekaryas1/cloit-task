import {useEffect, useState} from "react";

export default function CustomError(props: { error: string }) {
    const [err, setErr] = useState(props.error)

    useEffect(() => {
        if (err) {
            const timeoutId = setTimeout(() => {
                setErr("")
            }, 2000)

            return () => {
                clearTimeout(timeoutId);
            }
        }
    }, [err])

    return err ? <span className={"flex py-4 rounded-md text-red-700 animate-pulse"}>{err}</span> : null;
}


export function CustomLoading({isLoading}: { isLoading: boolean }) {

    if (isLoading){
        return <span className={"flex py-4 rounded-md text-primary-700 animate-pulse"}>Loading, please wait...</span>
    }
    return null;
}