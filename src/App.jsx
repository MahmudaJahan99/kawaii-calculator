import { useCalculator } from './hooks/useCalculator'
import Calculator from './components/Calculator/Calculator'
import styles from './App.module.css'

function App() {
const { displayValue, expression, handleButtonPress } = useCalculator()

  return (
    <main className={styles.main}>
      <Calculator
        displayValue={displayValue}
        expression={expression}
        onButtonPress={handleButtonPress}
      />
    </main>
  )
}

export default App
