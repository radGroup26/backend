import { z } from 'zod';
export const inviteAcceptSchema = z.object({
    teamId: z.string(),
});
