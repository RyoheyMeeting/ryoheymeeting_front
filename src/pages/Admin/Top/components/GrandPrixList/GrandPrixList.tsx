import React from "react";
import { EditableGrandPrix } from "../EditableGrandPrix/EditableGrandPrix";
import { useGrandPrixListState } from "./hooks/useGrandPrixListState";

type Props = {};

export const GrandPrixList: React.FC<Props> = () => {
  const { grandPrixes, grandPrixSortedKeys, addGrandPrixBtnHandler, removeListener } = useGrandPrixListState();
  return (
    <ul>
      {grandPrixSortedKeys.map((key) => (
        <li key={key}>
          <EditableGrandPrix grandPrixId={key} isNew={grandPrixes[key].isNew} removeListener={removeListener} />
        </li>
      ))}
      <li>
        <button onClick={addGrandPrixBtnHandler}>追加</button>
      </li>
    </ul>
  );
};
