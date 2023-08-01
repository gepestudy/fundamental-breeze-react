import AppShell from "@/Components/layouts/AppShell";
import { User, Ziggy } from "@/types";
import {
    Button,
    Card,
    Container,
    Divider,
    Group,
    Modal,
    NativeSelect,
    Pagination,
    ScrollArea,
    Select,
    Table,
    Text,
    TextInput,
} from "@mantine/core";
import { UsersWithPaginate } from "./types";
import { Link, router } from "@inertiajs/react";
import { useRef, useState } from "react";
import lodash from "lodash";
import { IconChevronDown } from "@tabler/icons-react";

const index = ({
    auth,
    users,
    ziggy,
}: {
    auth: { user: User };
    users: UsersWithPaginate;
    ziggy: Ziggy;
}) => {
    const page: number = ziggy.query?.page ? parseInt(ziggy.query.page) : 1;
    const perpage: number = ziggy.query?.perpage
        ? parseInt(ziggy.query.perpage)
        : 10;
    const search: string | undefined = ziggy.query?.search
        ? ziggy.query.search
        : undefined;

    const searchRef = useRef<HTMLInputElement>(null);

    const formatDateTime = (dateTimeString: string): string => {
        const dateObject = new Date(dateTimeString);
        return `${dateObject.toISOString().slice(0, 19).replace("T", " ")}`;
    };

    const rows =
        users && users.data.length > 0
            ? users.data.map((user, index) => (
                  <tr key={user.id}>
                      <td>{user.id}</td>

                      <td>
                          <Text>{user.name}</Text>
                      </td>
                      <td>
                          <Text>{user.email}</Text>
                      </td>
                      <td>
                          <Text>{formatDateTime(user.created_at)}</Text>
                      </td>
                  </tr>
              ))
            : null;

    const ths = (
        <tr>
            <th>id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Created at</th>
        </tr>
    );

    const handlerPerpage = (perpageParam: string) => {
        router.get(
            "/S28/datatable",
            lodash.pickBy(
                {
                    perpage: perpageParam,
                    search,
                    page,
                },
                (value) =>
                    !lodash.isNull(value) ||
                    !lodash.isEmpty(value) ||
                    !lodash.isUndefined(value)
            ),
            {
                preserveScroll: true,
                preserveState: true,
            }
        );
    };

    const handlerSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        router.get(
            "/S28/datatable",
            lodash.pickBy(
                {
                    perpage,
                    search: searchRef.current?.value,
                    page,
                },
                (value) =>
                    !lodash.isNull(value) ||
                    !lodash.isEmpty(value) ||
                    !lodash.isUndefined(value)
            ),
            {
                preserveScroll: true,
                preserveState: true,
            }
        );
    };

    return (
        <AppShell user={auth.user} pageTitle="Yajra Datatable">
            <Container fluid>
                <Card shadow="sm" padding="lg" radius="md" withBorder>
                    <Card.Section className="flex justify-between items-center p-3">
                        <Select
                            data={[
                                { value: "10", label: "10" },
                                { value: "25", label: "25" },
                                { value: "50", label: "50" },
                                { value: "100", label: "100" },
                            ]}
                            rightSection={<IconChevronDown size="1rem" />}
                            rightSectionWidth={30}
                            styles={{ rightSection: { pointerEvents: "none" } }}
                            defaultValue={perpage ? perpage.toString() : "10"}
                            onChange={(e) => {
                                handlerPerpage(e!);
                            }}
                            w={70}
                        />
                        <form
                            onSubmit={(e) => handlerSearch(e)}
                            className="flex items-center gap-3"
                        >
                            <TextInput ref={searchRef} placeholder="search" />
                            <Button type="submit" size="sm">
                                Search
                            </Button>
                        </form>
                    </Card.Section>
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
                                All User
                            </Text>
                        </Group>
                        <Divider />
                    </Card.Section>
                    <Card.Section>
                        {rows ? (
                            // <ScrollArea>
                            <Table
                                miw={800}
                                verticalSpacing="sm"
                                highlightOnHover
                            >
                                <thead>{ths}</thead>
                                <tbody>{rows}</tbody>
                            </Table>
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
                        <div className="my-5">
                            <Pagination.Root
                                total={users.last_page}
                                getItemProps={(page) => ({
                                    component: Link,
                                    href: `/S28/datatable?page=${page}${
                                        search ? `&search=${search}` : ""
                                    }${perpage ? `&perpage=${perpage}` : ""}`,
                                })}
                                value={page}
                            >
                                <Group spacing={7} position="center">
                                    <Pagination.Previous
                                        onClick={() => {
                                            router.get(
                                                "/S28/datatable",
                                                lodash.pickBy(
                                                    {
                                                        perpage: perpage,
                                                        page: page + 1,
                                                        search: search,
                                                    },
                                                    (value) =>
                                                        !lodash.isNull(value) ||
                                                        !lodash.isEmpty(
                                                            value
                                                        ) ||
                                                        !lodash.isUndefined(
                                                            value
                                                        )
                                                ),
                                                {
                                                    preserveScroll: true,
                                                    preserveState: true,
                                                }
                                            );
                                        }}
                                    />
                                    <Pagination.Items />
                                    <Pagination.Next
                                        onClick={() => {
                                            router.get(
                                                "/S28/datatable",
                                                lodash.pickBy(
                                                    {
                                                        perpage: perpage,
                                                        page: page + 1,
                                                        search: search,
                                                    },
                                                    (value) =>
                                                        !lodash.isNull(value) ||
                                                        !lodash.isEmpty(
                                                            value
                                                        ) ||
                                                        !lodash.isUndefined(
                                                            value
                                                        )
                                                ),
                                                {
                                                    preserveScroll: true,
                                                    preserveState: true,
                                                }
                                            );
                                        }}
                                    />
                                </Group>
                                <Text align="center" my={"xs"}>
                                    showing {users.from} to {users.to} of{" "}
                                    {users.total}
                                </Text>
                            </Pagination.Root>
                        </div>
                    </Card.Section>
                </Card>
            </Container>
        </AppShell>
    );
};
export default index;
