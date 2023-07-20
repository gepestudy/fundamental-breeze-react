import { Head, useForm } from "@inertiajs/react";
import { Button, Card, Container, TextInput } from "@mantine/core";
import { FormEventHandler } from "react";

export default function ForgotPassword({ status }: { status?: string }) {
    const { data, setData, post, processing, errors } = useForm({
        email: "",
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("password.email"));
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
            <Head title="Forgot Password" />
            <Card withBorder shadow="md" p="xl">
                <div className="mb-4 text-sm">
                    Forgot your password? No problem. Just let us know your
                    email address and we will email you a password reset link
                    that will allow you to choose a new one.
                </div>

                {status && (
                    <div className="mb-4 font-medium text-sm text-green-600">
                        {status}
                    </div>
                )}

                <form onSubmit={submit}>
                    <TextInput
                        label="email"
                        value={data.email}
                        onChange={(e) => setData("email", e.target.value)}
                        error={errors.email}
                    />

                    <div className="flex items-center justify-end mt-4">
                        <Button className="ml-4" disabled={processing}>
                            Email Password Reset Link
                        </Button>
                    </div>
                </form>
            </Card>
        </Container>
    );
}
