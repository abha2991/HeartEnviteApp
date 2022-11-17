import {
  useAuthControllerViewer,
  useCardControllerFind,
  useCardetailsControllerFindAll,
} from "../api";
import { Image, SafeAreaView, ScrollView, Text, View } from "react-native";
import { CardImage } from "../Style";
import { Button, Card } from "react-native-paper";
import React from "react";
import { useNavigation } from "@react-navigation/core";
// import RNFetchBlob from "rn-fetch-blob";

const PurchasedCardDetailsPages = ({ route }) => {
  const navigation = useNavigation();
  const { id } = route.params;
  const { data: profile } = useAuthControllerViewer({});

  const userId = profile?.id;
  const { data: draftData } = useCardControllerFind(userId);
  const cardDetails = draftData?.filter((val) => val.id === id);

  const category = cardDetails[0]?.cardCategory;

  // const checkPermission = async () => {
  //   if (Platform.OS === "ios") {
  //     downloadImage();
  //   } else {
  //     try {
  //       const granted = await PermissionsAndroid.request(
  //         PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
  //         {
  //           title: "Storage Permission Required",
  //           message: "App needs access to your storage to download Photos",
  //         }
  //       );
  //       if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //         // Once user grant the permission start downloading
  //         console.log("Storage Permission Granted.");
  //         downloadImage();
  //       } else {
  //         // If permission denied then show alert
  //         alert("Storage Permission Not Granted");
  //       }
  //     } catch (err) {
  //       // To handle permission related exception
  //       console.warn(err);
  //     }
  //   }
  // };
  //
  // const downloadImage = () => {
  //   // Main function to download the image
  //
  //   // To add the time suffix in filename
  //   let date = new Date();
  //
  //   let image_URL = REMOTE_IMAGE_PATH;
  //
  //   let ext = getExtention(image_URL);
  //   ext = "." + ext[0];
  //
  //   const { config, fs } = RNFetchBlob;
  //   let PictureDir = fs.dirs.PictureDir;
  //   let options = {
  //     fileCache: true,
  //     addAndroidDownloads: {
  //       // Related to the Android only
  //       useDownloadManager: true,
  //       notification: true,
  //       path:
  //         PictureDir +
  //         "/image_" +
  //         Math.floor(date.getTime() + date.getSeconds() / 2) +
  //         ext,
  //       description: "Image",
  //     },
  //   };
  //   config(options)
  //     .fetch("GET", image_URL)
  //     .then((res) => {
  //       console.log("res -> ", JSON.stringify(res));
  //       alert("Image Downloaded Successfully.");
  //     });
  // };
  // const getExtention = (filename) => {
  //   return /[.]/.exec(filename) ? /[^.]+$/.exec(filename) : undefined;
  // };

  return (
    <>
      <ScrollView>
        {cardDetails?.[0]?.cardNames?.map((value, index) => {
          return (
            <>
              <CardImage
                key={index}
                source={{
                  uri:
                    "http://localhost:3001/generated/" + category + "/" + value,
                }}
              />
            </>
          );
        })}
        <View style={{ alignItems: "center" }}></View>
      </ScrollView>
      <SafeAreaView
        style={{ justifyContent: "space-between", fontWeight: "bolder" }}
      >
        <Card>
          <Card.Content
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button
              buttonColor="#ff3162"
              textColor="white"
              //onPress={() => checkPermission}
            >
              Download
            </Button>
          </Card.Content>
        </Card>
      </SafeAreaView>
    </>
  );
};

export default PurchasedCardDetailsPages;
