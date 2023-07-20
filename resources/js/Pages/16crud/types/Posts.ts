import { Category } from "./Category";

export interface Posts {
    id: number;
    title: string;
    description: string;
    image: string;
    category_id: number;
    created_at: string;
    updated_at: string;
    category?: Category;
}
