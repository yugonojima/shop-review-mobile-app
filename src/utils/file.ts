// 拡張子を返すメッソド
export const getExtention = (path: string) => {
  return path.split(".").pop();
};
