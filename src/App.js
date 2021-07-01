import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./pages/Common/Navbar/Navbar";
import RegistrationBar from "./pages/Common/RegistrationBar/RegistrationBar";
import Signup from "./pages/Registration/Signup/Signup";
import Login from "./pages/Registration/Login/Login";
import UploadCheque from "./pages/UploadCheque/UploadCheque";
import Decoded from "./pages/Decoded/Decoded";
import ChequeTable from "./pages/ChequeTable/ChequeTable";
import Routingnumber from "./pages/Routingnumber/Routingnumber";
import { AuthProvider } from "./Authentication/Auth";
function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <>
              <Navbar />
              <Route path="/uploadcheque" component={UploadCheque} />
              {/* <Route path="/decoded" component={Decoded} /> */}
              <Route path="/chequetable" component={ChequeTable} />
              <Route path="/routingnumber" component={Routingnumber} />
            </>
          </Switch>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
