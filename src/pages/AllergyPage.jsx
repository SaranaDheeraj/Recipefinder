import { useState, useEffect } from "react";
import axios from "axios";
import { Box, Select, Text } from "@chakra-ui/react";

export default function AllergyPage() {
  const [healthConditions, setHealthConditions] = useState([]);
  const [foodGroups, setFoodGroups] = useState([]);
  const [selectedCondition, setSelectedCondition] = useState("");
  const [selectedFoodGroup, setSelectedFoodGroup] = useState("");

  useEffect(() => {
    const fetchHealthConditions = async () => {
      try {
        const response = await axios.get(
          "https://5jocnrfkfb.execute-api.us-east-1.amazonaws.com/PersonalRemedies/nutridigm/api/v2/healthconditions?subscriptionID=mYGuEibZ9IXzmqbRezevH"
        );

        // Flatten the arrays
        const combinedConditions = response.data.flat();
        setHealthConditions(combinedConditions);
      } catch (error) {
        console.error("Error fetching health conditions:", error);
      }
    };

    const fetchFoodGroups = async () => {
      try {
        const response = await axios.get(
          "https://5jocnrfkfb.execute-api.us-east-1.amazonaws.com/PersonalRemedies/nutridigm/api/v2/foodgroups?subscriptionID=mYGuEibZ9IXzmqbRezevH"
        );

        // Flatten the arrays
        const combinedFoodGroups = response.data.flat();
        setFoodGroups(combinedFoodGroups);
      } catch (error) {
        console.error("Error fetching food groups:", error);
      }
    };

    fetchHealthConditions();
    fetchFoodGroups();
  }, []);

  return (
    <Box width="300px" margin="auto" padding="20px">
      <Text fontSize="2xl" mb="4">
        Allergy Page
      </Text>
      <Select
        placeholder="Select health condition"
        onChange={(e) => {
          setSelectedCondition(e.target.value);
        }}
        value={selectedCondition}
      >
        {healthConditions.map((condition) => (
          <option
            key={condition.healthConditionID}
            value={condition.healthConditionID}
          >
            {condition.description}
          </option>
        ))}
      </Select>
      <Select
        placeholder="Select a food group"
        onChange={(e) => setSelectedFoodGroup(e.target.value)}
        value={selectedFoodGroup}
        mt="4"
      >
        {foodGroups.map((food) => (
          <option key={food.foodGroupID} value={food.foodGroupID}>
            {food.description}
          </option>
        ))}
      </Select>

      {selectedCondition && (
        <Box mt="4">
          <Text fontSize="lg">Selected Condition:</Text>
          <Text fontWeight="bold">{selectedCondition}</Text>
          <Text>
            {
              healthConditions.find((cond) => cond.healthConditionID == 46)
                ?.description
            }
          </Text>
        </Box>
      )}
      {selectedFoodGroup && (
        <Box mt="4">
          <Text fontSize="lg">Selected Food Group:</Text>
          <Text fontWeight="bold">{selectedFoodGroup}</Text>
        </Box>
      )}
    </Box>
  );
}
