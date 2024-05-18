import { useState, useEffect } from "react";
import axios from "axios";
import { Box, Select, Text } from "@chakra-ui/react";
import { strict_output } from "../gpt";

export default function AllergyPage() {
  const [healthConditions, setHealthConditions] = useState([]);
  const [foodGroups, setFoodGroups] = useState([]);
  const [selectedCondition, setSelectedCondition] = useState("");
  const [selectedFoodGroup, setSelectedFoodGroup] = useState("");
  const [healthyFoods, setHealthyFoods] = useState([]);
  const [unHealthyFoods, setUnHealthyFoods] = useState([]);

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
            `Please provide an array of healthy foods and an array of foods that you should avoid for the given health condition: ${selectedCondition} and food group: ${selectedFoodGroup}`,
            {
              healthyFoods: "generate an array of healthy foods as required",
              unHealthyFoods: "generate an array of unhealthy foods as required"
            }
          );

          setHealthyFoods(outputUnits.healthyFoods || []);
          setUnHealthyFoods(outputUnits.unHealthyFoods || []);
        } catch (error) {
          console.error("Error generating allergy data:", error.response);
        }
      };

      generateAllergy();
    }
  }, [selectedCondition, selectedFoodGroup]);

  return (
    <Box width="400px" margin="auto" padding="20px">
      <Text fontSize="2xl" mb="4">
        Welcome to the Allergy Page
      </Text>
      <Text mb="4">
        This page helps you explore food options based on your health condition and food preferences.
      </Text>
      <Select
        placeholder="Select health condition"
        onChange={(e) => setSelectedCondition(e.target.value)}
        value={selectedCondition}
        mb="4"
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
      <Select
        placeholder="Select a food group"
        onChange={(e) => setSelectedFoodGroup(e.target.value)}
        value={selectedFoodGroup}
        mb="4"
      >
        {foodGroups.map((food) => (
          <option key={food.foodGroupID} value={food.description}>
            {food.description}
          </option>
        ))}
      </Select>

      {selectedCondition && (
        <Box mb="4">
          <Text fontSize="lg">Selected Condition:</Text>
          <Text fontWeight="bold">{selectedCondition}</Text>
        </Box>
      )}
      {selectedFoodGroup && (
        <Box mb="4">
          <Text fontSize="lg">Selected Food Group:</Text>
          <Text fontWeight="bold">{selectedFoodGroup}</Text>
        </Box>
      )}
      
      {healthyFoods.length > 0 && (
        <Box mb="4">
          <Text fontSize="lg">Healthy Foods:</Text>
          {healthyFoods.map((food, index) => (
            <Text key={index}>{food}</Text>
          ))}
        </Box>
      )}
      {unHealthyFoods.length > 0 && (
        <Box mb="4">
          <Text fontSize="lg">Unhealthy Foods:</Text>
          {unHealthyFoods.map((food, index) => (
            <Text key={index}>{food}</Text>
          ))}
        </Box>
      )}
    </Box>
  );
}
