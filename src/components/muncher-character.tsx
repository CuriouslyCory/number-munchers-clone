export default function MuncherCharacter() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-4/5 h-4/5 bg-green-500 relative">
        {/* Eyes */}
        <div className="absolute top-1/4 start-1/4 w-1/5 h-1/5 bg-white rounded-full"></div>
        <div className="absolute top-1/4 end-1/4 w-1/5 h-1/5 bg-white rounded-full"></div>

        {/* Mouth */}
        <div className="absolute bottom-1/4 start-1/4 w-1/2 h-1/5 bg-black"></div>

        {/* Legs */}
        <div className="absolute bottom-0 start-1/4 w-1/6 h-1/4 bg-green-500"></div>
        <div className="absolute bottom-0 end-1/4 w-1/6 h-1/4 bg-green-500"></div>
      </div>
    </div>
  )
}

