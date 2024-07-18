import useRouteElement from "./hooks/useRouteElement"
import { Toaster } from "react-hot-toast";


function App() {
  const routeElement = useRouteElement();
  return (
    <div className="App">
      {routeElement}
      <Toaster />
    </div>
  )
}

export default App
