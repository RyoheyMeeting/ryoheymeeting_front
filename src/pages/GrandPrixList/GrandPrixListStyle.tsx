import styled from "styled-components";
import { FlexGap } from "styles/Utils/FlexGap";

export const GrandPrixListStyle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  min-height: 100vh;
  max-width: 100%;
  padding-bottom: 48px;

  .grandprixlist_wrapper {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-content: flex-start;
    justify-content: space-around;
    ${FlexGap({ gap: "64px", direction: "row" })}
    padding: 24px 64px;
    max-width: 1500px;
    flex-shrink: 1;
    min-width: 0;
  }

  .grandprixlist_card {
    text-decoration: none;
  }
`;
