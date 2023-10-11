import Header from './components/Header'
import Main from './components/Main'
import { ContextProvider } from './context/ContextProvider'

export default function App() {
  return (
    <ContextProvider>
      <Header />
      <Main />
    </ContextProvider>
  )
}
