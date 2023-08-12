import {
  CardHeader,
  Card,
  CardBody,
  Heading,
  Text,
  CardFooter,
  SimpleGrid,
  HStack,
  Box,
  Center,
  Flex,
  Menu,
  MenuButton,
  IconButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { useQuery, useMutation } from "@apollo/client";
import Queries from "../../gql/queries";
import { Key } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import Toaster from "../../components/Toaster";
import Mutations from "../../gql/mutations";
import usePersist from "../../hooks/usePersist";
import { EditIcon, HamburgerIcon } from "@chakra-ui/icons";
import InitialFocus from "./PostModal";
import CommentModal from "./CommentModal";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [auth]: any = usePersist("user_auth");
  const { data } = useQuery(Queries.GET_POSTS, {
    variables: { offset: 0, limit: 10 },
    onError(err) {
      console.warn(err.graphQLErrors[0]);
      Toaster({
        title: err.graphQLErrors[0].message,
        description: err.graphQLErrors[0].extensions.code as string,
        status: "error",
      });
    },
  });

  const [likePost] = useMutation(Mutations.LIKE_POST, {
    onError(err) {
      console.warn("like-post-error", err.graphQLErrors[0].message);
      Toaster({
        title: err.graphQLErrors[0].message,
        description: err.graphQLErrors[0].extensions.code as string,
        status: "error",
      });
    },
  });

  function logout() {
    localStorage.clear();
    navigate("/");
  }

  return (
    <Flex direction="column">
      <HStack
        justifyContent="space-between"
        px="10"
        bg="gray.100"
        borderBottom="1px"
        borderColor="gray.300"
        height="4em"
      >
        <Box>
          <Text>{auth?.userName}</Text>
        </Box>
        <Box>
          <Menu>
            <MenuButton
              as={IconButton}
              aria-label="Options"
              icon={<HamburgerIcon />}
              variant="outline"
            />
            <MenuList>
              <MenuItem>
                <InitialFocus />
              </MenuItem>
              <MenuItem icon={<EditIcon />} command="⌘O" onClick={logout}>
                Logout
              </MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </HStack>

      <SimpleGrid
        p="4"
        spacing={4}
        templateColumns="repeat(auto-fill, minmax(400px, 1fr))"
      >
        {data?.getPosts?.map(
          (item: {
            id: Key;
            title: string;
            body: string;
            likesCount: number;
            commentsCount: number;
          }) => (
            <Card key={item.id}>
              <CardHeader>
                <Heading size="md">{item.title}</Heading>
              </CardHeader>
              <CardBody>
                <Text>{item.body}</Text>
              </CardBody>
              <CardFooter>
                <HStack spacing="1rem">
                  <Flex
                    justifyContent="space-between"
                    rounded="sm"
                    width="28"
                    h="8"
                    bg="gray.200"
                    shadow="md"
                  >
                    <Box
                      width="28"
                      h="full"
                      position="relative"
                      bg="whiteAlpha.100"
                      roundedStart="md"
                      cursor="pointer"
                      onClick={() =>
                        likePost({
                          variables: {
                            postId: item.id,
                          },
                        })
                      }
                    >
                      <Center h="full">
                        <AiOutlineHeart />
                      </Center>
                    </Box>
                    <Box width="20" h="full" position="relative">
                      <Center
                        rounded="md"
                        h="full"
                        className="arrow-box"
                        bg="#efefef"
                      >
                        {item.likesCount}
                      </Center>
                    </Box>
                  </Flex>
                  <Flex
                    justifyContent="space-between"
                    rounded="sm"
                    width="28"
                    h="8"
                    bg="gray.200"
                    shadow="md"
                  >
                    <Box
                      width="28"
                      h="full"
                      position="relative"
                      bg="whiteAlpha.100"
                      roundedStart="md"
                      cursor="pointer"
                    >
                      <Center h="full">
                        <CommentModal postId={item.id} />
                      </Center>
                    </Box>
                    <Box width="20" h="full" position="relative">
                      <Center
                        rounded="md"
                        h="full"
                        className="arrow-box"
                        bg="#efefef"
                      >
                        {item.commentsCount}
                      </Center>
                    </Box>
                  </Flex>
                </HStack>
              </CardFooter>
            </Card>
          )
        )}
      </SimpleGrid>
    </Flex>
  );
};

export default Dashboard;
