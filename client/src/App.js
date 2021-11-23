import { Switch, BrowserRouter, Route } from "react-router-dom"
import { ContextProvider } from "./context/context"
import WhoAmI from "./components/Onboarding/WhoAmI"
import Comorbidities from "./components/Onboarding/Comorbidities"
import Login from "./components/Onboarding/Login"
import Signup from "./components/Onboarding/Signup"
import VerificationCode from "./components/Onboarding/VerificationCode"
import Home from "./components/Home/Home"
import Vaccines from "./components/Vaccines/Vaccines"
import Profile from "./components/Profile/Profile"
import AddVaccinator from "./components/AddVaccinator/AddVaccinator"
import Inscriptions from "./components/Inscriptions/Inscriptions"

function App() {
  return (
    <ContextProvider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={WhoAmI} />
          <Route exact path="/add-vaccinator" component={AddVaccinator} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/comorbidities" component={Comorbidities} />
          <Route exact path="/verification" component={VerificationCode} />
          <Route exact path="/vaccines" component={Vaccines} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/inscriptions" component={Inscriptions} />
        </Switch>
      </BrowserRouter>
    </ContextProvider>
  )
}

export default App
