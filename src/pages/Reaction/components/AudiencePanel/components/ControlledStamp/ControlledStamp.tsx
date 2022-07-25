import { Stamp } from "components/Stamp/Stamp";
import React from "react";
import { ButtonOpts } from "Types/Utils";
import { ControlledStampStyle } from "./ControlledStampStyle";
import { useControlledStampState } from "./hooks/useControlledStampState";

type Props = {
  changeStampId: {
    value: string;
    handler: (value: string) => void;
  };
  changeStrength: {
    value: number;
    handler: (value: number) => void;
  };
  sendReactionBtn: ButtonOpts;
};

export const ControlledStamp: React.FC<Props> = ({ changeStampId, changeStrength, sendReactionBtn }) => {
  const { stamps, mouseoverHandler } = useControlledStampState(
    changeStampId.handler,
    changeStrength.handler,
    sendReactionBtn.handler
  );

  return (
    <ControlledStampStyle>
      <div className="controlledstamp_fields">
        <div className="controlledstamp_field_submit" />
        <div className="controlledstamp_field_cancel" />
      </div>
      <div className="controlledstamp_stamps">
        {stamps.map((stamp) => (
          <div key={stamp.key}>
            <div className="controlledstamp_stamp" onMouseOver={() => mouseoverHandler(stamp.key)} {...stamp.events}>
              <Stamp
                active={changeStampId.value == stamp.key}
                size="XL"
                stampName={stamp.data.name}
                stampUrl={stamp.stampUrl}
              />
            </div>
          </div>
        ))}
      </div>
    </ControlledStampStyle>
  );
};
