import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import store from "./store";
import { initSocket } from "./socket";
import { registerSocketListeners } from "./socketListeners";

function App() {
  const { userInfo } = useSelector((state) => state.auth);
  const user = userInfo || null;

  useEffect(() => {
    if (user?._id) {
      const socket = initSocket();
      socket.connect();
      registerSocketListeners(store, user._id);
    }

    return () => {
      if (user?._id) {
        const socket = initSocket();
        socket.disconnect();
      }
    };
  }, [user]);

  return <RouterProvider router={router} />;
}

export default App;
