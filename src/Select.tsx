import React, {useState, useEffect, useRef} from "react"

import styles from "./select.module.css"

export type SelectOption = {
    label: string
    value: string | number
};

type SingleSelectProps = {
    multiple?: false
    value?: SelectOption
    onChange: (value: SelectOption | undefined) => void
};

type MultipleSelectProps = {
    multiple: true
    value: SelectOption[]
    onChange: (value: SelectOption[]) => void
};

type SelectProps = {
    options: SelectOption[]
  } & (SingleSelectProps | MultipleSelectProps);

export const Select: React.FC<SelectProps> = ({multiple, value, onChange, options}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [highlightedIdx, setHighlightedIdx] = useState<number>(0);

    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isOpen) {
            setHighlightedIdx(0);   
        }
    }, [isOpen]);

    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.target != containerRef.current) { //should only work on the container itself
                return;
            }

            switch(e.code) {
                case "Enter":
                case "Space":
                    setIsOpen(prev => !prev);
                    if (isOpen) {
                        selectOption(e, options[highlightedIdx]);
                    }
                    break;
                case "ArrowUp":
                case "ArrowDown": {
                    if (!isOpen) {
                        setIsOpen(true);
                        break;
                    }
                    const newValue = highlightedIdx + (e.code === "ArrowDown" ? 1 : -1);

                    if (newValue >= 0 && newValue < options.length) {
                        setHighlightedIdx(newValue);
                    }
                    break;
                }
                case "Escape":
                    setIsOpen(false);
                    break;
            }
        }

        containerRef.current?.addEventListener("keydown", handler);

        return () => {containerRef.current?.removeEventListener("keydown", handler);}
    }, [isOpen, highlightedIdx, options]);

    const clearOptions = (e: React.MouseEvent) => {
        e.stopPropagation();
        multiple ? onChange([]) : onChange(undefined);
    }

    const selectOption = (e: MouseEvent | KeyboardEvent, option: SelectOption) => {
        e.stopPropagation();

        if (multiple) {
            if (value.includes(option)) {
                onChange(value.filter(val => val !== option));
            } else {
                onChange([...value, option]);
            }
        } else {
            if (option.value !== value?.value) {
                onChange(option);
            }
        }

        setIsOpen(false);
    }

    const isOptionSelected = (option: SelectOption) => {
        return multiple ? value.includes(option) : option === value;
    }

    return (
        <div 
            tabIndex={0} 
            className={styles.container}
            onClick={() => setIsOpen(prev => !prev)}
            onBlur={() => setIsOpen(false)}
            ref={containerRef}
        >
            <span className={styles.value}>
                {multiple ? value.map(val => (
                    <button 
                        key={val.value}
                        onClick={e => selectOption(e, val)}
                        className={styles["option-badge"]}
                    >{val.label}<span className={styles["remove-btn"]}>&times;</span></button>
                )) : value?.label}</span>
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
