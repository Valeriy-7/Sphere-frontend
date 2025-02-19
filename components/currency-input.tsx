"use client";
import React, { useState } from "react";
import {
  CurrencyInputOnChangeValues,
  CurrencyInputProps,
  default as CInput,
} from "react-currency-input-field";
import type { VariantProps } from "class-variance-authority";
import { inputVariants } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { RUB, SUFFIX_RUB } from "@/lib/constants/rub";

type Props = {
  onChange: (val?: number) => void;
} & Omit<CurrencyInputProps, "onChange"> &
  VariantProps<typeof inputVariants>;
export function CurrencyInput({
  className,
  variant,
  size,
  type,
  value,
  onChange,
  ...props
}: Props) {
  const limit = 1000;

  const [errorMessage, setErrorMessage] = useState("");
  const [localClassName, setLocalClassName] = useState("");
  //const [value, setValue] = useState<string | number>(123.45);
  const [values, setValues] = useState<CurrencyInputOnChangeValues>();

  const handleOnValueChange: CurrencyInputProps["onValueChange"] = (
    _value,
    name,
    _values,
  ) => {
    // _values is only for demo purposes in this example
    setValues(_values);

    if (!_value) {
      setLocalClassName("");
      onChange?.();
      return;
    }

    // value is over limit
    if (Number(_value) > limit) {
      setErrorMessage(`Max: ${limit}`);
      setLocalClassName("is-invalid");
      onChange?.(Number(_value));
      return;
    }

    setLocalClassName("is-valid");
    onChange?.(Number(_value));
  };

  return (
    <CInput
      className={cn(
        inputVariants({ variant, size, className }),
        localClassName,
      )}
      value={value}
      onValueChange={handleOnValueChange}
      step={10}
      {...props}
    />
  );
}
