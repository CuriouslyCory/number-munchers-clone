interface TroggleCharacterProps {
  type: string
}

export default function TroggleCharacter({ type }: TroggleCharacterProps) {
  // Different troggle types could have different colors
  const color = type === "random" ? "bg-purple-600" : "bg-red-600"

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className={`w-4/5 h-4/5 ${color} relative`}>
        {/* Eyes */}
        <div className="absolute top-1/4 start-1/4 w-1/5 h-1/5 bg-white rounded-full">
          <div className="absolute inset-1/4 bg-black rounded-full"></div>
        </div>
        <div className="absolute top-1/4 end-1/4 w-1/5 h-1/5 bg-white rounded-full">
          <div className="absolute inset-1/4 bg-black rounded-full"></div>
        </div>

        {/* Mouth */}
        <div className="absolute bottom-1/3 start-1/4 w-1/2 h-1/6 bg-white flex items-center justify-around">
          <div className="w-1/5 h-4/5 bg-black"></div>
          <div className="w-1/5 h-4/5 bg-black"></div>
        </div>

        {/* Legs */}
        <div className="absolute bottom-0 start-1/5 w-1/6 h-1/4 bg-purple-600"></div>
        <div className="absolute bottom-0 end-1/5 w-1/6 h-1/4 bg-purple-600"></div>
      </div>
    </div>
  )
}

