import React, { useState } from "react";
import {
  FormLabel,
  FormControl,
  Input,
  Text,
  Card,
  HStack,
  Box,
  InputRightElement,
  InputGroup,
  Link,
  Button,
  VStack,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import Mutations from "../../gql/mutations";
import { useNavigate } from "react-router-dom";
import usePersist from "../../hooks/usePersist";
import Toaster from "../../components/Toaster";
// import Queries from "../../gql/queries";

type FormValues = {
  email: string;
  password: string;
};
export default function Login(): React.ReactElement {
  const navigate = useNavigate();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setAuth] = usePersist("user_auth");
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormValues>();
  const [login, { error, loading }] = useMutation(Mutations.LOGIN, {
    update(_, result) {
      const resp = result.data.login;
      setAuth(resp);
      Toaster({
        title: "Logged in",
        status: "success",
      });
      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
    },
    onError(err) {
      console.warn(err.graphQLErrors[0].message);
      Toaster({
        title: err.graphQLErrors[0].message,
        description: err.graphQLErrors[0].extensions.code as string,
        status: "error",
      });
    },
  });

  // if (error) {
  // }
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  async function onSubmit(values: FormValues) {
    await login({ variables: values });
  }
  return (
    <section className="auth_section">
      <HStack
        position={"relative"}
        mx={{ base: 0, md: "auto" }}
        width={{ base: "100%", lg: "90%" }}
        h="80%"
        px={{ base: 10 }}
        alignSelf="center"
        justify={{ lg: "space-between", base: "center" }}
      >
        <VStack display={{ base: "none", lg: "block" }} w={"60dvw"}>
          <Text
            textColor={"white"}
            fontSize="8xl"
            fontWeight={600}
            fontFamily="sans-serif"
          >
            Welcome Back !
          </Text>
          <Box border="1px" borderColor="#4D4D4D" w="full" />
        </VStack>

        <Box
          w={{ base: "8.75em", md: "16.75em" }}
          h={{ base: "8.75em", md: "16.75em" }}
          position="absolute"
          top={-10}
          rounded={"full"}
          bgGradient="linear(180deg ,#530061, #0D0A30)"
          right={{ lg: "96", base: "unset" }}
          left={{ base: "0", lg: "unset" }}
        />

        <Box
          w={{ base: "8.75em", md: "13.75em" }}
          h={{ base: "8.75em", md: "13.75em" }}
          position="absolute"
          bottom={{ base: -10, md: -20 }}
          rounded={"full"}
          bgGradient="linear(180deg ,#300061, #0A1030)"
          right={{ xl: "-20", base: 0 }}
        />

        <Card
          position={"relative"}
          width={{ base: "100%", lg: "30em" }}
          height={"65.5dvh"}
          px="10"
          py={12}
          bg="transparent"
          border="1px solid white"
          shadow="2xl"
          rounded="2xl"
        >
          <VStack my={4}>
            <Text textAlign="center" textColor={"white"} fontSize="2xl">
              Login
            </Text>
            <Box border="1px" borderColor="#4D4D4D" w="20" />
          </VStack>

          <Box>
            <form onSubmit={handleSubmit(onSubmit)}>
              <VStack gap={2}>
                <FormControl>
                  <FormLabel textColor={"white"} htmlFor="email">
                    Email
                  </FormLabel>
                  <Input
                    bg="transparent"
                    focusBorderColor="#fff"
                    _placeholder={{ opacity: 0.5, color: "#fff" }}
                    textColor={"white"}
                    _autofill={{
                      textFillColor: "#fff",
                      boxShadow: "0 0 0 20px #000000 inset",
                    }}
                    id="email"
                    type="email"
                    {...register("email", {
                      required: "required",
                      pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: "Entered value does not match email format",
                      },
                    })}
                    isInvalid={!!errors.email}
                    errorBorderColor="red.400"
                    placeholder="Enter your email address"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel textColor={"white"} htmlFor="password">
                    Password
                  </FormLabel>
                  <InputGroup size="md">
                    <Input
                      bg="transparent"
                      focusBorderColor="#fff"
                      _placeholder={{ opacity: 0.5, color: "#fff" }}
                      textColor={"white"}
                      _autofill={{
                        textFillColor: "#fff",
                        boxShadow: "0 0 0 20px #000000 inset",
                      }}
                      id="password"
                      type={show ? "text" : "password"}
                      {...register("password", {
                        required: "required",
                        minLength: {
                          value: 5,
                          message: "min length is 5",
                        },
                      })}
                      isInvalid={!!errors.password}
                      errorBorderColor="red.400"
                      placeholder="Enter your password"
                    />
                    <InputRightElement>
                      <Button size="xs" bg="transparent" onClick={handleClick}>
                        {show ? (
                          <ViewIcon color="white" _hover={{ color: "#000" }} />
                        ) : (
                          <ViewOffIcon
                            color="white"
                            _hover={{ color: "#000" }}
                          />
                        )}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  <Text textColor="red.400">
                    {errors.password && errors.password.message}
                  </Text>
                </FormControl>
                <Button
                  bgGradient="linear(to-r,#628EFF, #8740CD, #580475)"
                  _hover={{
                    bgGradient: "linear(10deg,#628EFF, #8740CD, #580475)",
                  }}
                  textColor={"#fff"}
                  w="full"
                  mt={4}
                  isLoading={loading}
                  type="submit"
                >
                  Login
                </Button>
                <Text textColor="red.400">
                  {error?.graphQLErrors[0].message}
                </Text>
              </VStack>
            </form>
          </Box>

          <HStack justifyContent={"center"} my={4}>
            <Link textColor={"#FFFFFF"}>Forgot password ?</Link>
          </HStack>
          <HStack gap={4}>
            <Box border="1px" borderColor="#4D4D4D" w="full" />
            <Text textColor={"#4D4D4D"}>or</Text>
            <Box border="1px" borderColor="#4D4D4D" w="full" />
          </HStack>
          <HStack
            justifyContent={"center"}
            bottom={10}
            position={"absolute"}
            left={0}
            right={0}
          >
            <Link textColor={"#FFFFFF"}>Don’t have an account ? Signup</Link>
          </HStack>
        </Card>
      </HStack>
    </section>
  );
}
