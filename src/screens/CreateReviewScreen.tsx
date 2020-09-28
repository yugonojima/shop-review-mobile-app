import React, { useEffect, useState, useContext } from "react";
import { StyleSheet, SafeAreaView, View, Image, Alert } from "react-native";
import { createReviewRef, uploadImage } from "../lib/firebase";
import { UserContext } from "../Context/UserContext";
import { ReviewsContext } from "../Context/ReviewsContext";
import { pickImage } from "../lib/image-picker";
import firebase from "firebase";
import { getExtention } from "../utils/file";

/* components */
import { IconButton } from "../components/IconButton";
import { TextArea } from "../components/TextArea";
import { StarInput } from "../components/StarsInput";
import { Button } from "../components/Button";
import { Loading } from "../components/Loading";
/* types */
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types/navigation";
import { RouteProp } from "@react-navigation/native";
import { Review } from "../types/review";

type Props = {
  navigation: StackNavigationProp<RootStackParamList, "CreateReview">;
  route: RouteProp<RootStackParamList, "CreateReview">;
};

export const CreateReviewScreen: React.FC<Props> = ({
  navigation,
  route,
}: Props) => {
  const { shop } = route.params;
  const [text, setText] = useState<string>("");
  const [score, setScore] = useState<number>(3);
  const [imageUri, setImageUri] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { user } = useContext(UserContext);
  const { reviews, setReviews } = useContext(ReviewsContext);

  useEffect(() => {
    navigation.setOptions({
      title: shop.name,
      headerLeft: () => (
        <IconButton onPress={() => navigation.goBack()} name="x" />
      ),
    });
  }, [shop]);

  const onSubmit = async () => {
    if (!text || !imageUri) {
      Alert.alert("レビューまたは画像がありません");
      return;
    }
    setLoading(true);
    // documentのIDを先に取得
    const reviewDocRef = await createReviewRef(
      shop.id !== undefined ? shop.id : ""
    );
    // storageのpathを決定
    const ext = getExtention(imageUri);
    const storagePath = `reviews/${reviewDocRef.id}.${ext}`;
    //画像をstorageにアップロード
    const downloadUrl = await uploadImage(imageUri, storagePath);
    //reviewドキュメントを作る
    const review = {
      id: reviewDocRef.id,
      user: {
        id: user !== undefined ? user.id : "",
        name: user !== undefined ? user.name : "",
      },
      shop: {
        id: shop.id,
        name: shop.name,
      },
      text: text,
      score: score,
      imageUrl: downloadUrl,
      updatedAt: firebase.firestore.Timestamp.now(),
      createdAt: firebase.firestore.Timestamp.now(),
    } as Review;
    await reviewDocRef.set(review);
    // レビュー一覧に即時反映させる
    setReviews([review, ...reviews]);
    setText("");
    setScore(3);
    setImageUri("");
    setLoading(false);
    navigation.goBack();
  };

  const onPickImage = async () => {
    const uri = await pickImage();
    setImageUri(uri !== undefined ? uri : "");
  };

  return (
    <SafeAreaView style={styles.container}>
      <StarInput score={score} onChangeScore={(value) => setScore(value)} />
      <TextArea
        value={text}
        onChangeText={(value) => setText(value)}
        label="レビュー"
        placeholder="レビューを書いてください"
      />
      <View style={styles.photoContainer}>
        <IconButton name="camera" onPress={onPickImage} color="#ccc" />
        {!!imageUri && (
          <Image source={{ uri: imageUri }} style={styles.image} />
        )}
      </View>
      <Button onPress={onSubmit} text="レビューを投稿する" />
      <Loading visible={loading} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  photoContainer: {
    margin: 8,
  },
  image: {
    width: 100,
    height: 100,
    margin: 8,
  },
});
