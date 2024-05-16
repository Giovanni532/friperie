export default function Spinner({message}) {
    return (
      <div className="flex items-center justify-center h-1/2">
        <div className="w-12 h-12 border-4 border-gray-300 border-t-gray-900 rounded-full animate-spin" />
        <div>
            <p>{message}</p>
        </div>
      </div>
    )
  }