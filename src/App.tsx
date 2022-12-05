import {useState} from "react"

import {Select} from "./Select";

const options = [
  {label: "first", value: 1},
  {label: "second", value: 2},
  {label: "third", value: 3},
  {label: "fourth", value: 4},
  {label: "fifth", value: 5},
]

function App() {
  const [value, setValue] = useState<typeof options[0] | undefined>(options[0]);
  return (
    <div className="App">
      <Select options={options} value={value} onChange={(o) => setValue(o)}/>
    </div>
  )
}

export default App
