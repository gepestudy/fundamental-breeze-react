import AppShell from "@/Components/layouts/AppShell";
import { Flash, User } from "@/types";
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

const ShowTrahsed = ({
    auth,
    post,
    flash,
}: {
    auth: User;
    post: Posts;
    flash: Flash;
}) => {
    return (
        <AppShell pageTitle="Show Post" user={auth} flash={flash}>
            <Container fluid>
                {!post && (
                    <Text size={"xl"} align="center" weight={"bold"} my={"xl"}>
                        Post not available
                    </Text>
                )}
                {post && (
                    <Card shadow="sm" padding="lg" radius="md" withBorder>
                        <Card.Section>
                            <Group
                                position="apart"
                                py={"md"}
                                px={"xl"}
                                sx={(theme) => ({
                                    backgroundColor:
                                        theme.colorScheme === "dark"
                                            ? theme.colors.yellow[6]
                                            : theme.colors.yellow[6],
                                })}
                            >
                                <Text size={"xl"} weight={"bold"} color="dark">
                                    {post.title}
                                </Text>
                                <Button component={Link} href={"/post/trashed"}>
                                    back to trashed posts
                                </Button>
                            </Group>
                        </Card.Section>
                        <Container fluid mt={"md"}>
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
                                    withPlaceholder
                                />
                            </Box>
                            <Text>{post.description}</Text>
                        </Container>
                    </Card>
                )}
            </Container>
        </AppShell>
    );
};
export default ShowTrahsed;
