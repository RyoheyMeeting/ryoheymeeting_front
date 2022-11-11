import React from "react";
import { EditableModerateSound } from "../EditableModerateSound/EditableModerateSound";
import { useModerateSoundListState } from "./hooks/useModerateSoundListState";

type Props = {};

export const ModerateSoundList: React.FC<Props> = () => {
  const { moderateSounds, moderateSoundSortedKeys, addModerateSoundBtnHandler, removeListener, toOld } =
    useModerateSoundListState();
  return (
    <ul>
      {moderateSoundSortedKeys.map((key) => (
        <li key={key}>
          <EditableModerateSound
            moderateSoundId={key}
            isNew={moderateSounds[key].isNew}
            removeListener={removeListener}
            toOld={toOld}
          />
        </li>
      ))}
      <li>
        <button onClick={addModerateSoundBtnHandler}>追加</button>
      </li>
    </ul>
  );
};
