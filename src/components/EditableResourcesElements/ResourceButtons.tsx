import React, { Fragment } from "react";

type BtnOpts = {
  disabled?: boolean;
  clickHandler?: () => void;
};

type Props = {
  isEdit: boolean;
  isChange: boolean;
  saveBtn?: BtnOpts;
  closeBtn?: BtnOpts;
  removeBtn?: BtnOpts;
  editStartBtn?: BtnOpts;
};

export const ResourceButtons: React.FC<Props> = ({ isEdit, isChange, saveBtn, closeBtn, removeBtn, editStartBtn }) => {
  return isEdit ? (
    <Fragment>
      {saveBtn && (
        <button onClick={saveBtn.clickHandler} disabled={!!saveBtn.disabled}>
          保存
        </button>
      )}
      {closeBtn && (
        <button onClick={closeBtn.clickHandler} disabled={!!closeBtn.disabled}>
          {isChange ? "変更破棄" : "閉じる"}
        </button>
      )}
      {removeBtn && (
        <button onClick={removeBtn.clickHandler} disabled={!!removeBtn.disabled}>
          削除
        </button>
      )}
    </Fragment>
  ) : (
    <Fragment>
      {editStartBtn && (
        <button onClick={editStartBtn.clickHandler} disabled={!!editStartBtn.disabled}>
          編集開始
        </button>
      )}
    </Fragment>
  );
};
