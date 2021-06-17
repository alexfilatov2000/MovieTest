import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Movie } from './movie';

@Entity('people')
export class People {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    full_name: string;

    @ManyToMany(() => Movie, (movie) => movie.people, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    movies: Movie[];
}
