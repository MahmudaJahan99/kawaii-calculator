import { motion } from 'framer-motion'
import Display from './Display'
import ButtonGrid from './ButtonGrid'
import Logo from '../ui/Logo'
import styles from './Calculator.module.css'

const Calculator = ({ displayValue, expression, onButtonPress, activeKey }) => {
    return (
        <motion.div
            className={styles.wrapper}
            initial={{ opacity: 0, y: 32, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: 'spring', stiffness: 260, damping: 22, delay: 0.1 }}
        >
            <div className={styles.ears} aria-hidden="true">
                <span className={styles.ear} />
                <span className={styles.ear} />
            </div>
            <div className={styles.card} role="application" aria-label="Kawaii Calc calculator">
                <div className={styles.face} aria-hidden="true">
                    <span className={styles.eye}>
                        <span className={styles.cheek} />
                    </span>
                    <span className={styles.mouth} />
                    <span className={styles.eye}>
                        <span className={styles.cheek} />
                    </span>
                </div>

                <Logo />

                <Display value={displayValue} expression={expression} />
                <ButtonGrid onPress={onButtonPress} activeKey={activeKey} />

                <p className={styles.tagline}>math, but make it adorable ˚₊✧</p>
            </div>
        </motion.div>
    );
};

export default Calculator;