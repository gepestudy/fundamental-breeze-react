import AppShell from "@/Components/layouts/AppShell";
import { Flash, User } from "@/types";
import {
    Button,
    Card,
    Checkbox,
    Divider,
    Group,
    Image,
    Modal,
    Text,
} from "@mantine/core";
import { useEffect, useRef, useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { IconMinus, IconPlus } from "@tabler/icons-react";
import { Cart } from "./types/CartType";
import { useForm } from "@inertiajs/react";

const CartPage = ({
    auth,
    carts,
    flash,
}: {
    auth: { user: User };
    carts: Cart[];
    flash: Flash;
}) => {
    const [selectAllProduct, setSelectAllProduct] = useState(false);
    const [opened, { open, close }] = useDisclosure(false);
    const incrementForm = useForm();
    const decrementForm = useForm();
    const deleteCartForm = useForm();

    return (
        <AppShell pageTitle="Cart" user={auth.user} flash={flash}>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Card.Section p={"sm"}>
                    <Text mb="md" weight={"bold"}>
                        CART
                    </Text>
                    <div className="flex justify-between items-center h-10">
                        <Checkbox
                            checked={selectAllProduct}
                            onChange={() =>
                                setSelectAllProduct(!selectAllProduct)
                            }
                            label="Select All"
                            color="green"
                        />
                        {selectAllProduct && (
                            <Button variant="subtle" onClick={open}>
                                Remove all
                            </Button>
                        )}
                        <Modal
                            opened={opened}
                            onClose={close}
                            title="Remove all carts"
                            centered
                        >
                            <Text>memek</Text>
                        </Modal>
                    </div>
                    <Divider size={"lg"} my={"md"} />
                </Card.Section>
                <Card.Section>
                    <div className="flex flex-col md:flex-row">
                        {carts.map((cart) => (
                            <Card
                                shadow="sm"
                                padding="sm"
                                radius="md"
                                withBorder
                                key={cart.id}
                            >
                                <Image
                                    src={cart.image}
                                    height={200}
                                    fit="contain"
                                />
                                <Text align="center">{cart.name}</Text>
                                <Text
                                    color="green"
                                    weight={"bold"}
                                    align="center"
                                >
                                    ${cart.price}
                                </Text>
                                <div className="flex flex-row justify-center gap-4">
                                    <Button
                                        color="red"
                                        onClick={() =>
                                            deleteCartForm.delete(
                                                route(
                                                    "s30.cart.delete",
                                                    cart.id
                                                )
                                            )
                                        }
                                    >
                                        Remove
                                    </Button>
                                    <div className="flex items-center">
                                        <Button
                                            variant="subtle"
                                            onClick={() =>
                                                decrementForm.get(
                                                    route(
                                                        "s30.cart.decrement",
                                                        cart.id
                                                    )
                                                )
                                            }
                                        >
                                            <IconMinus size={15} />
                                        </Button>
                                        <Text weight={"bold"}>
                                            {cart.quantity}
                                        </Text>
                                        <Button
                                            variant="subtle"
                                            onClick={() =>
                                                incrementForm.get(
                                                    route(
                                                        "s30.cart.increment",
                                                        {
                                                            id: cart.id,
                                                            // value: 7,
                                                        }
                                                    )
                                                )
                                            }
                                        >
                                            <IconPlus size={15} />
                                        </Button>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </Card.Section>
            </Card>
        </AppShell>
    );
};
export default CartPage;
