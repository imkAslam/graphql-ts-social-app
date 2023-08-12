import { createStandaloneToast } from "@chakra-ui/react";

type Props = {
  title: string;
  description?: string;
  status?: "success" | "error" | "warning" | "info";
  position?:
    | "top"
    | "top-right"
    | "top-left"
    | "bottom"
    | "bottom-right"
    | "bottom-left";
};

const Toaster = ({
  title,
  description,
  status = "success",
  position = "top-right",
}: Props) => {
  const { toast } = createStandaloneToast();

  return toast({
    title: title,
    description: description,
    status: status,
    position: position,
    variant: "left-accent",
    duration: 9000,
    isClosable: true,
  });
};

export default Toaster;
