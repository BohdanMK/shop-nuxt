import type { ICategoryInfoDTO, ISubCategoriesDTO } from '@/types/dto/subCategories'

export const subCategoriesMock: ISubCategoriesDTO[] = [
    {
        id: 'sub-1',
        title: 'Classic Rolls',
        pathName: 'classic-rolls',
        parentCategory: 'cat-1'
    },
    {
        id: 'sub-2',
        title: 'Baked Rolls',
        pathName: 'baked-rolls',
        parentCategory: 'cat-1'
    },
    {
        id: 'sub-3',
        title: 'Tempura Rolls',
        pathName: 'tempura-rolls',
        parentCategory: 'cat-1'
    },
    {
        id: 'sub-4',
        title: 'Philadelphia',
        pathName: 'philadelphia',
        parentCategory: 'cat-1'
    },
    {
        id: 'sub-5',
        title: 'California',
        pathName: 'california',
        parentCategory: 'cat-1'
    },
    {
        id: 'sub-6',
        title: 'Nigiri',
        pathName: 'nigiri',
        parentCategory: 'cat-1'
    },
    {
        id: 'sub-7',
        title: 'Sashimi',
        pathName: 'sashimi',
        parentCategory: 'cat-1'
    },
    {
        id: 'sub-8',
        title: 'Sets',
        pathName: 'sets',
        parentCategory: 'cat-1'
    },
    {
        id: 'sub-9',
        title: 'Vegetarian Rolls',
        pathName: 'vegetarian-rolls',
        parentCategory: 'cat-1'
    },
    {
        id: 'sub-10',
        title: 'Chef Specials',
        pathName: 'chef-specials',
        parentCategory: 'cat-1'
    },
];

export const categoryMock: ICategoryInfoDTO = {
    id: 'cat-1',
    title: 'Sushi',
    pathName: 'sushi',
    subCategories: subCategoriesMock,
};
