import { VStack, HStack, Heading, Spacer, Text } from "@chakra-ui/react";
import React from "react";

const NutritionCardItem = ({ title, amount, unit, dailyValue }) => {
  const formattedAmount = `${Math.round(amount * 10) / 10} ${unit}`;
  const roundedDailyValue = dailyValue ? Math.round(dailyValue) : ""; // Round daily value to two decimals
  const formattedDailyValue = dailyValue ? `${roundedDailyValue}%` : ""; // Handling cases where daily value might not be available
  return (
    <HStack>
      <Heading fontSize="xl">
        {title} {formattedAmount}
      </Heading>
      <Spacer />
      <Text fontSize="xl">{formattedDailyValue}</Text>
    </HStack>
  );
};

export default NutritionCardItem;
