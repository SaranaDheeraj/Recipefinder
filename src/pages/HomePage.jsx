import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Box, SimpleGrid, Skeleton } from "@chakra-ui/react";
import RecipeCard from "../components/RecipeCard";
import SideDrawer from "../components/SideDrawer.jsx";

const HomePage = () => {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("egg");
  const [isLoading, setIsLoading] = useState(true);

  const previous = JSON.parse(localStorage.getItem("previous")) || "egg";

  const handleSearch = async (value) => {
    setSearch(value);
    localStorage.setItem("previous", JSON.stringify(value));
    const url = `https://api.edamam.com/api/recipes/v2?type=public&q=${value}&app_id=a7a6ca05&app_key=7af5257ec06ad1cde0dc1f2ef21634bf`;
    const result = await axios.get(url);
    const newRecipes = result.data.hits;
    setRecipes(newRecipes);
    setIsLoading(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      const value = previous || "egg";
      setSearch(value);
      setIsLoading(true);
      const url = `https://api.edamam.com/api/recipes/v2?type=public&q=${value}&app_id=a7a6ca05&app_key=7af5257ec06ad1cde0dc1f2ef21634bf`;
      const result = await axios.get(url);
      const recipes = result.data.hits;
      setRecipes(recipes);
      setIsLoading(false);
    };

    fetchData();
  }, [previous]);

  return (
    <Box bg="orange.50">
      {/* //building a nav bar for the project */}
      <SideDrawer handleSearch={handleSearch} />
      <Box mx="auto" maxW={{ sm: "480", md: "750", lg: "1200px" }}>
        <SimpleGrid minChildWidth="340px">
          {recipes.map((r, i) => (
            <Link to={`/recipes/${i}?q=${search}`} key={i}>
              {isLoading ? (
                <Skeleton
                  boxShadow="xl"
                  rounded="md"
                  m="4"
                  maxW="340px"
                  minH="500px"
                  cursor="pointer"
                />
              ) : (
                <RecipeCard hits={r} />
              )}
            </Link>
          ))}
        </SimpleGrid>
      </Box>
    </Box>
  );
};

export default HomePage;
