import AppShell from "@/Components/layouts/AppShell";
import { PageProps, User } from "@/types";
import { Link } from "@inertiajs/react";
import {
    ActionIcon,
    Box,
    Button,
    Card,
    Container,
    Divider,
    Group,
    Image,
    ScrollArea,
    Table,
    Text,
    Tooltip,
} from "@mantine/core";
import { IconEdit, IconEye, IconTrash } from "@tabler/icons-react";
import { Posts } from "./types";

const posts = ({ auth, posts }: { auth: User; posts: Posts[] }) => {
    console.log(posts);

    const rows =
        posts.length > 0
            ? posts.map((post, index) => (
                  <tr key={post.id}>
                      <td>{post.id}</td>
                      <td>
                          <Image
                              src={post.image}
                              alt="image"
                              width={100}
                              height={100}
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
                                      href={
                                          "/dashboard/14-crud-operation/posts/" +
                                          post.id
                                      }
                                      component={Link}
                                  >
                                      <IconEye />
                                  </ActionIcon>
                              </Tooltip>
                              <Tooltip label="edit">
                                  <ActionIcon
                                      href={
                                          "/dashboard/14-crud-operation/posts/" +
                                          post.id +
                                          "/edit"
                                      }
                                      component={Link}
                                  >
                                      <IconEdit />
                                  </ActionIcon>
                              </Tooltip>
                              <Tooltip label="delete">
                                  <ActionIcon
                                      onClick={() => {
                                          //   setmodalDeleteOpened(true);
                                          //   setSelectedPost(post.id);
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
    return (
        <AppShell pageTitle="Posts" user={auth}>
            <Container fluid>
                {/* <Modal
        opened={modalDeleteOpened}
        onClose={() => {
          setmodalDeleteOpened(false);
          setSelectedPost(null);
        }}
        title="Delete Post"
        centered
        withCloseButton={false}
      >
        <Text>Are you sure you want to delete this post?</Text>
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
            onClick={() => (selectedPost ? handleDelete(selectedPost) : null)}
          >
            Delete
          </Button>
          <Button
            onClick={() => {
              setmodalDeleteOpened(false);
              setSelectedPost(null);
            }}
          >
            Cancel
          </Button>
        </Group>
      </Modal> */}
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
                                All Post
                            </Text>
                            <Box>
                                <Button
                                    href={"/post/create"}
                                    component={Link}
                                    mr={"md"}
                                    color={"indigo"}
                                >
                                    Create
                                </Button>
                                <Button
                                    color="orange"
                                    href={
                                        "/dashboard/14-crud-operation/posts/trashed"
                                    }
                                    component={Link}
                                >
                                    Trashed
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
                        {/* <Pagination.Root
            total={data.last_page}
            getItemProps={(page) => ({
              component: Link,
              href: `/dashboard/14-crud-operation/posts?page=${page}`,
            })}
            value={page}
          >
            <Group spacing={7} position="center" my="xl">
              <Pagination.Previous
                component={Link}
                href={
                  page === 1
                    ? "#"
                    : `/dashboard/14-crud-operation/posts?page=${page - 1}`
                }
              />
              <Pagination.Items />
              <Pagination.Next
                component={Link}
                href={
                  page >= data.last_page
                    ? "#"
                    : `/dashboard/14-crud-operation/posts?page=${page + 1}`
                }
              />
            </Group>
          </Pagination.Root> */}
                    </Card.Section>
                </Card>
            </Container>
        </AppShell>
    );
};
export default posts;
