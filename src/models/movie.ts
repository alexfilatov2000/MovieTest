import { DeleteResult, getManager, ILike, Repository } from 'typeorm';
import { People } from '../entity/people';
import { Movie } from '../entity/movie';

export const getAllMoviesModel = async (order: any = 'ASC'): Promise<Movie[]> => {
    const movie: Repository<Movie> = getManager().getRepository(Movie);
    return movie.find({
        order: { title: order },
        relations: ['people'],
    });
};

export const getAllMoviesByTitleModel = async (title: any): Promise<Movie[]> => {
    const movie: Repository<Movie> = getManager().getRepository(Movie);
    const x = await movie.find({
        where: { title: ILike(`%${title}%`) },
        order: { title: 'ASC' },
        relations: ['people'],
    });
    if (x.length === 0) throw new Error('No Movie Found With This Title');
    return x;
};

export const getAllMoviesByPeopleModel = async (full_name: any): Promise<Movie[]> => {
    const movie: Repository<Movie> = getManager().getRepository(Movie);
    let data = await movie.find({ relations: ['people'] });
    const regex = new RegExp(full_name, 'gi');

    data = data.filter((item) => {
        for (const val of item.people) {
            if (regex.test(val.full_name)) return true;
        }
    });

    if (data.length === 0) throw new Error('No Character Found With This Full Name');
    return data;
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

export const addMovieModel = async (data: Movie, people: People[], picture: string): Promise<Movie> => {
    const movie: Repository<Movie> = getManager().getRepository(Movie);
    const x = await movie.findOne({ where: { title: data.title } });
    if (x) throw new Error(`Movie with title: "${data.title}" already exist!`);

    const movieToBeSaved: Movie = new Movie();
    movieToBeSaved.title = data.title;
    movieToBeSaved.year = data.year;
    movieToBeSaved.type = data.type;
    movieToBeSaved.people = people;
    movieToBeSaved.picture = picture;

    return movie.save(movieToBeSaved);
};

export const deleteMovieModel = async (id: number): Promise<DeleteResult> => {
    const movie: Repository<Movie> = getManager().getRepository(Movie);
    return movie.delete(id);
};
