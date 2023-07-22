import AppShell from "@/Components/layouts/AppShell";
import { User } from "@/types";
import { router, useForm } from "@inertiajs/react";
import {
    Button,
    Card,
    Center,
    Container,
    Divider,
    FileInput,
    Group,
    Image,
    MultiSelect,
    Text,
    TextInput,
    Textarea,
    rem,
} from "@mantine/core";
import { IconUpload } from "@tabler/icons-react";
import { Category, Posts } from "./types";
import { FileWithPath } from "@mantine/dropzone";
import { useState } from "react";
const EditPost = ({
    auth,
    categories,
    post,
}: {
    auth: { user: User };
    categories: string[];
    post: Posts;
}) => {
    const [title, setTitle] = useState(post.title);
    const [description, setDescription] = useState(post.description);
    const {
        data,
        setData,
        post: PostMethod,
        put,
        progress,
        errors,
    } = useForm({
        title: title,
        image: null,
        description: description,
        category: post.category?.name,
        _method: "put",
    });

    const imagePreview = data.image ? URL.createObjectURL(data.image) : null;

    return (
        <AppShell pageTitle="Edit Post" user={auth.user}>
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
                                Edit Post{" "}
                                <span className="italic">{post.title}</span>
                            </Text>
                        </Group>
                        <Divider />
                    </Card.Section>
                    <Card.Section p="xl">
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                PostMethod(route("post.update", post.id));
                            }}
                            encType="multipart/form-data"
                        >
                            <Center>
                                <Image
                                    src={
                                        imagePreview !== null
                                            ? imagePreview
                                            : post.image
                                    }
                                    alt="image"
                                    width={300}
                                    height={300}
                                    fit="contain"
                                    withPlaceholder
                                />
                            </Center>
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
                                defaultValue={
                                    data.title ? data.title : post.title
                                }
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
                                defaultValue={[post.category?.name!]}
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
                                value={
                                    data.description
                                        ? data.description
                                        : post.description
                                }
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
