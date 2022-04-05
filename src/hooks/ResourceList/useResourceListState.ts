import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "store";
import { Dict } from "Types/Utils";

export type EditableResourceRequire = {
  isNew: boolean;
};

export type IResponse = {
  resources: Dict<EditableResourceRequire>;
  resourceSortedKeys: string[];
  addResourceBtnHandler: () => void;
  removeListener: (id: string) => void;
};

export const useResourceListState = <T extends object>(
  idGenerator: () => string,
  selector: (state: RootState) => Dict<T>
): IResponse => {
  const resources = useSelector(selector);
  const [editableResources, setEditableResources] = useState<Dict<EditableResourceRequire>>({});
  const [resourceKeys, setResourceKeys] = useState<string[]>([]);

  useEffect(() => {
    Object.keys(resources).forEach((key) => {
      editableResources[key] = {
        isNew: false,
      };
    });
    setEditableResources({ ...editableResources });
    _updateKeys({ ...editableResources });
  }, [resources]);

  const _addResourceBtnHandler = () => {
    const id = idGenerator();
    const updated = {
      ...editableResources,
      [id]: {
        isNew: true,
      },
    };
    setEditableResources(updated);
    _updateKeys(updated);
  };

  const _removeListener = (id: string) => {
    delete editableResources[id];
    setEditableResources({ ...editableResources });
    _updateKeys(editableResources);
  };

  const _updateKeys = (resources: Dict<EditableResourceRequire>) => {
    setResourceKeys(Object.keys(resources));
  };

  return {
    resources: editableResources,
    resourceSortedKeys: resourceKeys,
    addResourceBtnHandler: _addResourceBtnHandler,
    removeListener: _removeListener,
  };
};
