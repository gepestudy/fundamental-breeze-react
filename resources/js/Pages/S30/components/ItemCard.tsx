import { Link } from "@inertiajs/react";
import { Badge, Button, Card, Group, Image, Text } from "@mantine/core";
import lodash from "lodash";

const ItemCard = ({
    id,
    title,
    image,
    price,
    description,
}: {
    id: string;
    title: string;
    image: string;
    price: number;
    description: string;
}) => {
    return (
        <Card
            shadow="sm"
            px={"lg"}
            radius="md"
            withBorder
            className="flex flex-col justify-between"
        >
            <Card.Section>
                <Image src={image} alt={title} fit="contain" height={200} />
            </Card.Section>
            <Card.Section className="flex flex-col items-center justify-center ">
                <Text size={"xl"} align="center" weight={500} my={"xl"}>
                    {title}
                </Text>
                <Badge color="teal" variant="filled">
                    {price.toLocaleString("ID-id")}
                </Badge>
            </Card.Section>
            <div>
                <Text my={"md"}>
                    {lodash.truncate(description, {
                        length: 200,
                        omission: "...",
                    })}
                </Text>
            </div>
            <Card.Section>
                <Button
                    fullWidth
                    mb={"md"}
                    component={Link}
                    href={route("s30.addToCart", { id })}
                >
                    add to chart
                </Button>
            </Card.Section>
        </Card>
    );
};
export default ItemCard;
