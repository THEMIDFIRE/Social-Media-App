
export default function ErrorMsg({error, ...props}) {
    return (
        <p className="text-red-600 font-medium" {...props}>{error}</p>
    )
}
