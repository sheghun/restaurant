import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import Restaurant from "./components/restaurant";

const Wrapper = styled.div`
  width: 99vw;
  margin: 0 auto 0;
  max-width: 1920px;
  height: 100vh;
`;
const Nav = styled.nav`
  width: 75%;
  flex-wrap: wrap;
  display: flex;
  justify-content: space-between;
  margin: 0 auto 0;
  padding: 10% 5% 10%;

  @media only screen and (max-width: 500px) {
    padding: 3%;
  }
`;

const H1 = styled.h1`
  width: 100%;
  padding-bottom: 10%;
  text-align: center;
`;

const RestaurantHeading = styled.h2`
  width: 100%;
  padding-bottom: 10%;
  text-align: center;

  @media (max-width: 600px) {
    padding-top: 2rem;
    font-weight: 300;
    font-size: 18px;
  }
`;

const Input = styled.select`
  width: 48%;
  text-align: center;
  font-size: 16px;
  height: 50px;
  border: none;
  box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,
    rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
  border-radius: 1rem;
  padding-left: 4rem;
  background-color: transparent;
  @media only screen and (max-width: 600px) {
    margin-top: 1rem;
    width: 100%;
  }
`;

const RestaurantList = styled.div`
  width: 75%;
  margin: 0 auto 0;
  padding: 0% 5% 10%;
  height: auto;
`;

export default function App() {
//   const baseUrl = "http://localhost:3000/api";
  const baseUrl = "/api";

  const [cities, setCities] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [cuisines, setCuisines] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedCuisine, setSelectedCuisine] = useState("");

  useEffect(() => {
    (async () => {
      const { data } = await fetch(`${baseUrl}/cities`).then((res) =>
        res.json()
      );
      setCities(data);
    })();

    (async () => {
      const { data } = await fetch(`${baseUrl}/cuisines`).then((res) =>
        res.json()
      );
      setCuisines(data);
    })();

    (async () => {
      const { data } = await fetch(`${baseUrl}/restaurants`).then((res) =>
        res.json()
      );
      setRestaurants(data);
    })();
  }, []);

  const filteredRestaurants = useMemo(() => {
    return restaurants
      .filter((restaurant) => {
        // return true;
        if (!selectedCity && !selectedCuisine) {
          return true;
        }

        if (selectedCity && selectedCuisine) {
          return (
            restaurant.city._id === selectedCity &&
            restaurant.cuisines.includes(selectedCuisine)
          );
        }

        if (selectedCity && !selectedCuisine) {
          return restaurant.city._id === selectedCity;
        }

        if (selectedCuisine) {
          return restaurant.cuisines.includes(selectedCuisine);
        }
      })
      .map((restaurant) => (
        <Restaurant
          key={restaurant._id}
          cuisines={restaurant.cuisines}
          name={restaurant.name}
          city={restaurant.city.name}
          averageCost={restaurant.averageCost}
        />
      ));
  }, [restaurants, selectedCity, selectedCuisine]);

  return (
    <>
      <Wrapper>
        <Nav>
          <H1>Search For Food</H1>
          <Input
            placeholder="Search city"
            onChange={(e) => setSelectedCity(e.target.value)}
          >
            <option selected disabled>
              Select City
            </option>
            {cities.map((city) => (
              <option value={city._id}>{city.name}</option>
            ))}
          </Input>

          <Input
            placeholder="Pick a Cuisine"
            onChange={(e) => setSelectedCuisine(e.target.value)}
          >
            <option selected disabled>
              Pick a Cuisine
            </option>
            {cuisines.map((cuisine) => (
              <option value={cuisine.name}>{cuisine.name}</option>
            ))}
          </Input>
        </Nav>
        <RestaurantList>
          <RestaurantHeading>
            Restaurants{" "}
            {selectedCity &&
              `in ${cities.find((city) => city._id === selectedCity)?.name} `}
            {selectedCuisine && `offering ${selectedCuisine} Dishes`}
          </RestaurantHeading>
          {filteredRestaurants}
        </RestaurantList>
      </Wrapper>
    </>
  );
}
