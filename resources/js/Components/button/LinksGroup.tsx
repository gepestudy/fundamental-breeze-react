import { useState } from "react";
import {
    Group,
    Box,
    Collapse,
    ThemeIcon,
    Text,
    UnstyledButton,
    createStyles,
    rem,
} from "@mantine/core";
import {
    IconCalendarStats,
    IconChevronLeft,
    IconChevronRight,
} from "@tabler/icons-react";
import { Link } from "@inertiajs/react";

const useStyles = createStyles((theme) => ({
    control: {
        fontWeight: 500,
        display: "block",
        width: "100%",
        padding: `${theme.spacing.xs} ${theme.spacing.md}`,
        color:
            theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
        fontSize: theme.fontSizes.sm,
        textDecoration: "none",

        "&:hover": {
            backgroundColor:
                theme.colorScheme === "dark"
                    ? theme.colors.dark[7]
                    : theme.colors.gray[0],
            color: theme.colorScheme === "dark" ? theme.white : theme.black,
        },
    },

    link: {
        fontWeight: 500,
        display: "block",
        textDecoration: "none",
        padding: `${theme.spacing.xs} ${theme.spacing.md}`,
        paddingLeft: rem(31),
        marginLeft: rem(30),
        fontSize: theme.fontSizes.sm,
        color:
            theme.colorScheme === "dark"
                ? theme.colors.dark[0]
                : theme.colors.gray[7],
        borderLeft: `${rem(1)} solid ${
            theme.colorScheme === "dark"
                ? theme.colors.dark[4]
                : theme.colors.gray[3]
        }`,

        "&:hover": {
            backgroundColor:
                theme.colorScheme === "dark"
                    ? theme.colors.dark[7]
                    : theme.colors.gray[0],
            color: theme.colorScheme === "dark" ? theme.white : theme.black,
        },
    },

    chevron: {
        transition: "transform 200ms ease",
    },
}));

interface LinksGroupProps {
    icon: React.FC<any> | string | number;
    label: string;
    initiallyOpened?: boolean;
    links?: { label: string; link: string }[];
    link?: string;
}

export function LinksGroup({
    icon: Icon,
    label,
    initiallyOpened,
    links,
    link,
}: LinksGroupProps) {
    const { classes, theme } = useStyles();
    const hasLinks = Array.isArray(links);
    const [opened, setOpened] = useState(initiallyOpened || false);
    const ChevronIcon =
        theme.dir === "ltr" ? IconChevronRight : IconChevronLeft;
    const items = (hasLinks ? links : []).map((link) => (
        <Link className={classes.link} href={link.link} key={link.label}>
            {link.label}
        </Link>
    ));

    return (
        <>
            {link ? (
                <>
                    <Link href={link} className={classes.control}>
                        <Group position="apart" spacing={0}>
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                                <ThemeIcon variant="light" size={30}>
                                    {typeof Icon !== "function" ? (
                                        Icon
                                    ) : (
                                        <Icon size="1.1rem" />
                                    )}
                                </ThemeIcon>
                                <Box ml="md">{label}</Box>
                            </Box>
                        </Group>
                    </Link>
                </>
            ) : (
                <>
                    <UnstyledButton
                        onClick={() => setOpened((o) => !o)}
                        className={classes.control}
                    >
                        <Group
                            position="apart"
                            spacing={0}
                            className="relative "
                        >
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                                <ThemeIcon variant="light" size={30}>
                                    {typeof Icon !== "function" ? (
                                        Icon
                                    ) : (
                                        <Icon size="1.1rem" />
                                    )}
                                </ThemeIcon>
                                <Box ml="md">{label}</Box>
                            </Box>
                            {hasLinks && (
                                <ChevronIcon
                                    className={`${classes.chevron} absolute right-0`}
                                    size="1rem"
                                    stroke={1.5}
                                    style={{
                                        transform: opened
                                            ? `rotate(${
                                                  theme.dir === "rtl" ? -90 : 90
                                              }deg)`
                                            : "none",
                                    }}
                                />
                            )}
                        </Group>
                    </UnstyledButton>
                    {hasLinks ? <Collapse in={opened}>{items}</Collapse> : null}
                </>
            )}
        </>
    );
}

// const mockdata = {
//   label: "Releases",
//   icon: IconCalendarStats,
//   links: [
//     { label: "Upcoming releases", link: "/" },
//     { label: "Previous releases", link: "/" },
//     { label: "Releases schedule", link: "/" },
//   ],
// };

// export function NavbarLinksGroup() {
//   return (
//     <Box
//       sx={(theme) => ({
//         minHeight: rem(220),
//         padding: theme.spacing.md,
//         backgroundColor:
//           theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.white,
//       })}
//     >
//       <LinksGroup {...mockdata} />
//     </Box>
//   );
// }
