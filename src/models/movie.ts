import { DeleteResult, getManager, Like, Repository } from 'typeorm';
import { People } from '../entity/people';
import { Movie } from '../entity/movie';

export const getAllMoviesModel = async (): Promise<Movie[]> => {
    const movie: Repository<Movie> = getManager().getRepository(Movie);
    return movie.find({
        order: { title: 'ASC' },
        relations: ['people'],
    });
};

export const getAllMoviesByTitleModel = async (title: any): Promise<Movie[]> => {
    const movie: Repository<Movie> = getManager().getRepository(Movie);
    return movie.find({
        where: { title: Like(`%${title}%`) },
        order: { title: 'ASC' },
        relations: ['people'],
    });
};

export const getAllMoviesByPeopleModel = async (full_name: any): Promise<People[]> => {
    const people: Repository<People> = getManager().getRepository(People);
    return people.find({
        where: { full_name: Like(`%${full_name}%`) },
        relations: ['movies'],
    });
};

export const getSpecMovieModel = async (id: number): Promise<Movie> => {
    const movie: Repository<Movie> = getManager().getRepository(Movie);
    return movie.findOne(id, { relations: ['people'] });
};

export const findByNamesModel = async (names: string[]): Promise<People[]> => {
    const people: Repository<People> = getManager().getRepository(People);
    const arr = [];
    for (const val of names) {
        arr.push(await people.findOne({ where: { full_name: val } }));
    }
    return arr;
};

export const addMovieModel = async (data: Movie, people: People[]): Promise<void> => {
    const movie: Repository<Movie> = getManager().getRepository(Movie);

    const movieToBeSaved: Movie = new Movie();
    movieToBeSaved.title = data.title;
    movieToBeSaved.year = data.year;
    movieToBeSaved.type = data.type;
    movieToBeSaved.people = people;

    await movie.save(movieToBeSaved);
};

export const deleteMovieModel = async (id: number): Promise<DeleteResult> => {
    const movie: Repository<Movie> = getManager().getRepository(Movie);
    return movie.delete(id);
};
