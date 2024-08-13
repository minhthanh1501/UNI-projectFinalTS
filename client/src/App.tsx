
import { useIsFetching, useIsMutating } from "@tanstack/react-query";
import useRouteElement from "./hooks/useRouteElement"
import { Toaster } from "react-hot-toast";
import ProgressLine from "./components/commons/ProgressLine";



function App() {
  const routeElement = useRouteElement();
  const isFetching = useIsFetching()
  const isMutating = useIsMutating()

  return (
    <div className="App">
      {/* {isFetching + isMutating !== 0 && <ProgressLine />} */}
      <ProgressLine />
      {routeElement}
      <Toaster />
    </div>
  )
}

export default App
