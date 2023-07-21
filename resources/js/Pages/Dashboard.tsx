import AppShell from "@/Components/layouts/AppShell";
import { PageProps } from "@/types";
import { Head } from "@inertiajs/react";
import { Button, useMantineColorScheme } from "@mantine/core";
import axios from "axios";

export default function Dashboard({ auth, flash }: PageProps) {
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();

    return (
        <AppShell pageTitle="Dashboard" user={auth.user}>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className=" overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 ">You're logged in!</div>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}
