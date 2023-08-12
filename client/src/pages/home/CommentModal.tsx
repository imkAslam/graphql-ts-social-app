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
} from "@chakra-ui/react";
import { BiMessageDetail } from "react-icons/bi";
import Mutations from "../../gql/mutations";
import Toaster from "../../components/Toaster";
import { useForm } from "react-hook-form";

type FormValues = {
  comment: string;
};
type ModalProps = {
  postId: string | number;
};
function CommentModal({ postId }: ModalProps) {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<FormValues>();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [addComment, { loading }] = useMutation(Mutations.COMMENT, {
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
    addComment({
      variables: {
        postId: postId,
        ...values,
      },
      onCompleted() {
        onClose();
        reset();
      },
    });
  }

  return (
    <>
      <Button variant="link" width="full" onClick={onOpen}>
        <BiMessageDetail />
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>New Comment</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalBody pb={6}>
              <FormControl mt={4}>
                <FormLabel>Comment</FormLabel>
                <Textarea
                  id="comment"
                  {...register("comment", {
                    required: "required",
                  })}
                  isInvalid={!!errors.comment}
                  errorBorderColor="red.400"
                  placeholder="Type your comment here..."
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
