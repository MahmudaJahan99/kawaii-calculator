import { motion, AnimatePresence } from 'framer-motion'
import styles from './Display.module.css'

const Display = ({ value, expression }) => {
    return (
        <div className={styles.display}>
            {/* Decorative stars — pure CSS/HTML, no logic */}
            <span className={styles.stars} aria-hidden="true">✦ ✦</span>

            {/* Expression row — e.g. "42 +" */}
            <p className={styles.expression}>
                {expression || '\u00A0'} {/* \u00A0 is a non-breaking space — keeps height stable */}
            </p>

            {/* Main number — animated when value changes */}
            <AnimatePresence mode="wait">
                <motion.p
                    key={value}              // changing key triggers exit + enter animation
                    className={styles.value}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.12 }}
                >
                    {value}
                </motion.p>
            </AnimatePresence>
        </div>
    );
};

export default Display;