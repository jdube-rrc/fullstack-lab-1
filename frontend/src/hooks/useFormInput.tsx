import { useState } from "react";

// Validation callback type - takes the current value and returns an error message or null
type ValidationCallback<T> = (value: T) => string | null;

interface UseFormInputReturn<T> {
    value: T;
    setValue: (value: T) => void;
    message: string | null;
    setMessage: (message: string | null) => void;
    validate: (callback: ValidationCallback<T>) => boolean;
    reset: (initialValue: T) => void;
}

export function useFormInput<T>(initialValue: T): UseFormInputReturn<T> {
    const [value, setValue] = useState<T>(initialValue);
    const [message, setMessage] = useState<string | null>(null);

    // Validates using the provided callback, updates the message, and returns whether valid
    const validate = (callback: ValidationCallback<T>): boolean => {
        const errorMessage = callback(value);
        setMessage(errorMessage);
        return errorMessage === null;
    };

    // Resets the value and clears the message
    const reset = (resetValue: T) => {
        setValue(resetValue);
        setMessage(null);
    };

    return {
        value,
        setValue,
        message,
        setMessage,
        validate,
        reset,
    };
}
