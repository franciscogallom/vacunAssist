import { Switch, BrowserRouter, Route } from 'react-router-dom'
import Login from './components/Onboarding/Login'
import Signup from './components/Onboarding/Signup'

function App() {
  return (
    <BrowserRouter>
	<Switch>
		{/* <Route exact path="/" component={Home} /> */}
		<Route exact path="/" component={Signup} />
		<Route exact path="/login" component={Login} />
	</Switch>
</BrowserRouter>
  )
}

export default App
