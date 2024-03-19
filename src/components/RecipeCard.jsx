import React, { useState } from "react";
import axios from "axios";

import data from "../data/recipe.js";
import {
  Box,
  Card,
  CardBody,
  CardFooter,
  Divider,
  HStack,
  Heading,
  Image,
  Text,
} from "@chakra-ui/react";

function Feature({ number, desc, ...rest }) {
  return (
    <Box {...rest}>
      <Text as="span" fontSize="xl" mr={2} color="green.600">
        {number}
      </Text>
      <Text as="span">{desc}</Text>
    </Box>
  );
}

const RecipeCard = ({ hits }) => {
  const { recipe } = hits;
  const cardStyles = {
    ":hover": {
      bg: "green.200",
      transition: "background-color 0.5s ease",
    },
  };
  return (
    <div>
      <Card
        sx={cardStyles}
        bg={recipe.calories > 2000 ? "orange.200" : "red.50"}
        boxShadow="xl"
        rounded="md"
        m="4"
        maxW="340px"
        minH="500px"
        cursor="pointer"
      >
        <CardBody>
          <Image src={recipe.image} alt={recipe.label} borderRadius="lg" />
          <Heading as="h2" size="lg" mt={4} ml={2} letterSpacing="wider">
            {recipe.label.length > 27
              ? recipe.label.substring(0, 27) + "..."
              : recipe.label}
          </Heading>
        </CardBody>
        <Divider />
        <CardFooter>
          <HStack spacing="3" ml={4}>
            <Feature
              number={parseFloat(recipe.calories).toFixed(2)}
              desc="CALORIES"
              pr={3}
              borderRightWidth="2px"
              borderColor="gray.200"
              ml={-4}
            />
            <Feature
              number={recipe.ingredientLines.length}
              desc="INGREDIENTS"
            />
          </HStack>
        </CardFooter>
      </Card>
    </div>
  );
};

export default RecipeCard;
