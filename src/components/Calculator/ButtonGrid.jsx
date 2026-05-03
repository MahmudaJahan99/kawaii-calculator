import { BUTTON_CONFIG } from '../../constants/buttons'
import CalcButton from './CalcButton'
import styles from './ButtonGrid.module.css'

const ButtonGrid = ({ onPress, activeKey  }) => {
    return (
        <div className={styles.grid}>
            {BUTTON_CONFIG.map((btn) => (
                <CalcButton
                    key={btn.value + btn.label}  // stable, unique key
                    label={btn.label}
                    value={btn.value}
                    type={btn.type}
                    wide={btn.wide}
                    onPress={onPress}
                    isActive={activeKey === btn.value}
                />
            ))}
        </div>
    );
};

export default ButtonGrid;