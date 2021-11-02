import { Switch, BrowserRouter, Route } from 'react-router-dom'
import { ContextProvider } from './context/context'
import Comorbidities from './components/Onboarding/Comorbidities'
import Login from './components/Onboarding/Login'
import Signup from './components/Onboarding/Signup'
import Home from "./components/Home/Home"

function App() {
  return (
    <ContextProvider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/home" component={Home} />
          <Route exact path="/" component={Signup} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/comorbidities" component={Comorbidities} />
        </Switch>
      </BrowserRouter>
    </ContextProvider>
  )
} 

export default App
