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
import { useLaravelReactI18n } from "laravel-react-i18n";
import Localization from "../button/Localization";
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
    const { t } = useLaravelReactI18n();
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
                    <Localization />
                    <Button
                        onClick={() => router.post("/logout")}
                        variant="subtle"
                        size="xs"
                    >
                        {t("Appshell.Header.Logout")}
                    </Button>
                </Group>
            </div>
        </MantineHeader>
    );
};
export default Header;
