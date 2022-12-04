import styles from "./select.module.css"

type SelectOption = {
    label: string,
    value: string
}

type SelectProps = {
    value?: SelectOption | undefined,
    options: SelectOption[],
    onChange: (value: SelectOption | undefined) => void
}

export const Select: React.FC<SelectProps> = ({value, onChange, options}) => {
  return (
    <div className={styles.container}>
        <span className={styles.value}>Value</span>
        <button className={styles["clear-btn"]}>&times;</button>
        <div className={styles.divider}></div>
        <div className={styles.caret}></div>
        <ul className={styles.options}>
            {options && options.map(option => (
                <li key={option.value} className={styles.option}>{option.label}</li>
            ))}
        </ul>
    </div>
  )
}
