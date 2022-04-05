import React from "react";

type Props = {
  imageURL: string;
  soundURL: string;
};

export const PushedStamp: React.FC<Props> = (props) => {
  return (
    <div>
      <img src={props.imageURL} alt="stamp" />
      <button
        onClick={() => {
          new Audio(props.soundURL).play();
        }}
      >
        再生
      </button>
    </div>
  );
};
