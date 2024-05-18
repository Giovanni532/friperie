export default function Spinner({message}) {
    return (
      <div className="flex flex-col items-center justify-center h-40 space-y-4">
      <div className="w-16 h-16 border-4 border-gray-300 border-t-gray-900 rounded-full animate-spin" />
      <p className="text-gray-500 dark:text-gray-400">{message}</p>
    </div>
    )
  }