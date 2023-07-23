import { Flash } from "@/types";
import { router } from "@inertiajs/react";
import { useId } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import axios from "axios";
import { useEffect } from "react";

const FlashMessage = ({ flash }: { flash: Flash | undefined }) => {
    const errorId = useId();
    const messageId = useId();
    const successId = useId();

    const clearFlash = async () => {
        try {
            const data = await axios.get("/clear-flash-session", {
                headers: {
                    Accept: "Aplication/json",
                },
            });
            console.log("clear", data);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        switch (true) {
            case flash?.error !== null:
                notifications.show({
                    id: errorId,
                    title: "Error",
                    message: flash?.error,
                    autoClose: 5000,
                    color: "red",
                    withBorder: true,
                    withCloseButton: true,
                    styles: (theme) => ({
                        title: {
                            color: theme.colors.red[6],
                            fontWeight: 700,
                        },
                        description: {
                            fontWeight: 500,
                        },
                    }),
                    onClose: () => clearFlash(),
                });
                break;

            case flash?.message !== null:
                notifications.show({
                    id: messageId,
                    title: "Message",
                    message: flash?.message,
                    autoClose: 5000,
                    withBorder: true,
                    withCloseButton: true,
                    styles: (theme) => ({
                        title: {
                            fontWeight: 700,
                        },
                        description: {
                            fontWeight: 500,
                        },
                    }),
                    onClose: () => clearFlash(),
                });
                break;
            case flash?.success !== null:
                notifications.show({
                    id: successId,
                    title: "Success",
                    message: flash?.success,
                    autoClose: 5000,
                    color: "green",
                    withBorder: true,
                    withCloseButton: true,
                    styles: (theme) => ({
                        title: {
                            color: theme.colors.green[6],
                            fontWeight: 700,
                        },
                        description: {
                            fontWeight: 500,
                        },
                    }),
                    onClose: () => clearFlash(),
                });
                break;

            default:
                null;
                break;
        }

        return () => {
            clearFlash();
        };
    }, [flash?.error, flash?.message, flash?.success]);

    return null;
};
export default FlashMessage;
