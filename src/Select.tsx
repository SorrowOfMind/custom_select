import React, {useState, useEffect} from "react"

import styles from "./select.module.css"

type SelectOption = {
    label: string,
    value: string | number
}

type SelectProps = {
    value?: SelectOption | undefined,
    options: SelectOption[],
    onChange: (value: SelectOption | undefined) => void
}

export const Select: React.FC<SelectProps> = ({value, onChange, options}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [highlightedIdx, setHighlightedIdx] = useState<number | null>(0);

    useEffect(() => {
        if (isOpen) {
            setHighlightedIdx(0);   
        }
    }, [isOpen]);

    const clearOptions = (e: React.MouseEvent) => {
        e.stopPropagation();
        onChange(undefined);
    }

    const selectOption = (e: React.MouseEvent, option: SelectOption) => {
        e.stopPropagation();

        if (option.value !== value?.value) {
            onChange(option);
        }
        setIsOpen(false);
    }

    const isOptionSelected = (option: SelectOption) => {
        return option.value === value?.value;
    }

    return (
        <div 
            tabIndex={0} 
            className={styles.container}
            onClick={() => setIsOpen(prev => !prev)}
            onBlur={() => setIsOpen(false)}
        >
            <span className={styles.value}>{value?.label}</span>
            <button 
                className={styles["clear-btn"]}
                onClick={(e) => clearOptions(e)}
            >&times;</button>
            <div className={styles.divider}></div>
            <div className={styles.caret}></div>
            <ul className={`${styles.options} ${isOpen ? styles.show : ""}`}>
                {options && options.map((option, idx) => (
                    <li 
                        key={option.value} 
                        className={`${styles.option} ${isOptionSelected(option) ? styles.selected : ""} ${idx === highlightedIdx ? styles.highlighted : ""}`}
                        onClick={(e) => selectOption(e, option)}
                        onMouseEnter={() => setHighlightedIdx(idx)}
                    >{option.label}</li>
                ))}
            </ul>
        </div>
    )
}
