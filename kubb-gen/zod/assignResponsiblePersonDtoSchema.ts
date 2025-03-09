import { z } from 'zod';

export const assignResponsiblePersonDtoSchema = z.object({
  responsiblePerson: z.string().describe('ФИО ответственного сотрудника'),
});
