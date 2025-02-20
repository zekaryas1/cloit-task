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

    return err ? <p className={"text-red-400 border border-gray-200 rounded-md p-2"}>{err}</p> : null;
}