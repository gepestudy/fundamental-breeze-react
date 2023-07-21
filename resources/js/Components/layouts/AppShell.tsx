import {
    AppShell as MantineAppShell,
    Notification,
    Text,
    useMantineTheme,
} from "@mantine/core";
import { ReactNode, useEffect, useState } from "react";
import Navbar from "./Navbar";
import Header from "./Header";
import { Flash, User } from "@/types";
import { Head } from "@inertiajs/react";
import { notifications } from "@mantine/notifications";
const AppShell = ({
    children,
    user,
    pageTitle,
    flash,
}: {
    children: ReactNode;
    user: User;
    pageTitle: string;
    flash?: Flash;
}) => {
    const theme = useMantineTheme();
    const [opened, setOpened] = useState(false);

    return (
        <MantineAppShell
            styles={{
                main: {
                    background:
                        theme.colorScheme === "dark"
                            ? theme.colors.dark[8]
                            : theme.colors.gray[0],
                    overflow: "hidden",
                },
            }}
            navbarOffsetBreakpoint="sm"
            asideOffsetBreakpoint="sm"
            padding="md"
            navbar={<Navbar user={user} opened={opened} />}
            header={
                <Header
                    user={user}
                    opened={opened}
                    setOpened={setOpened}
                    theme={theme}
                />
            }
        >
            <Head title={pageTitle} />
            {flash?.message && <Text color="red">{flash.message}</Text>}
            {children}
        </MantineAppShell>
    );
};
export default AppShell;
