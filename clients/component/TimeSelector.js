const timelines = ["Day", "Week", "Month"]

export default function TimeSelector({ selectedPeriod, setSelectedPeriod }) {
    return (
        <footer className="bg-white rounded-t-xl p-4">
            <div className="flex rounded-md justify-evenly p-1 space-x-2 rounded-md bg-gray-200">
                {timelines.map((t, idx) => (
                  <div key={idx} onClick={() => setSelectedPeriod(timelines[idx])} className={`rounded-md flex-1 py-1 text-center hover:bg-gray-200 ${selectedPeriod === timelines[idx] ? "bg-white" : ""}`}>{t}</div>
                ))}
            </div>
        </footer>
    )
}
