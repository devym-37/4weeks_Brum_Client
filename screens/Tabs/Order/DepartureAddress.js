import React, { Component, useState, useEffect } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableHighlight,
  Keyboard,
  Content,
  Card,
  Image,
  CardItem,
  Left,
  Body,
  ScrollView
} from "react-native";
import MapView from "react-native-maps";
import { API } from "../../../APIS";
import _ from "lodash";
import constants from "../../../constants";
import { withNavigation } from "react-navigation";
import { Container } from "native-base";
import { connect } from "react-redux";
import { departureLocationSave } from "../../../redux/actions/destinationAction";
import { departurePositionSave } from "../../../redux/actions/orderPositionActions";
import * as Location from "expo-location";

//Show map... select location to go to
//Get location route with Google Location API
//Send driver request
//Wait for driver to arrive
//Get picked up by driver
//Let driver drive to location

const styles = StyleSheet.create({
  destinationInput: {
    fontSize: 20,
    height: 40,
    width: constants.width - 100,
    marginTop: 20,
    marginLeft: 20,
    marginRight: 10,
    marginBottom: 10,
    padding: 5,
    paddingBottom: 5,
    backgroundColor: "white"
  },
  locationSuggestion: {
    backgroundColor: "white",
    padding: 5,
    fontSize: 18
  },
  container: {
    // ...StyleSheet.absoluteFillObject,
    flex: 1
  },
  containers: {
    // position: '',
    height: 68,
    width: constants.width - 50,
    borderRadius: 10,
    backgroundColor: "white",
    shadowColor: "#000000",
    elevation: 7,
    shadowRadius: 5,
    shadowOpacity: 0.2
  }
});

const LATITUDE = 37.565687;
const LONGITUDE = 126.978045;

class OrderDepartureAddress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: "",
      latitude: 0,
      longitude: 0,
      locationPredictions: [],
      geoDeparture: [],
      currentLocation: null,
      isFocused: false
    };
    this.onChangeDestinationDebounced = _.debounce(
      this.onChangeDestination,
      400
    );
  }

  handleFocus = event => {
    this.setState({ isFocused: true });
    if (this.props.onFocus) {
      this.props.onFocus(event);
    }
  };

  handleBlur = event => {
    this.setState({ isFocused: false });
    if (this.props.onBlur) {
      this.props.onBlur(event);
    }
  };

  async onChangeDestination(destination) {
    this.setState({ destination });
    const apiUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${API}&input={${destination}}&location=${this.state.latitude},${this.state.longitude}&radius=2000`;
    const result = await fetch(apiUrl);
    const jsonResult = await result.json();
    this.setState({
      locationPredictions: jsonResult.predictions
    });
    console.log("jsonResult", jsonResult);
  }

  pressedPrediction(prediction) {
    // console.log("prediction [3] :", prediction);
    this.props.reduxDepartureLocation(prediction);
    // console.log("OderAddress Test : ", this.props.orderDestination);
    Keyboard.dismiss();
    this.setState({
      locationPredictions: [],
      destination: prediction
    });
    Keyboard;
  }

  async geoDestination(placeId) {
    this.setState({ placeId });
    const apiUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,rating,formatted_phone_number,geometry&key=${API}`;
    const result = await fetch(apiUrl);
    const jsonResult = await result.json();
    this.setState({
      geoDeparture: jsonResult
    });
    console.log("place_id test result", jsonResult.result.geometry.location);
    this.props.reduxDeparturePosition({
      ...jsonResult.result.geometry.location
    });
  }

  render() {
    const { isFocused } = this.state;
    const locationPredictions = this.state.locationPredictions.map(
      prediction => (
        <View
          key={prediction.id}
          style={{
            alignContent: "center",
            alignItems: "center",
            backgroundColor: "white",
            flex: 1,
            justifyContent: "space-between"
          }}
        >
          <TouchableHighlight
            style={styles.containers}
            onPress={() => {
              this.pressedPrediction(
                prediction.structured_formatting.main_text
              );
              this.props.reduxDepartureLocation(
                prediction.structured_formatting.main_text
              );
              this.geoDestination(prediction.place_id);
              // this.moveToMarkerPosition();
              this.props.navigation.goBack(null);
            }}
            key={prediction.id}
          >
            <React.Fragment>
              <View style={{ marginLeft: 10, flexDirection: "row" }}>
                <Image
                  source={require("../../../assets/Delivery_departure.png")}
                  style={{
                    height: 30,
                    width: 30,
                    marginTop: 3,
                    marginLeft: 5,
                    backgroundColor: "white",
                    flexDirection: "row"
                  }}
                />
                <Text
                  style={{
                    marginTop: 10,
                    marginLeft: 10,
                    fontSize: 16,
                    backgroundColor: "white"
                  }}
                >
                  {prediction.structured_formatting.main_text}
                </Text>
              </View>
              <Text
                note
                style={{
                  marginLeft: 20,
                  padding: 1,
                  backgroundColor: "white"
                }}
              >
                상세주소 : {prediction.description.substring(5)}
              </Text>
            </React.Fragment>
          </TouchableHighlight>
        </View>
      )
    );
    return (
      <Container style={styles.container}>
        <TextInput
          placeholder="주소 검색"
          style={styles.destinationInput}
          selectionColor={"#F13564"}
          underlineColorAndroid={isFocused ? "#F13564" : "#D3D3D3"}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          onChangeText={destination => {
            this.setState({ destination });
            this.onChangeDestinationDebounced(destination);
          }}
          value={this.state.destination}
        />
        {locationPredictions}
        <View style={{ height: 40, flex: 1 }}></View>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  // Redux Store --> Component
  return {
    departureLocation: state.destinationReducer.departureLocation
  };
};

const mapDispatchToProps = dispatch => {
  // Action
  return {
    // Login
    reduxDepartureLocation: departureLocation =>
      dispatch(departureLocationSave(departureLocation)),
    reduxDeparturePosition: departurePosition =>
      dispatch(departurePositionSave(departurePosition))
  };
};
export default withNavigation(
  connect(mapStateToProps, mapDispatchToProps)(OrderDepartureAddress)
);
