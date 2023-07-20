"use client";
import {
    Burger,
    Button,
    Group,
    Header as MantineHeader,
    MantineTheme,
    MediaQuery,
    Text,
} from "@mantine/core";
import { Dispatch, SetStateAction } from "react";
import ToggleColorScheme from "../button/ToggleColorScheme";
import { User } from "@/types";
import { router } from "@inertiajs/react";
const Header = ({
    opened,
    setOpened,
    theme,
    user,
}: {
    opened: boolean;
    setOpened: Dispatch<SetStateAction<boolean>>;
    theme: MantineTheme;
    user: User;
}) => {
    return (
        <MantineHeader height={{ base: 50, md: 70 }} p="md">
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    height: "100%",
                }}
            >
                <MediaQuery largerThan="sm" styles={{ display: "none" }}>
                    <Burger
                        opened={opened}
                        onClick={() => setOpened((o: boolean) => !o)}
                        size="sm"
                        color={theme.colors.gray[6]}
                        mr="xl"
                    />
                </MediaQuery>

                <Group>
                    <Text>{user.name}</Text>
                </Group>
                <Group>
                    <ToggleColorScheme my={"sm"} />
                    <Button
                        onClick={() => router.post("/logout")}
                        variant="subtle"
                        size="xs"
                    >
                        Logout
                    </Button>
                </Group>
            </div>
        </MantineHeader>
    );
};
export default Header;
