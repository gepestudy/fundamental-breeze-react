import AppShell from "@/Components/layouts/AppShell";
import { Flash, User, Ziggy } from "@/types";
import { Link, router } from "@inertiajs/react";
import {
    ActionIcon,
    Box,
    Button,
    Card,
    Container,
    Divider,
    Group,
    Image,
    Modal,
    Pagination,
    ScrollArea,
    Table,
    Text,
    Tooltip,
} from "@mantine/core";
import { IconEye, IconRefresh, IconTrash } from "@tabler/icons-react";
import { useState } from "react";
import { Posts, PostsWithPaginate } from "./types";

const TrashedPost = ({
    auth,
    posts,
    flash,
    ziggy,
}: {
    auth: { user: User };
    posts: PostsWithPaginate;
    flash?: Flash;
    ziggy: Ziggy;
}) => {
    const [modalDeleteOpened, setModalDeleteOpened] = useState<boolean>(false);
    const [selectedPost, setSelectedPost] = useState<number | null>(null);
    const page: number = ziggy.query?.page ? parseInt(ziggy.query.page) : 1;
    const rows =
        posts && posts.data.length > 0
            ? posts.data.map((post, index) => (
                  <tr key={post.id}>
                      <td>{post.id}</td>
                      <td>
                          <Image
                              src={post.image}
                              alt="image"
                              width={100}
                              height={100}
                              withPlaceholder
                          />
                      </td>
                      <td>
                          <Text>{post.title}</Text>
                      </td>
                      <td>
                          <Text>{post.description}</Text>
                      </td>
                      <td>
                          <Text key={index}>{post.category?.name}</Text>
                      </td>
                      <td>
                          <Text sx={() => ({ whiteSpace: "nowrap" })}>
                              {post.created_at}
                          </Text>
                      </td>
                      <td>
                          <Group>
                              <Tooltip label="view">
                                  <ActionIcon
                                      href={"/post/trashed/" + post.id}
                                      component={Link}
                                  >
                                      <IconEye />
                                  </ActionIcon>
                              </Tooltip>
                              <Tooltip label="Restore">
                                  <ActionIcon
                                      href={
                                          "/post/trashed/" +
                                          post.id +
                                          "/restore"
                                      }
                                      component={Link}
                                  >
                                      <IconRefresh />
                                  </ActionIcon>
                              </Tooltip>
                              <Tooltip label="delete">
                                  <ActionIcon
                                      onClick={() => {
                                          setModalDeleteOpened(true);
                                          setSelectedPost(post.id);
                                      }}
                                  >
                                      <IconTrash />
                                  </ActionIcon>
                              </Tooltip>
                          </Group>
                      </td>
                  </tr>
              ))
            : null;
    const ths = (
        <tr>
            <th>id</th>
            <th>Image</th>
            <th>Title</th>
            <th>Description</th>
            <th>Category</th>
            <th>Publish Date</th>
            <th>Action</th>
        </tr>
    );

    const handleDelete = async (id: number) => {
        router.delete(route("post.forceDelete", id), {
            onSuccess: () => {
                setModalDeleteOpened(false);
                setSelectedPost(null);
            },
            onError: () => {
                setModalDeleteOpened(false);
                setSelectedPost(null);
            },
        });
    };

    return (
        <AppShell pageTitle="Posts" user={auth.user} flash={flash}>
            <Container fluid>
                <Modal
                    opened={modalDeleteOpened}
                    onClose={() => {
                        setModalDeleteOpened(false);
                        setSelectedPost(null);
                    }}
                    title="Delete Post"
                    centered
                    withCloseButton={false}
                >
                    <Text align="center">
                        This action will permanently delete this post
                        <br /> are you sure?
                    </Text>
                    <Group
                        sx={(theme) => ({
                            display: "flex",
                            width: 300,
                            justifyContent: "space-between",
                            alignItems: "center",
                            margin: "auto",
                            marginTop: theme.spacing.md,
                        })}
                    >
                        <Button
                            variant="outline"
                            color="red"
                            onClick={() =>
                                selectedPost ? handleDelete(selectedPost) : null
                            }
                        >
                            Delete
                        </Button>
                        <Button
                            onClick={() => {
                                setModalDeleteOpened(false);
                                setSelectedPost(null);
                            }}
                        >
                            Cancel
                        </Button>
                    </Group>
                </Modal>
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
                                All Post
                            </Text>
                            <Box>
                                <Button
                                    href={"/post"}
                                    component={Link}
                                    mr={"md"}
                                    color={"indigo"}
                                >
                                    back to post
                                </Button>
                            </Box>
                        </Group>
                        <Divider />
                    </Card.Section>
                    <Card.Section>
                        {rows ? (
                            <ScrollArea>
                                <Table
                                    miw={800}
                                    verticalSpacing="sm"
                                    highlightOnHover
                                >
                                    <thead>{ths}</thead>
                                    <tbody>{rows}</tbody>
                                </Table>
                            </ScrollArea>
                        ) : (
                            <Text
                                size={"xl"}
                                align="center"
                                weight={"bold"}
                                my={"xl"}
                            >
                                Post not available
                            </Text>
                        )}
                        <Pagination.Root
                            total={posts.last_page}
                            getItemProps={(page) => ({
                                component: Link,
                                href: `/post/trashed?page=${page}`,
                            })}
                            value={page}
                        >
                            <Group spacing={7} position="center" my="xl">
                                <Pagination.Previous
                                    component={Link}
                                    href={
                                        page === 1
                                            ? "#"
                                            : `/post/trashed?page=${page - 1}`
                                    }
                                />
                                <Pagination.Items />
                                <Pagination.Next
                                    component={Link}
                                    href={
                                        page >= posts.last_page
                                            ? "#"
                                            : `/post/trashed?page=${page + 1}`
                                    }
                                />
                            </Group>
                        </Pagination.Root>
                    </Card.Section>
                </Card>
            </Container>
        </AppShell>
    );
};
export default TrashedPost;
