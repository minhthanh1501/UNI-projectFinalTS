
// import { useIsFetching, useIsMutating } from "@tanstack/react-query";
import useRouteElement from "./hooks/useRouteElement"
import { Toaster } from "react-hot-toast";
import ProgressLine from "./components/commons/ProgressLine";
import { ConfigProvider } from "antd";



function App() {
  const routeElement = useRouteElement();
  // const isFetching = useIsFetching()
  // const isMutating = useIsMutating()

  return (
    <div className="App">
      {/* {isFetching + isMutating !== 0 && <ProgressLine />} */}
      <ProgressLine />
      <ConfigProvider
        theme={{
          token: {
            colorBgContainer: "#141414",
            colorText: "white",
            colorBorder: "#222222",
            colorBgBase: "#141414",
            colorIcon: "#333",
            colorTextDisabled: "gray",
            colorBgContainerDisabled: "#333",
          },
          components: {
            Table: {
              headerBg: "#1c1c1c",
              borderColor: "#333"
            },
            Card: {
              colorBorderSecondary: "#333"
            }
          }
        }}
      >
        {routeElement}
      </ConfigProvider>
      <Toaster />
    </div>
  )
}

export default App
