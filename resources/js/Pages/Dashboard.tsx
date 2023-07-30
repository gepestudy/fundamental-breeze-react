import AppShell from "@/Components/layouts/AppShell";
import { PageProps } from "@/types";
import { Head } from "@inertiajs/react";
import { Button, Text, useMantineColorScheme } from "@mantine/core";
import axios from "axios";
import { useLaravelReactI18n } from "laravel-react-i18n";

export default function Dashboard({ auth, flash }: PageProps) {
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();
    const memek = useLaravelReactI18n();

    return (
        <AppShell pageTitle="Dashboard" user={auth.user}>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className=" overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 ">You're logged in!</div>
                        <Text>{memek.t("test.hello", { name: "memek" })}</Text>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}
