import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { People } from './people';

@Entity('movie')
export class Movie {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    title: string;

    @Column({ nullable: true })
    year: number;

    @Column({
        type: 'enum',
        enum: ['VHS', 'DVD', 'Blu-Ray'],
        default: 'DVD',
    })
    type: 'VHS' | 'DVD' | 'Blu-Ray';

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
