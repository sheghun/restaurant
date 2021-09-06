import React from "react";
import styled from "styled-components";

const Card = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  height: auto;
  border: none;
  justify-content: space-between;
  margin-bottom: 2rem;
  padding: 1rem;
  box-shadow: rgba(6, 24, 44, 0.4) 0px 0px 0px 2px,
    rgba(6, 24, 44, 0.65) 0px 4px 6px -1px,
    rgba(255, 255, 255, 0.08) 0px 1px 0px inset;

  @media (max-width: 600px) {
    height: auto;
  }
  & p {
    margin-bottom: .5rem;
  }
`;

const Name = styled.h3`
  margin-bottom: 2rem;
  @media (max-width: 600px) {
    font-size: 16px;
  }
`;

export default function Restaurant({ name, city, averageCost, cuisines }) {
  return (
    <Card>
      <Name>{name} Cafeteria</Name>
      <p>
        <small>City:</small> {city}
      </p>
      <p>
        <small>Average cost of dinner: </small>
        <span>${averageCost}</span>
      </p>
      <p>
        <small>Cuisines: {cuisines.join(", ")}</small>
      </p>
    </Card>
  );
}
