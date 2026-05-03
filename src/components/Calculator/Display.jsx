import { motion, AnimatePresence } from 'framer-motion'
import styles from './Display.module.css'

const Display = ({ value, expression }) => {
    return (
        <div className={styles.display}>
            {/* Decorative stars */}
            <span className={styles.stars} aria-hidden="true">✦ ✦</span>

            {/* Expression fades in/out smoothly */}
            <AnimatePresence mode="wait">
                <motion.p
                    key={expression}
                    className={styles.expression}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                >
                    {expression || '\u00A0'}
                </motion.p>
            </AnimatePresence>

            {/* Main number — animated when value changes */}
            <AnimatePresence mode="wait">
                <motion.p
                    key={value}
                    className={styles.value}
                    initial={{ opacity: 0, y: 8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.97 }}
                    transition={{ type: 'spring', stiffness: 380, damping: 22 }}
                >
                    {value}
                </motion.p>
            </AnimatePresence>
        </div>
    );
};

export default Display;