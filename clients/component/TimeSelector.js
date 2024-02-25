import { useState } from "react"

const timelines = ["Day", "Week", "Month"]

export default function TimeSelector() {
    const [selected, setSelected] = useState(0)

    return (
        <footer className="bg-white rounded-t-xl p-4">
            <div className="flex rounded-md justify-evenly p-2 space-x-2 rounded-md bg-gray-200">
                {timelines.map((t, idx) => (
                  <div key={idx} onClick={() => setSelected(idx)} className={`rounded-md flex-1 py-1 text-center hover:bg-gray-200 ${selected === idx ? "bg-white" : ""}`}>{t}</div>
                ))}
            </div>
        </footer>
    )
}
