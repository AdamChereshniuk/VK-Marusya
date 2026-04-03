import { Account } from "./components/Account/Account";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <Account/>
    </Provider>
  );
};

export default App;