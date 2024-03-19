import React from "react";
import data from "../data/recipe";
import {
  Box,
  Card,
  CardBody,
  HStack,
  Heading,
  Spacer,
  Stack,
  Text,
} from "@chakra-ui/react";
import NutritionCardItem from "../components/NutritionCardItem";
import CardItem2 from "../components/CardItem2";

const NutritionCard = ({ nutrition }) => {
  return (
    <Card maxW="md" boxShadow="lg" bgColor="orange.100">
      <CardBody>
        <Stack>
          <Heading as="h1" textAlign="center" p={2}>
            Nutrition facts
          </Heading>
          <Box h={3} bgColor="gray.200"></Box>
        </Stack>
        <Stack mt={3} spacing="2">
          <Heading as="h2" fontSize="2xl">
            Amount Per Serving:
          </Heading>
          <HStack mb={4}>
            <Heading>Calories</Heading>
            <Spacer />
            <Heading>
              {nutrition.totalNutrients.ENERC_KCAL.quantity.toFixed(2)}
            </Heading>
          </HStack>

          <NutritionCardItem
            title="Total Fat"
            amount={nutrition.totalNutrients.FAT.quantity}
            unit={nutrition.totalNutrients.FAT.unit}
            dailyValue={nutrition.totalDaily.FAT.quantity}
          />
          <Box ml={3}>
            <CardItem2
              title="Saturated Fat"
              amount={nutrition.totalNutrients.FASAT.quantity}
              unit={nutrition.totalNutrients.FASAT.unit}
              dailyValue={nutrition.totalDaily.FASAT.quantity}
            />
            {nutrition.totalNutrients.FATRN && (
              <CardItem2
                title="Trans Fat"
                amount={nutrition.totalNutrients.FATRN.quantity}
                unit={nutrition.totalNutrients.FATRN.unit}
                dailyValue={0}
              />
            )}
          </Box>
          <NutritionCardItem
            title="Cholesterol"
            amount={nutrition.totalNutrients.CHOLE.quantity}
            unit={nutrition.totalNutrients.CHOLE.unit}
            dailyValue={nutrition.totalDaily.CHOLE.quantity}
          />
          <NutritionCardItem
            title="Sodium"
            amount={nutrition.totalNutrients.NA.quantity}
            unit={nutrition.totalNutrients.NA.unit}
            dailyValue={nutrition.totalDaily.NA.quantity}
          />
          <NutritionCardItem
            title="Total Carbohydrate"
            amount={nutrition.totalNutrients.CHOCDF.quantity}
            unit={nutrition.totalNutrients.CHOCDF.unit}
            dailyValue={nutrition.totalDaily.CHOCDF.quantity}
          />
          <Box ml={3}>
            {nutrition.totalNutrients.FIBTG && (
              <CardItem2
                title="Dietary Fiber"
                amount={nutrition.totalNutrients.FIBTG.quantity}
                unit={nutrition.totalNutrients.FIBTG.unit}
                dailyValue={nutrition.totalDaily.FIBTG.quantity}
              />
            )}
            {nutrition.totalNutrients.SUGAR && (
              <CardItem2
                title="Total Sugars"
                amount={nutrition.totalNutrients.SUGAR.quantity}
                unit={nutrition.totalNutrients.SUGAR.unit}
                dailyValue={0}
              />
            )}
            <CardItem2 title="Includes - Added Sugars" />
          </Box>
          <NutritionCardItem
            title="Protein"
            amount={nutrition.totalNutrients.PROCNT.quantity}
            unit={nutrition.totalNutrients.PROCNT.unit}
            dailyValue={nutrition.totalDaily.PROCNT.quantity}
          />
          <CardItem2
            title="Vitamin D"
            amount={nutrition.totalNutrients.VITD.quantity}
            unit={nutrition.totalNutrients.VITD.unit}
            dailyValue={nutrition.totalDaily.VITD.quantity}
          />
          <CardItem2
            title="Calcium"
            amount={nutrition.totalNutrients.CA.quantity}
            unit={nutrition.totalNutrients.CA.unit}
            dailyValue={nutrition.totalDaily.CA.quantity}
          />
          <CardItem2
            title="Iron"
            amount={nutrition.totalNutrients.FE.quantity}
            unit={nutrition.totalNutrients.FE.unit}
            dailyValue={nutrition.totalDaily.FE.quantity}
          />
          <CardItem2
            title="Potassium"
            amount={nutrition.totalNutrients.K.quantity}
            unit={nutrition.totalNutrients.K.unit}
            dailyValue={nutrition.totalDaily.K.quantity}
          />
        </Stack>
      </CardBody>
    </Card>
  );
};

export default NutritionCard;
