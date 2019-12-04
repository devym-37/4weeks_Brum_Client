import React from "react";
import styled from "styled-components";
import { withNavigation } from "react-navigation";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { connect } from "react-redux";
import {
  arrivalPositionSave,
  departurePositionSave
} from "../../redux/actions/orderPositionActions";
import {
  departureLocationSave,
  arrivalLocationSave
} from "../../redux/actions/destinationAction";

import {
  categorySaver,
  isPriceSaver,
  priceSaver,
  timeSaver,
  titleSaver,
  detailsSaver,
  photoRemover,
  imagesSaver
} from "../../redux/actions/orderActions";

const Container = styled.TouchableOpacity``;

const Text = styled.Text`
  color: #989ea5;
  font-size: 17;
  padding-left: 15;
`;

const CloseOrderLink = ({ navigation, ...props }) => {
  const handleClose = () => {
    props.reduxPrice(null);
    props.reduxIsPrice(null);
    props.reduxCategory(null);
    props.reduxDetails(null);
    props.reduxTitle(null);
    props.reduxTime(null);
    props.reduxDepartureLocation(null);
    props.reduxArrivalLocation(null);
    props.reduxArrivalPosition(null);
    props.reduxDeparturePosition(null);
    navigation.goBack(null);
  };

  return (
    <>
      <Container onPress={handleClose}>
        <Text>닫기</Text>
      </Container>
    </>
  );
};

const mapDispatchToProps = dispatch => {
  // Action
  return {
    // Login
    reduxDeleteImages: () => dispatch(photoRemover()),
    reduxLogin: trueFalse => dispatch(login(trueFalse)),
    reduxTitle: title => dispatch(titleSaver(title)),
    reduxTime: time => dispatch(timeSaver(time)),
    reduxPrice: price => dispatch(priceSaver(price)),
    reduxIsPrice: isPrice => dispatch(isPriceSaver(isPrice)),
    reduxChecked: () => dispatch(isPriceSaver()),
    reduxDetails: message => dispatch(detailsSaver(message)),
    reduxCategory: category => dispatch(categorySaver(category)),
    reduxImages: images => dispatch(imagesSaver(images)),
    reduxArrivalLocation: arrival => dispatch(arrivalLocationSave(arrival)),
    reduxDepartureLocation: departureLocation =>
      dispatch(departureLocationSave(departureLocation)),
    reduxArrivalPosition: arrival => dispatch(arrivalPositionSave(arrival)),
    reduxDeparturePosition: departurePosition =>
      dispatch(departurePositionSave(departurePosition))
  };
};

export default withNavigation(
  connect(null, mapDispatchToProps)(CloseOrderLink)
);
