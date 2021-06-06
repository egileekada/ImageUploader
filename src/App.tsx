import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import main from './Screens/main'; 
import React from 'react' 

function App() { 
  
  return ( 
    <Router>
      <Switch>
        <Route exact component={main} path='/' />
      </Switch>
    </Router> 
  );
}

export default App;
