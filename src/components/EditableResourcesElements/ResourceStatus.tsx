import React, { Fragment } from "react";
import { Status, StatusType } from "hooks/ResourceList/useEditableResources";

type Props = {
  status: StatusType;
  isEdit: boolean;
};

export const ResourceStatus: React.FC<Props> = ({ status, isEdit }) => {
  return (
    <Fragment>
      {status === Status.valid
        ? "OK"
        : status === Status.invalid
        ? "NG"
        : status === Status.uploading
        ? "保存中"
        : undefined}
      ,{isEdit ? "編集中" : undefined}
    </Fragment>
  );
};
