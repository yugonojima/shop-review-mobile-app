import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";

const getCameraRollPermission = async () => {
  if (Constants.platform !== undefined ? Constants.platform.ios : "") {
    const {status} = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      alert("画像を選択するためにはカメラロールの許可が必要です");
    }
  }
}

export const pickImage = async () => {
  await getCameraRollPermission();
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes:ImagePicker.MediaTypeOptions.Images,
    allowsEditing:false
  });
  if (!result.cancelled) {
    return result.uri;
  }

}
