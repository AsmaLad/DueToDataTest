import React from "react";
import { Provider } from "react-redux";
import { AppStack } from "./navigation/navigation";
import { store } from "./redux/store/index";


const App = () => {
    return (
      <Provider store={store}>
        <AppStack />
      </Provider>
    );
}

export default App;

