export const readFile = (file: any): string => {
    if (!file) throw new Error('Please upload a file');
    return Buffer.from(file.buffer).toString('utf-8');
};
