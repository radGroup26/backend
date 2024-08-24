import { z } from 'zod';

export const inviteAcceptSchema = z.object({
    teamId: z.string(),
});
export type inviteAcceptSchema = z.infer<typeof inviteAcceptSchema>;