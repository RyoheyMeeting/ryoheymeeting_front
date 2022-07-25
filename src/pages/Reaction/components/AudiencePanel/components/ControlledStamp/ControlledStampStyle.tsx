import styled, { css } from "styled-components";

export type ControlledStampStyleProps = {};

const defaultStyle = css`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;

  .controlledstamp_fields {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }

  .controlledstamp_field_submit {
    position: absolute;
    width: 100%;
    height: 80%;
    top: 0;
    left: 0;
  }

  .controlledstamp_field_cancel {
    position: absolute;
    width: 100%;
    height: 20%;
    bottom: 0;
    left: 0;
  }

  .controlledstamp_stamps {
    position: absolute;
    width: 100%;
    height: 300px;
    bottom: 0;
    left: 0;

    display: flex;
    flex-direction: row;
    justify-content: space-evenly;

    transform: translateY(200px);
    transition: transform 0.2s ease;

    :hover {
      transform: translateY(100px);
    }
  }

  .controlledstamp_stamp {
    transition: transform 0.2s ease;

    :hover {
      transform: translateY(-100px);
    }
  }
`;

export const ControlledStampStyle = styled.div<ControlledStampStyleProps>`
  ${defaultStyle}
`;

ControlledStampStyle.defaultProps = {};
