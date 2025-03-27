import { atom } from 'nanostores';
import { ServerToClientMapType } from '@/lib/types';

export const $themeClassName = atom<string>('');

export function setThemeClassName(type: keyof typeof ServerToClientMapType) {
  $themeClassName.set('theme-' + ServerToClientMapType[type]);
}
