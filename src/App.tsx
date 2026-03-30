import { Account } from "./components/Account/Account";
import "./App.css";
import { Provider } from "react-redux";
import { store } from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <Account/>
    </Provider>
  );
};

export default App;
