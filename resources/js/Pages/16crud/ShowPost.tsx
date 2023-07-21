import AppShell from "@/Components/layouts/AppShell";
import { User } from "@/types";
import { Posts } from "./types";
import {
    Box,
    Button,
    Card,
    Container,
    Group,
    Image,
    Text,
} from "@mantine/core";
import { Link } from "@inertiajs/react";

const ShowPost = ({ auth, post }: { auth: User; post: Posts }) => {
    return (
        <AppShell pageTitle="Show Post" user={auth}>
            <Container fluid>
                <Card shadow="sm" padding="lg" radius="md" withBorder>
                    <Card.Section>
                        <Group
                            position="apart"
                            py={"md"}
                            px={"xl"}
                            sx={(theme) => ({
                                backgroundColor:
                                    theme.colorScheme === "dark"
                                        ? theme.colors.dark[8]
                                        : theme.colors.gray[0],
                            })}
                        >
                            <Text size={"xl"} weight={"bold"}>
                                {post.title}
                            </Text>
                            <Button component={Link} href={"/post"}>
                                back to posts
                            </Button>
                        </Group>
                    </Card.Section>
                    <Container fluid>
                        <Box
                            sx={(theme) => ({
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            })}
                        >
                            <Image
                                src={post.image}
                                alt="image"
                                width={400}
                                height={400}
                                fit="contain"
                            />
                        </Box>
                        <Text>{post.description}</Text>
                    </Container>
                </Card>
            </Container>
        </AppShell>
    );
};
export default ShowPost;
