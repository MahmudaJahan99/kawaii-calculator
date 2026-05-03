import { motion } from 'framer-motion'
import clsx from 'clsx'
import styles from './CalcButton.module.css'

const CalcButton = ({ label, value, type, wide, onPress }) => {
    return (
        <motion.button
            className={clsx(
                styles.btn,
                styles[type],        // e.g. styles['number'], styles['operator']
                wide && styles.wide, // spans 2 columns when true
            )}
            onClick={() => onPress(value)}
            whileTap={{ scale: 0.88 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        >
            {label}
        </motion.button>
    );
};

export default CalcButton;