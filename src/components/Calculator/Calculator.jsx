import Display from './Display'
import ButtonGrid from './ButtonGrid'
import Logo from '../ui/Logo'
import styles from './Calculator.module.css'

const Calculator = ({ displayValue, expression, onButtonPress }) => {
    return (
        <div className={styles.wrapper}>
            {/* Bear ears — purely decorative */}
            <div className={styles.ears} aria-hidden="true">
                <span className={styles.ear} />
                <span className={styles.ear} />
            </div>

            <div className={styles.card}>
                {/* Kawaii face */}
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
                <ButtonGrid onPress={onButtonPress} />

                <p className={styles.tagline}>math, but make it adorable ˚₊✧</p>
            </div>
        </div>
    );
};

export default Calculator;