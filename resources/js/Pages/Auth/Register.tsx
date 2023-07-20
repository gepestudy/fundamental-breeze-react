import { useEffect, FormEventHandler, useState } from "react";

import { Head, Link, useForm } from "@inertiajs/react";
import {
    Button,
    Card,
    Container,
    PasswordInput,
    TextInput,
} from "@mantine/core";

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    useEffect(() => {
        return () => {
            reset("password", "password_confirmation");
        };
    }, []);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("register"));
    };

    return (
        <Container
            sx={(theme) => ({
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                justifyItems: "center",
                maxWidth: "400px",
            })}
        >
            <Head title="Register" />

            <Card withBorder shadow="md" p="xl">
                <form onSubmit={submit}>
                    <div>
                        <TextInput
                            label="Name"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            required
                            error={errors.name}
                        />
                    </div>

                    <div className="mt-4">
                        <TextInput
                            label="Email"
                            value={data.email}
                            onChange={(e) => setData("email", e.target.value)}
                            required
                            error={errors.email}
                        />
                    </div>

                    <div className="mt-4">
                        <PasswordInput
                            label="Password"
                            value={data.password}
                            onChange={(e) => {
                                setData("password", e.target.value);
                            }}
                            autoComplete="new-password"
                            required
                            error={errors.password}
                        />
                    </div>
                    <div className="mt-4">
                        <PasswordInput
                            label="Password Confirmation"
                            value={data.password_confirmation}
                            onChange={(e) => {
                                setData(
                                    "password_confirmation",
                                    e.target.value
                                );
                            }}
                            autoComplete="new-password"
                            required
                            error={errors.password}
                        />
                    </div>

                    <div className="flex items-center justify-end mt-4">
                        <Link
                            href={route("login")}
                            className="underline text-sm hover:brightness-75 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Already registered?
                        </Link>

                        <Button
                            type="submit"
                            className="ml-4"
                            disabled={processing}
                        >
                            Register
                        </Button>
                    </div>
                </form>
            </Card>
        </Container>
    );
}
