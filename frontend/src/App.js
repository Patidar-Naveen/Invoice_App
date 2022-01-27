import './App.css';
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
const Login = lazy(() => import('./components/Login'));
const Registration = lazy(() => import('./components/Registration'));
const Dashboard = lazy(() => import('./components/Dashboard'));
const AddInvoice = lazy(() => import('./components/AddInvoice'));
const Preview = lazy(() => import('./components/Preview'));
const Setting = lazy(() => import('./components/Setting'));

function App() {
  return (
    <div>
      <Router>
        <Suspense fallback={<img width="100%" height="655px" src="./images/wating.jpg" alt="Loading.." />}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/addinvoice" element={<AddInvoice />} />
            <Route path="/setting" element={<Setting />} />
            <Route path="/preview" element={<Preview />} />
            <Route path="*" element={<img width="100%" height="655px" src="./images/notfound.gif" alt="not found" />} />
          </Routes>
        </Suspense>

      </Router>
    </div>
  );
}

export default App;

