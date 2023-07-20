import { Head, Link, useForm } from "@inertiajs/react";
import {
    Box,
    Button,
    Card,
    Checkbox,
    Container,
    PasswordInput,
    Stack,
    TextInput,
} from "@mantine/core";
import axios from "axios";
import { FormEventHandler, useEffect } from "react";

export default function Login({
    status,
    canResetPassword,
}: {
    status?: string;
    canResetPassword: boolean;
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset("password");
        };
    }, []);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("login"));
    };

    return (
        <Box>
            <Head title="Log in" />

            {status && (
                <div className="mb-4 font-medium text-sm text-green-600">
                    {status}
                </div>
            )}

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
                <Card withBorder shadow="md" p="xl">
                    <form onSubmit={submit}>
                        <div>
                            <TextInput
                                type="email"
                                label="Email"
                                value={data.email}
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                                error={errors.email}
                            />
                        </div>

                        <div className="mt-4">
                            <PasswordInput
                                placeholder="Password"
                                label="Password"
                                description="Password must include at least one letter, number and special character"
                                value={data.password}
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                                error={errors.password}
                            />
                        </div>

                        <div className="block mt-4">
                            <label className="flex items-center">
                                <Checkbox
                                    name="remember"
                                    checked={data.remember}
                                    onChange={(e) =>
                                        setData("remember", e.target.checked)
                                    }
                                />
                                <span className="ml-2 text-sm ">
                                    Remember me
                                </span>
                            </label>
                        </div>

                        <div className="flex flex-col justify-center items-center sm:flex-row sm:justify-between ">
                            <Link
                                href={route("register")}
                                className=" text-sm no-underline rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Register
                            </Link>
                            {canResetPassword && (
                                <Link
                                    href={route("password.request")}
                                    className="underline text-sm  rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Forgot your password?
                                </Link>
                            )}

                            <Button
                                type="submit"
                                className="ml-4"
                                disabled={processing}
                            >
                                Log in
                            </Button>
                        </div>
                    </form>
                </Card>
            </Container>
        </Box>
    );
}
