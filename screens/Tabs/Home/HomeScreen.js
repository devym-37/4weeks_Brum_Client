import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  ScrollView,
  Text,
  Platform,
  RefreshControl,
  AsyncStorage,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity
} from "react-native";
import styled from "styled-components";
import AuthModal from "../../Auth/AuthModal";
import { serverApi } from "../../../components/API";
import constants from "../../../constants";
import styles from "../../../styles";
import { Marker } from "react-native-maps";
import MapScreen from "../../../components/MapView";
import ListScreen from "./ListScreen";
import Loader from "../../../components/Loader";
import { CurrentLocationButton } from "../../../components/Buttons/CurrentLocationBtn";
import { MapLocationButton } from "../../../components/Buttons/MapLocationBtn";
import { NavigationEvents } from "react-navigation";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import { connect } from "react-redux";
import { campusSaver } from "../../../redux/actions/campusActions";

const View = styled.View`
  /* background-color: #f1f3f5; */
`;
// const ListScreenContainer = styled.View`
//   align-items: center;
//   background-color: #f1f3f5;
//   flex: 1;
// `;

const Container = styled.View`
  align-items: center;
  margin-top: 12;
`;
const ButtonContainer = styled.View`
  /* width: ${constants.width / 2}; */
  justify-content: center;
  align-content: center;
  height: 30;
  flex-direction: row;
`;

const Touchable = styled.TouchableOpacity``;

const LeftToggleButton = styled.View`
  flex: 1;
  width: 110;
  justify-content: center;
  align-items: center;
  border: 1.2px;
  background-color: ${props => (props.clicked ? styles.mainColor : "#fff")};
  border-color: ${styles.mainColor};
  border-right-width: 0.6px;
  border-bottom-left-radius: 6;
  border-top-left-radius: 6;
`;

const LeftToggleText = styled.Text`
  padding: 3px 0;
  font-size: 13;
  font-weight: ${props => (props.clicked ? 500 : 400)};
  color: ${props => (props.clicked ? "#fff" : styles.mainColor)};
  z-index: 10;
`;

const RightToggleButton = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  width: 110;
  border: 1.2px;
  background-color: ${props => (props.clicked ? styles.mainColor : "#fff")};
  border-color: ${styles.mainColor};
  border-left-width: 0.6px;
  border-bottom-right-radius: 6;
  border-top-right-radius: 6;
  z-index: 8;
`;

const RightToggleText = styled.Text`
  padding: 3px 0;
  font-weight: ${props => (props.clicked ? 500 : 400)};
  color: ${props => (props.clicked ? "#fff" : styles.mainColor)};
  font-size: 13;
`;
const HomeScreen = ({ navigation, ...props }) => {
  // console.log(`Home Nav: `, navigation.getParam("campus"));
  const [leftClicked, setLeftClicked] = useState(false);
  const [rightClicked, setRightClicked] = useState(true);
  const [region, setRegion] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isopenLoginModal, setIsopenLoginModal] = useState(false);
  const [campus, setCampus] = useState();

  const getDefaultCampusMap = () => {
    const campusRegion = constants.campus[props.campus].position;
    console.log("campusRegion :", campusRegion);
    const _region = {
      latitude: campusRegion.latitude,
      longitude: campusRegion.longitude,
      latitudeDelta: constants.LATITUDE_DELTA,
      longitudeDelta: constants.LONGITUDE_DELTA
    };
    setRegion(_region);
    this.map.animateToRegion(_region);
  };

  const geoCode = async address => {
    const geo = await Location.geocodeAsync(address);
    return geo;
  };

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(position => {
      let currentLat = parseFloat(position.coords.latitude);
      let currentLng = parseFloat(position.coords.longitude);

      let currentRegion = {
        latitude: currentLat,
        longitude: currentLng
      };
      setCurrentLocation({ ...currentRegion });
    });
  };

  const userCurrentLocation = props => {
    const {
      latitude = constants.LATITUDE,
      longitude = constants.LONGITUDE
    } = currentLocation;

    const _userRegion = {
      latitude: latitude,
      longitude: longitude,
      latitudeDelta: constants.LATITUDE_DELTA,
      longitudeDelta: constants.LONGITUDE_DELTA
    };

    this.map.animateToRegion(_userRegion);
  };

  const preLoad = async () => {
    try {
      setLoading(true);
      const loggedIn = await AsyncStorage.getItem("userToken");
      if (!loggedIn) {
        setIsopenLoginModal(true);
      }

      // const selectedCampus = await AsyncStorage.getItem("campus");
      const selectedCampus = props.campus ? props.campus : "hanyang";
      let getCampusOrders = await serverApi.getCampusOrders(selectedCampus);
      // let filteredOrders = getCampusOrders.data.data.orders ? getCampusOrders.data.data.orders.filter(obj=>obj.orderStatus === 0)
      setOrders([...getCampusOrders.data.data.orders]);
      console.log(
        "getCampusOrders.data.data.orders",
        getCampusOrders.data.data.orders
      );
      getDefaultCampusMap(selectedCampus);
      getLocation();
    } catch (e) {
      console.log(`Can't fetch data from server. error message: ${e}`);
    } finally {
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   preLoad();
  // }, []);

  useEffect(() => {
    (async () => {
      await preLoad();
    })();
  }, [props.campus]);

  // position: { latitude: 37.55737, longitude: 127.047132 }
  return (
    <>
      {isopenLoginModal && <AuthModal />}
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View>
          {loading ? (
            <Loader />
          ) : (
            <>
              {/* <NavigationEvents onDidFocus={() => Alert.alert("Refreshed")} /> */}
              {leftClicked && region && (
                <>
                  <MapLocationButton
                    callback={() => {
                      getDefaultCampusMap();
                    }}
                  />
                  <CurrentLocationButton
                    callback={() => {
                      userCurrentLocation();
                    }}
                  />
                  <MapScreen
                    latitude={region.latitude}
                    longitude={region.longitude}
                    orders={orders}
                    HomeScreen={true}
                    showLocation={false}
                  ></MapScreen>
                </>
              )}
              <Container>
                <ButtonContainer>
                  <Touchable
                    onPress={() => {
                      setLeftClicked(!leftClicked);
                      setRightClicked(leftClicked);
                    }}
                  >
                    <LeftToggleButton clicked={leftClicked}>
                      <LeftToggleText clicked={leftClicked}>
                        {"지도로 보기"}
                      </LeftToggleText>
                    </LeftToggleButton>
                  </Touchable>
                  <Touchable
                    onPress={() => {
                      setRightClicked(!rightClicked);
                      setLeftClicked(rightClicked);
                    }}
                  >
                    <RightToggleButton clicked={rightClicked}>
                      <RightToggleText clicked={rightClicked}>
                        {"리스트로 보기"}
                      </RightToggleText>
                    </RightToggleButton>
                  </Touchable>
                </ButtonContainer>
              </Container>
              {rightClicked && orders && <ListScreen orders={orders} />}
            </>
          )}
        </View>
      </TouchableWithoutFeedback>
    </>
  );
};

const mapStateToProps = state => {
  // Redux Store --> Component
  return {
    campus: state.campusReducer.campus,
    arrivalLocation: state.orderPositionReducer.arrival
  };
};

const mapDispatchToProps = dispatch => {
  // Action
  return {
    reduxCampus: campus => dispatch(campusSaver(campus))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
