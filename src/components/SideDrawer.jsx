import { Search2Icon } from "@chakra-ui/icons";
import { Box, Button, Flex, Input, useDisclosure } from "@chakra-ui/react";
import React, { useState } from "react";

const SideDrawer = ({ handleSearch }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const [search, setSearch] = useState("");
  return (
    <Flex
      minH="30px"
      alignItems="center"
      p={4}
      gap="auto"
      justifyContent="center"
    >
      <Box width={{ base: "80%", md: "50%" }} bg="white" borderRadius="2xl">
        <Input
          placeholder="Search for a recipe"
          size="lg"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
      </Box>
      <Box>
        <Button size="lg" bg="orange.100" onClick={() => handleSearch(search)}>
          <Search2Icon />
        </Button>
      </Box>
    </Flex>
  );
};

export default SideDrawer;
