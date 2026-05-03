import { motion } from 'framer-motion'
import clsx from 'clsx'
import styles from './CalcButton.module.css'

const CalcButton = ({ label, value, type, wide, onPress, isActive }) => {
    // Map button labels to more descriptive aria-labels for screen readers
    function getAriaLabel(label, value) {
        const labels = {
            '÷': 'divide',
            '×': 'multiply',
            '−': 'subtract',
            '+': 'add',
            '♡': 'equals',
            '+/-': 'toggle positive negative',
            '%': 'percent',
            'AC': 'all clear',
            '.': 'decimal point',
        }
        return labels[label] ?? label
    }

    return (
        <motion.button
            className={clsx(
                styles.btn,
                styles[type],
                wide && styles.wide,
                isActive && styles.active,
            )}
            onClick={() => onPress(value)}
            aria-label={getAriaLabel(label, value)}
            aria-pressed={isActive}
            whileTap={{ scale: 0.88, y: 2 }}
            nimate={isActive
                ? { scale: 0.88, y: 2 }
                : { scale: 1, y: 0 }
            }
            transition={{ type: 'spring', stiffness: 420, damping: 18 }}
        >
            {label}
        </motion.button>
    );
};

export default CalcButton;