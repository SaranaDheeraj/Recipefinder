import React, { useState } from "react";
import NutritionCard from "../components/NutritionCard";
import { Box, Button, Flex, Heading, Text, Textarea } from "@chakra-ui/react";
import axios from "axios";
import Ingriedients from "../components/Ingriedients";

const Nutrition = () => {
  let [searchTerm, setSearchTerm] = useState("");
  let [nutrition, setNutrition] = useState(null);
  let [ingredients, setIngredients] = useState(null);

  let handleInputChange = (e) => {
    let inputValue = e.target.value;
    setSearchTerm(inputValue);
  };

  const handleSubmit = async () => {
    const formatedQuery = searchTerm.replace(/\s+/g, " ").trim();
    const query = formatedQuery.replaceAll(",", " and");
    const response = await axios.get(
      `https://api.edamam.com/api/nutrition-data?app_id=90edd5ae&app_key=%205e5d46a147ce76af42282647750f1bac&nutrition-type=cooking&ingr=${query}`
    );
    const { data } = response;
    setIngredients(data.ingredients[0].parsed);
    setNutrition(data);
  };

  return (
    <Box maxW="1350px" mx="auto" py="5" px="3">
      <Heading textAlign="center">Nutrition Analysis</Heading>
      <Text pt="100px" maxW="750px" mx="auto" fontSize="xl" textAlign="center">
        Enter an ingredient list for what you are cooking, like "1 cup rice, 10
        oz chickpeas", etc. Enter each ingredient on a new line.
      </Text>

      <Flex
        mt="100px"
        flexDir={{ base: "column", lg: "row" }}
        justifyContent="center"
        alignItems={{ base: "center", lg: "start" }}
        gap={10}
      >
        <Box>
          <Flex flexDir="column">
            <Box>
              <form action="">
                <Textarea
                  bgColor="white"
                  fontWeight="600"
                  fontSize="lg"
                  borderRadius="xl"
                  // mx={5}
                  width={{ base: "sm", md: "xl" }}
                  height="250px"
                  value={searchTerm}
                  onChange={handleInputChange}
                  placeholder="Enter you Ingriedients here"
                  size="sm"
                />
                <br />
                <Button colorScheme="yellow" onClick={handleSubmit} my={5}>
                  Analyze
                </Button>
              </form>
            </Box>
            <Box>
              {ingredients && <Ingriedients ingredients={ingredients} />}
            </Box>
          </Flex>
        </Box>
        <Box>{nutrition && <NutritionCard nutrition={nutrition} />}</Box>
      </Flex>
    </Box>
  );
};

export default Nutrition;
