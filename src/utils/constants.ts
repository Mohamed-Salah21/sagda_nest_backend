export const CURRENT_TIMESTAMP: string = 'CURRENT_TIMESTAMP(6)';
export const DB_TABLES: {
    PRODUCTS: string;
    USERS: string;
    REVIEWS: string;
    CATEGORIES: string;
    SUB_CATEGORIES: string;
    SECTIONS: string;
    CARTS: string
} = {
    PRODUCTS: 'products',
    USERS: 'users',
    REVIEWS: 'reviews',
    CATEGORIES: 'categories',
    SUB_CATEGORIES: 'subCategories',
    SECTIONS: "sections",
    CARTS: 'carts'
}
export const USER_ROLES = {
    USER: 'user',
    ADMIN: 'admin'
}

export const SECTION_TYPES = {
    ABOUT_US: 'about us',
    HOME_INFO: 'home info',
    PRIVACY: 'privacy',
    USAGE: 'usage',


}

export const CURRENT_USER_KEY = "user";