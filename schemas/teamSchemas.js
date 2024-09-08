import { z } from 'zod';
export const teamLeaveSchema = z.object({
    teamId: z.string(),
});
