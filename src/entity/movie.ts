import {Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, Index, Unique} from 'typeorm';
import { People } from './people';

@Unique(['title', 'year'])
@Entity('movie')
export class Movie {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    year: number;

    @Column({
        type: 'enum',
        enum: ['VHS', 'DVD', 'Blu-Ray'],
        default: 'DVD',
    })
    type: 'VHS' | 'DVD' | 'Blu-Ray';

    @Column({ nullable: true })
    picture: string;

    @ManyToMany(() => People, (people) => people.movies, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    @JoinTable({
        name: 'movies_people',
        joinColumn: {
            name: 'movie_id',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'people_id',
            referencedColumnName: 'id',
        },
    })
    people: People[];
}
