import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  Heading,
  Image,
  Text,
  OrderedList,
  ListItem,
  SimpleGrid,
  GridItem,
  Skeleton,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate, useLocation } from "react-router-dom";

const RecipePage = () => {
  const { id } = useParams();
  const search = new URLSearchParams(useLocation().search);
  const value = search.get("q");
  const [recipe, setRecipe] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const url = `https://api.edamam.com/api/recipes/v2?type=public&q=${value}&app_id=a7a6ca05&app_key=7af5257ec06ad1cde0dc1f2ef21634bf`;
      const result = await axios.get(url);
      const recipes = result.data.hits;

      setRecipe(recipes[id].recipe);
      setLoading(false);
    };

    fetchData();
  }, [id]);

  return (
    <Box bg="teal.50">
      <Container
        maxW={{ base: "md", md: "100%", lg: "1200px" }}
        px={{ base: 5, md: 20 }}
        py={{ base: 5, md: 20 }}
      >
        <Button colorScheme="teal" mb={5} onClick={() => navigate("/")}>
          Go Back!
        </Button>

        <Box boxShadow="outline" rounded="md" bg="green.100">
          <Box
            display="flex"
            as="div"
            flexDirection={{ base: "column", sm: "row" }}
            height={{ base: "100%", md: "400px" }}
            justifyContent="center"
          >
            <Center m={3} width={{ base: "auto", md: "40%" }}>
              {loading ? (
                <Skeleton height="100%" width="100%" borderRadius="lg" />
              ) : (
                <Image
                  boxSize={{ base: "auto", md: "375px" }}
                  borderRadius="lg"
                  src={
                    recipe.images?.LARGE
                      ? recipe.images?.LARGE.url
                      : recipe.image
                  }
                />
              )}
            </Center>
            <Box
              width={{ base: "auto", md: "60%" }}
              mt={{ base: "5px", md: "0px" }}
            >
              <Flex
                height="100%"
                flexDirection="column"
                justifyContent="center"
              >
                <Center>
                  <Heading as="h2" fontSize={{ base: "3xl", md: "4xl" }}>
                    {recipe.label}
                  </Heading>
                </Center>
                <Center mt={3}>
                  <Text ml={3} as="span">
                    {" "}
                    see full Recipe on on{" "}
                    <a href={recipe.url} style={{ fontWeight: "bold" }}>
                      {" "}
                      {recipe.source}
                    </a>
                  </Text>
                </Center>
              </Flex>
            </Box>
          </Box>
          <Flex flexDirection={{ base: "column", md: "row" }}>
            <Flex p={5} flexDirection="column">
              <Box width={{ base: "100%" }}>
                <Box borderBottomWidth="2px" borderColor="gray.400" pb={3}>
                  <Text
                    as="span"
                    fontSize="xl"
                    mr={2}
                    color="green.600"
                    fontWeight="bold"
                  >
                    {recipe.ingredientLines && recipe.ingredientLines.length}
                  </Text>
                  <Text as="span" fontSize="xl" fontWeight="bold" mr={2}>
                    Ingredients
                  </Text>
                </Box>
                <Box mt={3}>
                  <OrderedList>
                    {recipe.ingredientLines &&
                      recipe.ingredientLines.map((ing, i) => (
                        <ListItem key={i} p={3}>
                          {ing}
                        </ListItem>
                      ))}
                  </OrderedList>
                </Box>
              </Box>
              <Box mt={4} width={{ base: "100%" }}>
                <Text
                  as="h3"
                  fontSize="xl"
                  fontWeight="bold"
                  pb={3}
                  borderBottomWidth="2px"
                  borderColor="gray.400"
                >
                  Preparation
                </Text>
                <Flex mt={5} alignItems="center">
                  <Button colorScheme="blue">
                    <a
                      href={recipe.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Instructions
                    </a>
                  </Button>
                  <Text ml={3} as="span">
                    on{" "}
                    <span style={{ fontWeight: "bold" }}> {recipe.source}</span>
                  </Text>
                </Flex>
              </Box>
            </Flex>
            <Box
              mx={{ base: "0", md: "3" }}
              mt={{ base: "0", md: "4" }}
              width={{ base: "100%", md: "50%" }}
              p={{ base: "5", md: "0" }}
            >
              <Text
                as="h3"
                fontSize="xl"
                fontWeight="bold"
                pb={4}
                borderBottomWidth="2px"
                borderColor="gray.400"
              >
                Nutrition
              </Text>
              <Flex
                flexDirection={{ base: "column", md: "row" }}
                justifyContent="space-between"
                borderBottomWidth="1px"
                p={2}
                borderColor="gray.400"
              >
                <NutritionComponent
                  value={parseFloat(recipe.calories).toFixed(2)}
                  description={"CALORIES/SERVING"}
                />
                <NutritionComponent value={"6%"} description={"DAILY VALUE"} />

                <NutritionComponent value={"10"} description={"SERVINGS"} />
              </Flex>

              <Text
                mt={5}
                as="h3"
                fontSize="xl"
                fontWeight="bold"
                pb={4}
                borderBottomWidth="2px"
                borderColor="gray.400"
              >
                Health Labels:
              </Text>
              <Box color="green.500" fontWeight="bold" p={4}>
                <SimpleGrid
                  minChildWidth={{ base: "50%", md: "40%", lg: "30%" }}
                >
                  {recipe.healthLabels &&
                    recipe.healthLabels.map((label, i) => (
                      <GridItem key={i}>
                        <Text as="span" fontSize="sm" p={2}>
                          {label}
                        </Text>
                      </GridItem>
                    ))}
                </SimpleGrid>
              </Box>
            </Box>
          </Flex>
        </Box>
      </Container>
    </Box>
  );
};

function NutritionComponent({ value, description }) {
  return (
    <Box mt={4} mb={2}>
      <Center>
        <Text as="span" fontSize="2xl" fontWeight="bold" color="yellow.500">
          {value}
        </Text>
      </Center>
      <Center>
        <Text>{description}</Text>
      </Center>
    </Box>
  );
}

export default RecipePage;
