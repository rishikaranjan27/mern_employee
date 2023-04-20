import {
  BrowserRouter as Router,
  Routes, 
  Route,
  Link
} from 'react-router-dom';

import { HomeScreen } from './Screens/HomeScreen'
import { CreateScreen } from './Screens/CreateScreen'
import { UpdateScreen } from './Screens/UpdateScreen'
import { DashboardScreen } from './Screens/DashboardScreen'




function App() {
  return (
    <div className="App">

    <Router>

    <Routes>

      <Route path = '/' element={<HomeScreen/>}/>
      <Route path='/create' element={<CreateScreen/>}/>
      <Route path='/update/:id' element={<UpdateScreen/>}/>
      <Route path='/dashboard' element={<DashboardScreen/>}/>
    
      
    </Routes>

    </Router>

     
    </div>
  );
}

export default App;
