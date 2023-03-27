import { Routes, Route } from 'react-router-dom';

import Navigation from './components/routes/navigation/navigation.component';
import Home from "./components/routes/home/home.component";
import Authentication from './components/routes/authentication/authentication.component';

const Shop = () => {
  return(
    <div>
      <h1> Iam the shopping page</h1>
    </div>
  )
}


const App = () => {
   return(
      <Routes>
        <Route path='/' element={<Navigation/>}>
          <Route index element={<Home/>}/>
          <Route path='shop' element={<Shop/>}/>
          <Route path='auth' element={<Authentication/>}/>
        </Route>
      </Routes>
   ) 
}

export default App;
