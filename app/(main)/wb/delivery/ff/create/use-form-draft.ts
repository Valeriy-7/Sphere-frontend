'use client';

import { useEffect, useState } from 'react';

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

import type { UseFormReturn } from 'react-hook-form';

type DraftInfo = {
  lastSaved: string | null;
  hasDraft: boolean;
};

export function useFormDraft<T extends Record<string, any>>(
  form: UseFormReturn<T>,
  storageKey: string,
): DraftInfo & {
  saveDraft: (values: T) => void;
  clearDraft: () => void;
} {
  const [lastSaved, setLastSaved] = useState<string | null>(null);
  const [hasDraft, setHasDraft] = useState(false);

  // Load draft from localStorage on component mount
  useEffect(() => {
    const savedDraft = localStorage.getItem(storageKey);
    if (savedDraft) {
      try {
        const parsedDraft = JSON.parse(savedDraft);
        form.reset(parsedDraft.values);
        setLastSaved(parsedDraft.timestamp);
        setHasDraft(true);
      } catch (error) {
        console.error('Failed to parse draft:', error);
      }
    }
  }, [form, storageKey]);

  // Save draft function
  const saveDraft = (values: T) => {
    // Only save if at least one field has a value
    if (Object.values(values).some((value) => value && String(value).length > 0)) {
      const timestamp = '';
      localStorage.setItem(
        storageKey,
        JSON.stringify({
          values,
          timestamp,
        }),
      );
      setLastSaved(timestamp);
      setHasDraft(true);
    }
  };

  // Clear draft function
  const clearDraft = () => {
    localStorage.removeItem(storageKey);
    setHasDraft(false);
    setLastSaved(null);
    form.reset({} as T);
  };

  const formValues = form.watch();
  const debouncedFormValues = useDebounce(formValues, 500);
  // Save draft when debounced form values change
  useEffect(() => {
    saveDraft(debouncedFormValues);
  }, [debouncedFormValues, saveDraft]);

  return {
    lastSaved,
    hasDraft,
    saveDraft,
    clearDraft,
  };
}

export function useFormDraftV<T extends Record<string, any>>(
  form: UseFormReturn<T>,
  storageKey: string,
): DraftInfo & {
  saveDraft: (values: T) => void;
  clearDraft: () => void;
} {
  useEffect(() => {
    const savedDraft = localStorage.getItem(storageKey);
    if (savedDraft) {
      try {
        const parsedDraft = JSON.parse(savedDraft);
        //parsedDraft.deliveryDate = new Date(parsedDraft.deliveryDate)
        form.reset(parsedDraft);
      } catch (error) {
        console.error('Failed to parse draft:', error);
      }
    }
  }, [form]);

  // Save draft to localStorage when form values change
  useEffect(() => {
    const subscription = form.watch((value) => {
      localStorage.setItem(storageKey, JSON.stringify(value));
    });
    return () => subscription.unsubscribe();
  }, [form]);

  // Clear draft function
  const clearDraft = () => {
    localStorage.removeItem(storageKey);
    form.reset({} as T);
  };

  return {
    clearDraft,
  };
}
