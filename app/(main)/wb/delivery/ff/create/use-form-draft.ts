'use client';

import { useEffect, useState } from 'react';

import type { UseFormReturn } from 'react-hook-form';

type DraftInfo = {
  lastSaved: string | null;
  hasDraft: boolean;
};

export function useFormDraftV<T extends Record<string, any>>(
  form: UseFormReturn<T>,
  storageKey: string,
): DraftInfo & {
  clearDraft: () => void;
} {
  useEffect(() => {
    const savedDraft = localStorage.getItem(storageKey);
    if (savedDraft) {
      try {
        const parsedDraft = JSON.parse(savedDraft);
        parsedDraft.deliveryDate = new Date(parsedDraft.deliveryDate);
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
    // form.reset({} as T);
  };

  return {
    clearDraft,
  };
}
