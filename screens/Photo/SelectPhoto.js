import React, { useState, useEffect } from "react";
import {
  Image,
  ScrollView,
  TouchableOpacity,
  AsyncStorage,
  Alert
} from "react-native";
import styled from "styled-components";
import * as Permissions from "expo-permissions";
import * as MediaLibrary from "expo-media-library";
import Loader from "../../components/Loader";
import constants from "../../constants";
import styles from "../../styles";
import { connect } from "react-redux";

import { imagesSaver } from "../../redux/actions/orderActions";
import { serverApi } from "../../components/API";
import { StackActions, NavigationActions } from "react-navigation";
import { avatarSaver } from "../../redux/actions/avatarActions";
const View = styled.View`
  flex: 1;
`;

const Button = styled.TouchableOpacity`
  width: 100px;
  height: 30px;
  position: absolute;
  right: 10px;
  top: 15px;
  background-color: ${styles.mainColor};
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  /* border: solid 1px; */
  /* border-color: ${styles.mainColor}; */
`;

const Text = styled.Text`
  color: white;
  font-weight: 600;
`;

const SelectPhoto = props => {
  console.log(`셀렉트포토 param: `, props.navigation.getParam("userAvatar"));
  const [loading, setLoading] = useState(true);
  const [hasPermission, setHasPermission] = useState(false);
  const [selected, setSelected] = useState();
  const [allPhotos, setAllPhotos] = useState();
  const changeSelected = photo => {
    setSelected(photo);
  };
  const getPhotos = async () => {
    try {
      const { assets } = await MediaLibrary.getAssetsAsync();
      const [firstPhoto] = assets;
      setSelected(firstPhoto);
      setAllPhotos(assets);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };
  const askPermission = async () => {
    try {
      setLoading(true);
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      // console.log(status);
      if (status === "granted") {
        setHasPermission(true);
        getPhotos();
      }
    } catch (e) {
      console.log(`Permission of camera-roll is denied. Error: ${e}`);
      setHasPermission(false);
    }
  };
  const handleSelected = async () => {
    try {
      // console.log(`getParam: `,// setLoading(true);``
      if (props.navigation.getParam("userAvatar")) {
        const userToken = await AsyncStorage.getItem("userToken");
        const request = await serverApi.uploadimage(userToken, selected.uri);
        console.log(`request: `, request);
        props.reduxAvatar(selected.uri);
        props.navigation.navigate("Mypage");
        if (!request.ok) {
          Alert.alert(`프로필 이미지 변경에 실패 했습니다. 다시 시도해주세요`);
        }
      } else {
        props.reduxImages([selected]);
        props.navigation.goBack(null);
      }
    } catch (e) {
      console.log(`Can't put user's profile image on server. Error: ${e}`);
    } finally {
      // setLoading(false);
    }
  };

  useEffect(() => {
    askPermission();
  }, []);

  return (
    <View>
      {loading ? (
        <Loader />
      ) : (
        <View>
          {hasPermission ? (
            <>
              <Image
                style={{
                  width: constants.width,
                  height: constants.height / 2
                }}
                source={{ uri: selected.uri }}
              />
              <Button onPress={handleSelected}>
                <Text>사진 선택</Text>
              </Button>
              <ScrollView
                contentContainerStyle={{
                  flexDirection: "row",
                  flexWrap: "wrap"
                }}
              >
                {allPhotos.map(photo => (
                  <TouchableOpacity
                    key={photo.id}
                    onPress={() => changeSelected(photo)}
                  >
                    <Image
                      source={{ uri: photo.uri }}
                      style={{
                        opacity: photo.id === selected.id ? 0.5 : 1,
                        width: constants.width / 3,
                        height: constants.height / 6
                      }}
                    />
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </>
          ) : (
            "Oops"
          )}
        </View>
      )}
      {/* </Row>
            <Row>
              <GhostButton text="다른사진 고르기" onPress={selectPicture} />
            </Row>
            <Row>
              <MainButton onPress={handleSubmit} text="제출하기" />
            </Row>
          </Col>
        ) : (
          <Col>
            <Row>
              <GhostButton text="사진 고르기" onPress={selectPicture} />
            </Row>
            <Row>
              <MainButton onPress={handleSubmit} text="넘어가기" />
            </Row>
          </Col>
        )}
      </Grid> */}
    </View>
  );
};

const mapStateToProps = state => {
  // Redux Store --> Component
  return {
    images: state.orderReducer.images
  };
};

const mapDispatchToProps = dispatch => {
  // Action
  return {
    reduxImages: images => dispatch(imagesSaver(images)),
    reduxAvatar: image => dispatch(avatarSaver(image))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SelectPhoto);
// import {
//   Picker,
//   Image,
//   TouchableWithoutFeedback,
//   Keyboard,
//   Alert,
//   SafeAreaView,
//   AsyncStorage,
//   StyleSheet,
//   TouchableOpacity
// } from "react-native";
// import MainButton from "../../components/Buttons/MainButton";
// import GhostButton from "../../components/Buttons/GhostButton";
// import { Container, Form, Item, Header, Button, Title } from "native-base";
// import * as ImagePicker from "expo-image-picker";
// import Constants from "expo-constants";
// import { setApiKey } from "expo-location";
// import { serverApi } from "../../components/API";
// import { Col, Row, Grid } from "react-native-easy-grid";
// import { UniList } from "../../components/unilist";
// const View = styled.View`
//   justify-content: center;
//   align-items: center;
//   flex: 1;
// `;

// const Text = styled.Text``;

// const SelectPhoto = props => {
//   const [CameraPermission, setCameraPermission] = useState(false);
//   const [Loading, setLoading] = useState(false);

//   const [Imageadded, setImageadded] = useState(undefined);

//   const selectPicture = async () => {
//     const { status } = await Permissions.askAsync(
//       Permissions.CAMERA_ROLL,
//       Permissions.CAMERA
//     );
//     console.log("상태", status);
//     console.log(ImagePicker);
//     setCameraPermission(status === "granted");
//     try {
//       setLoading(true);
//       let result = await ImagePicker.launchImageLibraryAsync({
//         mediaTypes: ImagePicker.MediaTypeOptions.All,
//         allowsEditing: true,
//         aspect: [4, 3],
//         quality: 1
//       });
//       console.log("상태dfsd", result.uri);
//       if (!result.cancelled) {
//         setImageadded(result.uri);
//       }
//     } catch (e) {
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSubmit = async () => {
//     try {
//       if (Imageadded) {
//         let usertoken = await AsyncStorage.getItem("userToken");

//         //console.log("토큰이다", usertoken);
//         //console.log("사진업로드", Imageadded);

//         setLoading(true);
//         let result = await serverApi.uploadimage(usertoken, Imageadded);
//         console.log("이미지업로드", result);

//         if (result.ok) {
//           Alert.alert("제출이 성공적으로 완료되었습니다");
//           props.navigation.navigate("BottomNavigation");
//         } else {
//           Alert.alert("등록실패");
//         }
//       } else {
//         props.navigation.navigate("BottomNavigation");
//       }
//     } catch (e) {
//       console.log("image uplead error", e);
//     } finally {
//       setLoading(false);
//       console.log("it#sover");
//     }
//   };

//   return (
//     <View>
//       <Text>Select</Text>
//       <Grid>
//         {Imageadded ? (
//           <Col>
//             <Row>
//               <Image
//                 source={{ uri: Imageadded }}
//                 style={{ width: 200, height: 200, marginBottom: 15 }}
//               />
//             </Row>
//             <Row>
//               <GhostButton text="다른사진 고르기" onPress={selectPicture} />
//               <MainButton onPress={handleSubmit} text="제출하기" />
//             </Row>
//           </Col>
//         ) : (
//           <Col>
//             <Row>
//               <GhostButton text="사진 고르기" onPress={selectPicture} />
//             </Row>
//             <Row>
//               <MainButton onPress={handleSubmit} text="넘어가기" />
//             </Row>
//           </Col>
//         )}
//       </Grid>
//     </View>
//   );
// };

// export default SelectPhoto;
