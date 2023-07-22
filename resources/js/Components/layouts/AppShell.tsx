import { Flash, User } from "@/types";
import { Head } from "@inertiajs/react";
import { AppShell as MantineAppShell, useMantineTheme } from "@mantine/core";
import { ReactNode, useState } from "react";
import Header from "./Header";
import Navbar from "./Navbar";
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
            {children}
        </MantineAppShell>
    );
};
export default AppShell;
