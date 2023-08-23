import { useMutation } from "@apollo/client";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  useDisclosure,
  Textarea,
  Input,
  Text,
} from "@chakra-ui/react";
import Mutations from "../../gql/mutations";
import Toaster from "../../components/Toaster";
import { useForm } from "react-hook-form";
import Queries from "../../gql/queries";

type FormValues = {
  title: string;
  body: string;
};

function CommentModal() {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<FormValues>();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [createPost, { loading }] = useMutation(Mutations.CREATE_POST, {
    refetchQueries: [Queries.GET_POSTS],
    onError(err) {
      console.warn("like-post-error", err.graphQLErrors[0].message);
      Toaster({
        title: err.graphQLErrors[0].message,
        description: err.graphQLErrors[0].extensions.code as string,
        status: "error",
      });
    },
  });

  function onSubmit(values: FormValues) {
    createPost({
      variables: { postInput: values },
      onCompleted() {
        onClose();
        reset();
      },
    });
  }

  return (
    <>
      <Text variant="link" width="full" onClick={onOpen}>
        Create New Post
      </Text>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>New Post</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalBody pb={6}>
              <FormControl mt={4}>
                <FormLabel>Title</FormLabel>
                <Input
                  id="title"
                  {...register("title", {
                    required: "required",
                  })}
                  isInvalid={!!errors.title}
                  errorBorderColor="red.400"
                  placeholder="Post title here..."
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Description</FormLabel>
                <Textarea
                  id="body"
                  {...register("body", {
                    required: "required",
                  })}
                  isInvalid={!!errors.body}
                  errorBorderColor="red.400"
                  placeholder="Post..."
                />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button
                type="submit"
                isLoading={loading}
                colorScheme="blue"
                mr={3}
              >
                Save
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}

export default CommentModal;
