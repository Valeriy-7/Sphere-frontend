import { z } from 'zod';

export const userSchema = z.object({
  id: z.string().describe('ID пользователя'),
  fullName: z.string().describe('ФИО пользователя'),
  phone: z.string().describe('Номер телефона'),
  createdAt: z.date().describe('Дата создания'),
  updatedAt: z.date().describe('Дата обновления'),
  blockedAt: z.date().describe('Дата блокировки'),
  role: z.enum(['user', 'admin']).describe('Роль пользователя'),
  isBlocked: z.boolean().describe('Статус блокировки пользователя'),
  blockReason: z.string().describe('Причина блокировки').optional(),
});
