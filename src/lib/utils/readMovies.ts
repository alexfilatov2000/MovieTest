export const readFile = (file: any): string => {
    if (!file) throw new Error('Something wrong with your file');
    return Buffer.from(file.buffer).toString('utf-8');
};
