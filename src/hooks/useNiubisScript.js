import { useEffect, useState } from 'react'

const NIUBIZ_DOM_ID = 'niubizScript'

const useNiubizScript = (callback) => {
  const [isScriptLoaded, setIsScriptLoaded] = useState(false)
  useEffect(() => {
    const existingScript = document.getElementById(NIUBIZ_DOM_ID)

    if (existingScript) {
      setIsScriptLoaded(true)
    } else {
      const script = document.createElement('script')
      console.log(import.meta.env.VITE_NIUBIZ_URL)
      script.src = import.meta.env.VITE_NIUBIZ_URL
      script.id = NIUBIZ_DOM_ID
      document.body.appendChild(script)
      script.onload = () => {
        setIsScriptLoaded(true)
        if (callback) callback()
      }
    }
    return () => destroyNiubizScript
  }, [callback])
  return isScriptLoaded
}

export const destroyNiubizScript = () => {
  const element = document.getElementById(NIUBIZ_DOM_ID)
  if (element) {
    element.remove()
  }
}

export default useNiubizScript
