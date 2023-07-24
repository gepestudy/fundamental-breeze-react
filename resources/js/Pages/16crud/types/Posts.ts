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

export interface PostsWithPaginate {
    current_page: number;
    data: Posts[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string | null;
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
}
