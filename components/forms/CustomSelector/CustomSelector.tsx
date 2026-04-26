"use client";

import { useState } from "react";
import { useField } from "formik";
import clsx from "clsx";
import css from "./CustomSelector.module.css";

interface Option {
  label: string;
  value: string;
}

interface CustomSelectorProps {
  name: string;
  options: Option[];
  placeholder?: string;
}

const CustomSelector = ({
  name,
  options,
  placeholder = "Select option",
}: CustomSelectorProps) => {
  const [isOpenSelector, setIsOpenSelector] = useState(false);
  const [field, meta, helpers] = useField<string>(name);

  const selectedOption =
    options.find((option) => option.value === field.value) ?? null;

  return (
    <div className={css.wrapper}>
      <div
        className={clsx(css.select, isOpenSelector && css.isOpen)}
        onBlur={() => helpers.setTouched(true)}
        onClick={() => setIsOpenSelector((prevState) => !prevState)}
        role="button"
        tabIndex={0}
      >
        <p className={clsx(css.selectorTitle, selectedOption && css.selected)}>
          {selectedOption?.label || placeholder}
        </p>
        <span className={css.icon}>
          <svg width="12" height="7">
            <use
              href={
                isOpenSelector
                  ? "/icons/sprite.svg#icon-chevron-up"
                  : "/icons/sprite.svg#icon-chevron-down"
              }
            />
          </svg>
        </span>
      </div>

      {isOpenSelector && (
        <ul className={css.options}>
          {options.map((option) => (
            <li
              className={css.elem}
              key={option.value}
              onClick={() => {
                setIsOpenSelector(false);
                helpers.setValue(option.value);
                helpers.setTouched(true);
              }}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}

      {meta.touched && meta.error && (
        <div className={css.errorMessage}>{meta.error}</div>
      )}
    </div>
  );
};

export default CustomSelector;
