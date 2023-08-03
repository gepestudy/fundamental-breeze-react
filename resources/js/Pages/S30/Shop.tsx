import AppShell from "@/Components/layouts/AppShell";
import { User } from "@/types";
import { Card, Flex, Grid, Image } from "@mantine/core";
import ItemCard from "./components/ItemCard";

export interface Product {
    id: string;
    name: string;
    image: string;
    price: number;
    description: string;
}
const Shop = ({
    auth,
    products,
}: {
    auth: { user: User };
    products: Product[];
}) => {
    return (
        <AppShell pageTitle="Shop" user={auth.user}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {products.map((product) => (
                    <div key={product.id}>
                        <ItemCard
                            id={product.id}
                            title={product.name}
                            image={`https://ecomerce_fundamental_with_breeze.test/${product.image}`}
                            description={product.description}
                            price={product.price}
                        />
                    </div>
                ))}
            </div>
        </AppShell>
    );
};
export default Shop;
