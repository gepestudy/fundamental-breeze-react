import AppShell from "@/Components/layouts/AppShell";
import { User } from "@/types";
import { useForm } from "@inertiajs/react";
import {
    Button,
    Card,
    Container,
    Divider,
    FileInput,
    Group,
    MultiSelect,
    Text,
    TextInput,
    Textarea,
    rem,
} from "@mantine/core";
import { IconUpload } from "@tabler/icons-react";
import { Category, Posts } from "./types";

const EditPost = ({
    auth,
    categories,
    post,
}: {
    auth: { user: User };
    categories: string[];
    post: Posts;
}) => {
    const {
        data,
        setData,
        post: postMethod,
        progress,
        errors,
    } = useForm({
        title: "",
        image: null,
        description: "",
        category: "",
    });

    return (
        <AppShell pageTitle="Create Post" user={auth.user}>
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
                                Create Post
                            </Text>
                        </Group>
                        <Divider />
                    </Card.Section>
                    <Card.Section p="xl">
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                postMethod(route("post.store"));
                            }}
                        >
                            <FileInput
                                label="Post image"
                                placeholder="Your post image"
                                icon={<IconUpload size={rem(14)} />}
                                mb="md"
                                accept="image/png,image/jpeg,image/jpg"
                                onChange={(e: any) => setData("image", e)}
                                error={errors.image}
                            />
                            <TextInput
                                label="Title"
                                placeholder="Title"
                                mb="md"
                                onChange={(e) =>
                                    setData("title", e.target.value)
                                }
                                error={errors.title}
                            />
                            <MultiSelect
                                data={categories}
                                limit={5}
                                searchable
                                placeholder="Pick category (optional)"
                                // @ts-ignore
                                value={data.category}
                                onChange={(e) => setData("category", e[0])}
                                creatable
                                getCreateLabel={(query) => `+ create ${query}`}
                                onCreate={(query) => {
                                    setData("category", query);
                                    return query;
                                }}
                                maxSelectedValues={1}
                            />
                            <Textarea
                                label="Description"
                                placeholder="Description"
                                autosize
                                mb="md"
                                onChange={(e) =>
                                    setData("description", e.target.value)
                                }
                                error={errors.description}
                            />
                            {progress && (
                                <progress value={progress.percentage} max="100">
                                    {progress.percentage}%
                                </progress>
                            )}
                            <Button type="submit" fullWidth>
                                Submit
                            </Button>
                        </form>
                    </Card.Section>
                </Card>
            </Container>
        </AppShell>
    );
};
export default EditPost;
