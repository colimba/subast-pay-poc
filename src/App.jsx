import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './components/Home'
import PaymentCallback from './components/buttonForm/PaymentCallback'

function App() {
  return (
    <Router>
      <div className="App">
        <h1 className="nes-text is-primary">niubiz integration POC</h1>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/paymentCallback/:id=" element={<PaymentCallback />} />
          {/* <Route path="/success" element={<Success />} /> */}
          <Route path="/success" element={<div>success</div>}/>
          <Route path="/failure" element={<div>failure</div>}/>
        </Routes>
        <p className="read-the-docs">Power by TechHouse</p>
      </div>
    </Router>
  )
}

export default App
