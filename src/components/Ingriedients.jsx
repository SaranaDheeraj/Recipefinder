import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React from "react";

const Ingriedients = ({ ingredients }) => {
  return (
    <TableContainer
      width={{ base: "sm", md: "lg" }}
      border="2px solid gray"
      bgColor="teal.50"
      borderRadius="xl"
    >
      <Table>
        <Thead>
          <Tr>
            <Th>Qty</Th>
            <Th>Unit</Th>
            <Th>Food</Th>
            <Th>Calories</Th>
            <Th>Weight</Th>
          </Tr>
        </Thead>
        <Tbody>
          {ingredients.map((ing, i) => (
            <Tr key={i}>
              <Td>{ing.quantity}</Td>
              <Td>{ing.measure}</Td>
              <Td>{ing.foodMatch}</Td>
              <Td>{ing.nutrients.ENERC_KCAL.quantity} kcal</Td>
              <Td>{ing.weight} g</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default Ingriedients;
