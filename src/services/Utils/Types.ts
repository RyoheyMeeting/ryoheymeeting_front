import { PayloadAction } from "@reduxjs/toolkit";
import { FieldValue } from "firebase/firestore";
import { AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";
import { RootState } from "store";

export type deletable<T> = {
  [P in keyof T]?: T[P] | FieldValue;
};

export type firestoreOperatable<T> = {
  [P in keyof T]: T[P] | FieldValue;
};

export type nullable<T> = {
  [P in keyof T]?: T[P] | undefined | null;
};

export type ThunkResult<R> = ThunkAction<R, RootState, undefined, AnyAction>;

export type PayloadWithId<T> = PayloadAction<{
  id: string;
  data: T;
}>;

export type PayloadPartialWithId<T> = PayloadAction<{
  id: string;
  data: Partial<T>;
}>;

export declare type PartialFieldValue<T> = {
  [K in keyof T]?: FieldValue;
};

export const isDate = (instance: unknown): instance is Date => {
  return (
    instance instanceof Date ||
    (typeof instance === "object" && Object.prototype.toString.call(instance) === "[object Date]")
  );
};
