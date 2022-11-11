import React from "react";
import { EditableStampTypeInfo } from "../EditableStampType/EditableStampType";
import { useStampTypeListState } from "./hooks/useStampTypeListState";

type Props = {};

export const StampTypeList: React.FC<Props> = () => {
  const { stampTypes, stampTypeSortedKeys, addStampTypeBtnHandler, removeListener, toOld } = useStampTypeListState();
  return (
    <ul>
      {stampTypeSortedKeys.map((key) => (
        <li key={key}>
          <EditableStampTypeInfo
            stampTypeId={key}
            isNew={stampTypes[key].isNew}
            removeListener={removeListener}
            toOld={toOld}
          />
        </li>
      ))}
      <li>
        <button onClick={addStampTypeBtnHandler}>追加</button>
      </li>
    </ul>
  );
};
