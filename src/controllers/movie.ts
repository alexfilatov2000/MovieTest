import { Context } from 'koa';
import {
    findByNamesModel,
    addMovieModel,
    getAllMoviesModel,
    getSpecMovieModel,
    deleteMovieModel,
    getAllMoviesByTitleModel,
    getAllMoviesByPeopleModel,
} from '../models/movie';
import { addMovieSchema } from '../lib/joi/movieSchema';
import * as fs from 'fs';
import { readFile } from '../lib/utils/readMovies';
import { transform } from '../lib/utils/transform';
import { addPeopleModel } from '../models/people';

export default class MovieController {
    public static async getAllMovies(ctx: Context): Promise<void> {
        try {
            let movies;
            if (ctx.query.title) {
                movies = await getAllMoviesByTitleModel(ctx.query.title);
            } else if (ctx.query.full_name) {
                movies = await getAllMoviesByPeopleModel(ctx.query.full_name);
            } else {
                movies = await getAllMoviesModel();
            }
            ctx.body = movies;
        } catch (err) {
            ctx.status = 400;
            ctx.body = { error: err.message };
        }
    }

    public static async getSpecMovie(ctx: Context): Promise<void> {
        try {
            ctx.body = await getSpecMovieModel(ctx.params.id);
        } catch (err) {
            ctx.status = 400;
            ctx.body = { error: err.message };
        }
    }

    public static async addMovie(ctx: Context): Promise<void> {
        try {
            const data = await addMovieSchema.validateAsync(ctx.request.body);
            if (!ctx.file) throw new Error('Only .png, .jpg and .jpeg format allowed!');
            const people = await findByNamesModel(data.people);
            await addMovieModel(data, people, ctx.file.filename);
            ctx.status = 201;
        } catch (err) {
            ctx.status = 400;
            ctx.body = { error: err.message };
        }
    }

    public static async deleteMovie(ctx: Context): Promise<void> {
        try {
            ctx.body = await deleteMovieModel(ctx.params.id);
        } catch (err) {
            ctx.status = 400;
            ctx.body = { error: err.message };
        }
    }

    public static async addMovieFromFile(ctx: Context): Promise<void> {
        try {
            const file = readFile(ctx.file);
            const data = transform(file);

            for (const val of data) {
                await addPeopleModel(val.people);
                // @ts-ignore
                await addMovieModel(val, val.people, '');
            }
            ctx.status = 201;
        } catch (err) {
            ctx.status = 400;
            ctx.body = { error: err.message };
        }
    }
}
