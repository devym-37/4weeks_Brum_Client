import React from "react";

const AddressToLatLng = props => {
  const geoCode = async address => {
    const geo = await Location.geocodeAsync(address);
    return geo;
  };

  const reverseGeocode = async location => {
    const reverseGeo = await Location.reverseGeocodeAsync(location);
    return reverseGeo;
  };

  const recordEvent = async regionChange => {
    // const address = await reverseGeocode(regionChange);
    const geolatlng = await geoCode(props.marker);
    // console.log("address", address[0]);
    console.log("geolatlng[123]", JSON.stringify(geolatlng));
    setRegions(geolatlng);
    // this.props.reduxDepartureAddress(address[0]);
  };
};

export default AddressToLatLng;
