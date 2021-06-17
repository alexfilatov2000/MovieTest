import { Context } from 'koa';
import { addPeronModel } from '../models/people';
import { addPersonSchema } from '../lib/joi/movieSchema';

export default class PromiseController {
    public static async addPerson(ctx: Context): Promise<void> {
        try {
            const data = await addPersonSchema.validateAsync(ctx.request.body);
            await addPeronModel(data);
            ctx.status = 201;
        } catch (err) {
            ctx.status = 400;
            ctx.body = { error: err.message };
        }
    }
}
