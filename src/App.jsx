import './App.css'
import { useDispatch } from 'react-redux'
import InitialDataForm from './components/InitialDataForm'
import PaymentForm from './components/PaymentForm'
import StatusDialog from './components/StatusDialog'
import useNiubizScript from './hooks/useNiubisScript'
import { setNiubizScriptMounted } from './features/globals/globalSlice'

function App() {
  const dispatch = useDispatch()
  const notifyScriptMounted = () => dispatch(setNiubizScriptMounted(true))

  const isScriptLoaded = useNiubizScript(notifyScriptMounted)

  return (
    <div className="App">
      <div>
        <h1 className="nes-text is-primary">niubiz integration POC</h1>
        <InitialDataForm />
        {isScriptLoaded && <PaymentForm />}
        <StatusDialog />
      </div>
      <p className="read-the-docs">Power by TechHouse</p>
    </div>
  )
}

export default App
