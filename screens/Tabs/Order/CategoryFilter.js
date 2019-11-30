import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import { categorySaver } from "../../../redux/actions/orderActions";
import { withNavigation } from "react-navigation";
import SelectPicker from "../../../components/Pickers/SelectPicker";
import constants from "../../../constants";

const Container = styled.View`
  justify-content: flex-start;
  align-items: center;
  flex: 1;
`;
const Text = styled.Text``;
const CategoryFilter = props => {
  return (
    <Container>
      {constants.orderCategory.map((category, i) => (
        <SelectPicker
          key={i}
          text={category}
          onPress={() => {
            props.reduxCategory(category);
            props.navigation.goBack(null);
          }}
          isSelected={props.category === category}
        />
      ))}
    </Container>
  );
};

const mapStateToProps = state => {
  // Redux Store --> Component
  return {
    category: state.orderReducer.category
  };
};

const mapDispatchToProps = dispatch => {
  // Action
  return {
    reduxCategory: category => dispatch(categorySaver(category))
  };
};

export default withNavigation(
  connect(mapStateToProps, mapDispatchToProps)(CategoryFilter)
);
