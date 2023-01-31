export enum FetchStatus {
  loading,
  succeed,
  failed,
}
export type CompilerOutput = {
  compilerMessage: string;
  compilerBody: string;
};
