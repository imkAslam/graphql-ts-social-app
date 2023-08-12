import { useState } from "react";
import {
  //   FormErrorMessage,
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

export default function SignUp(): JSX.Element {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
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
            fontFamily="heading"
          >
            Let's Start !
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
          py={8}
          bg="transparent"
          border="1px solid white"
          shadow="2xl"
          rounded="2xl"
        >
          <VStack my={4}>
            <Text textAlign="center" textColor={"white"} fontSize="2xl">
              Register
            </Text>
            <Box border="1px" borderColor="#4D4D4D" w="28" />
          </VStack>
          <Box>
            <form>
              <VStack gap={2}>
                <FormControl>
                  <FormLabel textColor={"white"} htmlFor="userName">
                    User Name
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
                    id="userName"
                    type="userName"
                    name="userName"
                    placeholder="Enter your username"
                  />
                </FormControl>
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
                    name="email"
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
                      name="password"
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
                </FormControl>
                <FormControl>
                  <FormLabel textColor={"white"} htmlFor="password">
                    Confirm Password
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
                      name="password"
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
                </FormControl>
                <Button
                  bgGradient="linear(to-r,#628EFF, #8740CD, #580475)"
                  _hover={{
                    bgGradient: "linear(10deg,#628EFF, #8740CD, #580475)",
                  }}
                  textColor={"#fff"}
                  type="submit"
                  w="full"
                  mt={4}
                >
                  Register
                </Button>
              </VStack>
            </form>
          </Box>
          <HStack gap={4} my="4">
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
            <Link textColor={"#FFFFFF"}>Already Registered? Login</Link>
          </HStack>
        </Card>
      </HStack>
    </section>
  );
}
