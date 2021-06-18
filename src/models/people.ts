import { People } from '../entity/people';
import { getManager, Repository } from 'typeorm';

export const addPeronModel = async (data: People): Promise<void> => {
    const peopleRepository: Repository<People> = getManager().getRepository(People);

    const personToBeSaved: People = new People();
    personToBeSaved.full_name = data.full_name;
    await peopleRepository.save(personToBeSaved);
};

export const getAllPeopleModel = async (): Promise<People[]> => {
    const peopleRepository: Repository<People> = getManager().getRepository(People);
    return peopleRepository.find({
        relations: ['movies'],
    });
};
