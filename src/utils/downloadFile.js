import * as FileSystem from "expo-file-system";

export async function downloadFile(url, onProgressCallback) {
  const fileName = url.split("/").pop();
  const callback = (downloadProgress) => {
    const progress =
      downloadProgress.totalBytesWritten /
      downloadProgress.totalBytesExpectedToWrite;
    onProgressCallback?.(progress * 100);
    if (progress >= 1 || progress < 0) {
      onProgressCallback?.(0);
    }
  };
  const path = `${FileSystem.documentDirectory}${fileName}`;
  const downloadResumable = FileSystem.createDownloadResumable(
    url,
    path,
    {},
    callback
  );
  try {
    console.log({ path, url });
    await downloadResumable.downloadAsync();
  } catch (e) {
    console.log(e);
  }
}
