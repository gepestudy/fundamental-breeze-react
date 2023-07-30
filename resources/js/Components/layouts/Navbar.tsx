import { User } from "@/types";
import {
    Code,
    Group,
    Navbar as MantineNavbar,
    ScrollArea,
    Text,
    createStyles,
    rem,
} from "@mantine/core";
import { LinksGroup } from "../button/LinksGroup";
import { UserButton } from "../button/UserButton";
import { useLaravelReactI18n } from "laravel-react-i18n";
const Navbar = ({ opened, user }: { opened: boolean; user: User }) => {
    const { t } = useLaravelReactI18n();
    const { classes } = useStyles();
    const mockdata = [
        {
            label: t("Appshell.Navbar.Dashboard"),
            icon: "1",
            link: "/dashboard",
        },
        {
            label: t("Appshell.Navbar.Section_14"),
            icon: 14,
            links: [
                {
                    label: t("Appshell.Navbar.Section_14_Posts"),
                    link: "/post",
                },
                {
                    label: t("Appshell.Navbar.Section_14_Create_Posts"),
                    link: "/post/create",
                },
                {
                    label: t("Appshell.Navbar.Section_14_Trashed_Posts"),
                    link: "/post/trashed",
                },
            ],
        },
    ];
    const links = mockdata.map((item) => (
        <LinksGroup {...item} key={item.label} />
    ));
    return (
        <MantineNavbar
            p="md"
            hiddenBreakpoint="sm"
            hidden={!opened}
            width={{ sm: 320, lg: 350 }}
            // height={800}
            className={classes.navbar}
        >
            <MantineNavbar.Section className={classes.header}>
                <Group position="apart">
                    <Text>Toko Anjing</Text>
                    <Code sx={{ fontWeight: 700 }}>v3.1.2</Code>
                </Group>
            </MantineNavbar.Section>

            <MantineNavbar.Section
                grow
                className={classes.links}
                component={ScrollArea}
            >
                <div className={classes.linksInner}>{links}</div>
            </MantineNavbar.Section>

            <MantineNavbar.Section className={classes.footer}>
                <UserButton
                    image="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=255&q=80"
                    name={user.name}
                    email={user.email}
                />
            </MantineNavbar.Section>
        </MantineNavbar>
    );
};
export default Navbar;

const useStyles = createStyles((theme) => ({
    navbar: {
        backgroundColor:
            theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.white,
        paddingBottom: 0,
    },

    header: {
        padding: theme.spacing.md,
        paddingTop: 0,
        marginLeft: `calc(${theme.spacing.md} * -1)`,
        marginRight: `calc(${theme.spacing.md} * -1)`,
        color: theme.colorScheme === "dark" ? theme.white : theme.black,
        borderBottom: `${rem(1)} solid ${
            theme.colorScheme === "dark"
                ? theme.colors.dark[4]
                : theme.colors.gray[3]
        }`,
    },

    links: {
        marginLeft: `calc(${theme.spacing.md} * -1)`,
        marginRight: `calc(${theme.spacing.md} * -1)`,
    },

    linksInner: {
        paddingTop: theme.spacing.xl,
        paddingBottom: theme.spacing.xl,
    },

    footer: {
        marginLeft: `calc(${theme.spacing.md} * -1)`,
        marginRight: `calc(${theme.spacing.md} * -1)`,
        borderTop: `${rem(1)} solid ${
            theme.colorScheme === "dark"
                ? theme.colors.dark[4]
                : theme.colors.gray[3]
        }`,
    },
}));
