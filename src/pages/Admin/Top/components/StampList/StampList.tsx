import React from "react";
import { EditableStampInfo } from "../EditableStampInfo/EditableStampInfo";
import { useStampListState } from "./hooks/useStampListState";

type Props = {};

export const StampList: React.FC<Props> = () => {
  const { stamps, stampSortedKeys, addStampBtnHandler, removeListener } = useStampListState();
  return (
    <ul>
      {stampSortedKeys.map((key) => (
        <li key={key}>
          <EditableStampInfo stampId={key} isNew={stamps[key].isNew} removeListener={removeListener} />
        </li>
      ))}
      <li>
        <button onClick={addStampBtnHandler}>追加</button>
      </li>
    </ul>
  );
};
