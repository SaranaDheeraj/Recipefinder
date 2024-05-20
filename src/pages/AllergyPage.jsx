import { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Card,
  Flex,
  Heading,
  ListItem,
  OrderedList,
  Select,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import { strict_output } from "../gpt";

export default function AllergyPage() {
  const [healthConditions, setHealthConditions] = useState([]);
  const [foodGroups, setFoodGroups] = useState([]);
  const [selectedCondition, setSelectedCondition] = useState("");
  const [selectedFoodGroup, setSelectedFoodGroup] = useState("");
  const [healthyFoods, setHealthyFoods] = useState([]);
  const [unHealthyFoods, setUnHealthyFoods] = useState([]);
  const [precautions, setPrecautions] = useState([]);

  useEffect(() => {
    const fetchHealthConditions = async () => {
      try {
        const response = await axios.get(
          "https://5jocnrfkfb.execute-api.us-east-1.amazonaws.com/PersonalRemedies/nutridigm/api/v2/healthconditions?subscriptionID=mYGuEibZ9IXzmqbRezevH"
        );

        setHealthConditions(response.data);
      } catch (error) {
        console.error("Error fetching health conditions:", error);
      }
    };

    const fetchFoodGroups = async () => {
      try {
        const response = await axios.get(
          "https://5jocnrfkfb.execute-api.us-east-1.amazonaws.com/PersonalRemedies/nutridigm/api/v2/foodgroups?subscriptionID=mYGuEibZ9IXzmqbRezevH"
        );

        setFoodGroups(response.data);
      } catch (error) {
        console.error("Error fetching food groups:", error);
      }
    };

    fetchHealthConditions();
    fetchFoodGroups();
  }, []);

  useEffect(() => {
    if (selectedCondition && selectedFoodGroup) {
      const generateAllergy = async () => {
        try {
          const outputUnits = await strict_output(
            `You are an AI capable of generating the most relevant food for the health condition`,
            `Please provide an array of healthy foods and an array of foods that you should avoid for the given health condition: ${selectedCondition}, food group: ${selectedFoodGroup}, and what are the precautions that you should take for that health condition.`,
            {
              healthyFoods: "generate an array of healthy foods as required",
              unHealthyFoods:
                "generate an array of unhealthy foods as required",
              precautions: "generate an array of precautions as required",
            }
          );

          setHealthyFoods(outputUnits.healthyFoods || []);
          setUnHealthyFoods(outputUnits.unHealthyFoods || []);
          setPrecautions(outputUnits.precautions || []);
        } catch (error) {
          console.error("Error generating allergy data:", error.response);
        }
      };

      generateAllergy();
    }
  }, [selectedCondition, selectedFoodGroup]);

  return (
    <Box bgColor="blue.100" m={0} py={5}>
      <Card
        minW="350px"
        maxW="900px"
        minH="100vh"
        margin={{ base: "3", md: "auto" }}
        p={5}
        variant="outline"
        bgColor="orange.100"
        my={5}
      >
        <Heading fontSize="3xl" mb="4">
          {" "}
          Welcome to the Allergy Page
        </Heading>
        <Text mb="4" fontSize="xl">
          This feature allows you to explore and select various health
          conditions and food groups. Here’s how you can use it:
        </Text>
        <Box mb="4" fontSize="lg">
          <OrderedList spacing={3}>
            <ListItem>
              <b>Select a Health Condition: </b>
              <Text as="span">
                Use the dropdown menu to select a health condition from the
                list. This will help you understand which conditions are
                relevant to your allergies.
              </Text>
            </ListItem>
            <ListItem>
              <b>Select a Food Group: </b>
              <Text as="span">
                Once you’ve selected a health condition, use the second dropdown
                menu to select a food group. This will show you food groups
                associated with the selected health condition.
              </Text>
            </ListItem>
            <ListItem>
              <b>View Your Selections: </b>
              <Text as="span">
                After making your selections, you will see the details of the
                chosen health condition and food group displayed below the
                dropdowns. This information can help you manage your allergies
                more effectively.
              </Text>
            </ListItem>
          </OrderedList>
        </Box>

        <Flex
          bgColor="green.100"
          borderRadius="lg"
          mb={5}
          flexDir={{ base: "column", md: "row" }}
        >
          <Box width={{ base: "100%", md: "50%" }} p={3}>
            <Text
              as="label"
              fontSize="lg"
              fontWeight="bold"
              htmlFor="healthCondition"
              mb="4"
            >
              Select a Health Condition:
            </Text>
            <Select
              placeholder="Select here"
              id="healthCondition"
              onChange={(e) => setSelectedCondition(e.target.value)}
              value={selectedCondition}
              mb="2"
            >
              {healthConditions.map((condition) => (
                <option
                  key={condition.healthConditionID}
                  value={condition.description}
                >
                  {condition.description}
                </option>
              ))}
            </Select>

            <Text
              as="label"
              fontSize="lg"
              fontWeight="bold"
              htmlFor="healthCondition"
              mb="4"
            >
              Select a Food Group:
            </Text>
            <Select
              placeholder="Select here"
              onChange={(e) => setSelectedFoodGroup(e.target.value)}
              value={selectedFoodGroup}
            >
              {foodGroups.map((food) => (
                <option key={food.foodGroupID} value={food.description}>
                  {food.description}
                </option>
              ))}
            </Select>
          </Box>

          <Flex
            width={{ base: "100%", md: "50%" }}
            gap={4}
            p={3}
            alignItems="center"
            justifyContent="center"
            flexDir="column"
            mb={5}
          >
            {selectedCondition && (
              <Box>
                <Text fontSize="lg">Selected Condition:</Text>
                <Text fontWeight="bold">{selectedCondition}</Text>
              </Box>
            )}
            {selectedFoodGroup && (
              <Box>
                <Text fontSize="lg">Selected Food Group:</Text>
                <Text fontWeight="bold">{selectedFoodGroup}</Text>
              </Box>
            )}
          </Flex>
        </Flex>
        <Flex
          mb={5}
          gap={3}
          alignItems="center"
          justifyContent="space-around"
          flexDir={{ base: "column", md: "row" }}
        >
          {healthyFoods.length > 0 && (
            <Box
              width={{ base: "100%", md: "md" }}
              bgColor="green.400"
              p={2}
              borderRadius="lg"
            >
              <Text fontSize="lg" fontWeight="bold">
                Healthy Foods:
              </Text>
              <UnorderedList>
                {healthyFoods.map((food, index) => (
                  <ListItem key={index}>
                    <Text>{food}</Text>
                  </ListItem>
                ))}
              </UnorderedList>
            </Box>
          )}
          {unHealthyFoods.length > 0 && (
            <Box
              width={{ base: "100%", md: "md" }}
              bgColor="red.400"
              p={2}
              borderRadius="lg"
            >
              <Text fontSize="lg" fontWeight="bold">
                Unhealthy Foods:
              </Text>
              <UnorderedList>
                {unHealthyFoods.map((food, index) => (
                  <ListItem key={index}>
                    <Text>{food}</Text>
                  </ListItem>
                ))}
              </UnorderedList>
            </Box>
          )}
        </Flex>
        {precautions.length > 0 && (
          <Box mb="4" bgColor="yellow.400" p={2} borderRadius="lg">
            <Text fontSize="lg" fontWeight="bold">
              Precautions:
            </Text>
            <OrderedList>
              {precautions.map((food, index) => (
                <ListItem key={index}>
                  <Text>{food}</Text>
                </ListItem>
              ))}
            </OrderedList>
          </Box>
        )}
      </Card>
    </Box>
  );
}
