import { Box, Flex, Heading, Link, Spacer } from "@chakra-ui/react";
import React from "react";

const NavBar = () => {
  return (
    <Flex
      as="nav"
      minH="30px"
      alignItems="center"
      p={4}
      gap="auto"
      bgColor="teal.100"
      justifyContent="center"
      color="gray.600"
    >
      <Box display={{ base: "none", sm: "block" }}>
        <Heading>Recipe Finder</Heading>
      </Box>
      <Spacer display={{ base: "none", sm: "block" }} />
      <Flex gap={5} fontSize="2xl" fontWeight="bold">
        <Link href="/" mr={4} _hover={{ color: "teal.600" }}>
          Recipe
        </Link>
        <Link href="/nutrition" _hover={{ color: "teal.600" }}>
          Nutrition
        </Link>
      </Flex>
    </Flex>
  );
};

export default NavBar;
