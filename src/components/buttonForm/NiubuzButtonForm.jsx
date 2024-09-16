import { useSelector } from "react-redux"
import useNiubisConfiguration from "../../hooks/useNiubisConfiguration"

const NiubuzButtonForm = () => {
    const sessionTokenStatus = useSelector((state) => state.session.status)
    useNiubisConfiguration()
  
    if (sessionTokenStatus === 'idle' || sessionTokenStatus === 'failed') {
      return null
    }
    
    return <></>
}

export default NiubuzButtonForm