import { Card, Flex, Heading, Stack } from "@sanity/ui";
import { Button } from "../../components/Button";
import { TextInput } from "../../components/TextInput";
import * as classes from "./route.css";
import { useTransition } from "react";
import { useRouter } from "../../core/router";
import { useAuth } from "../../core/auth/AuthBoundary";

export const Login = () => {
  const [isPending, transition] = useTransition();
  const { navigate } = useRouter();
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("handleSubmit");

    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    transition(async () => {
      await login(email, password);
      navigate("/");
    });
  };

  return (
    <Flex
      direction="column"
      align="center"
      height="fill"
      justify="center"
      gap={5}
    >
      <Card
        className={classes.root}
        border
        padding={5}
        radius={3}
        display="flex"
        flexDirection="column"
        gap={5}
        alignItems="center"
      >
        <Heading as="h1" size={2}>
          Welcome!
        </Heading>
        <Stack as="form" gap={4} width="fill" onSubmit={handleSubmit}>
          <TextInput
            label="Email"
            name="email"
            type="email"
            required
            placeholder="charlie.kelly@asip.com"
          />
          <TextInput
            label="Password"
            name="password"
            type="password"
            required
            placeholder="********"
          />

          <Button
            width="fill"
            fontSize={1}
            type="submit"
            text="Login"
            loading={isPending}
          />
        </Stack>
      </Card>
    </Flex>
  );
};
