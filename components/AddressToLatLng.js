import { connect } from "react-redux";
import * as Location from "expo-location";
import {
  departurePositionSave,
  arrivalPositionSave
} from "../redux/actions/orderPositionActions";

const AddressToLatLng = async props => {
  const geoCode = async address => {
    const geo = await Location.geocodeAsync(address);
    return geo;
  };
  if (props.arrivalPosition) {
    const geolatlng = await geoCode(props.arrivalPosition);
    this.props.reduxArrivalPosition(geolatlng);
  } else if (props.departurePosition) {
    const geolatlng = await geoCode(props.departurePosition);
    this.props.reduxDeparturePosition(geolatlng);
  }
};

const mapStateToProps = state => {
  // Redux Store --> Component
  return {
    arrivalPosition: state.destinationReducer.arrivalPosition,
    departurePosition: state.orderPositionReducer.departurePosition
  };
};

const mapDispatchToProps = dispatch => {
  // Action
  return {
    // Login
    reduxDeparturePosition: departure =>
      dispatch(departurePositionSave(departure)),
    reduxArrivalPosition: arrival => dispatch(arrivalPositionSave(arrival))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AddressToLatLng);
