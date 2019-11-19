import React, { useState } from "react";
import styled from "styled-components";
import { TouchableWithoutFeedback, Keyboard, Alert } from "react-native";
import AuthInput from "../../components/Inputs/AuthInput";
import useInput from "../../hooks/useInput";
import MainButton from "../../components/Buttons/MainButton";
import GhostButton from  "../../components/Buttons/GhostButton"
import { connect } from "react-redux";
import { login } from "../../redux/actions/authActions";

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const Text = styled.Text``;

const  ResetPw = (props) => {
    const pwInput1 = useInput("");
    const pwInput2 = useInput("");
  const [loading, setLoading] = useState(false);
 const handlePw = ()=>{
    const  value1  = pwInput1.value;
    const  value2  = pwInput2.value;

    if (value1 === "" || value2 === "") {
  
        return Alert.alert("비밀번호를 입력해주세요");
      } 

    else if(value1!==value2){

        Alert.alert(
            '비밀번호 오류',
            '비밀번호를 정확하게 입력해 주세요',
            [
              
              {text: 'OK', onPress: () => console.log('OK Pressed')},
            ],
            {cancelable: false},
          );
          
    }
    else{
       /*  try{

        }
        catch(error){

        } */
        Alert.alert(
            '성공',
            '비밀번호가 성공적으로 변경되었습니다',
            [
              
              {text: 'OK', onPress: () => console.log('OK Pressed')},
            ],
            {cancelable: false},
          );
          props.reduxLogin(false)
          props.navigation.navigate("StartHome")
    }
    
 }
  return (
<View>
        <AuthInput
        {...pwInput1}
          placeholder="비밀번호입력"
          keyboardType="default"
          returnKeyType="send"

        />
        <AuthInput
        {...pwInput2}
          placeholder="비밀번호재입력"
          keyboardType="default"
          returnKeyType="send"
        />
        <MainButton
          onPress={handlePw}
          text="비밀번호 재설정"
        />
  </View>
  )
  
};
const mapStateToProps = state => {
    // Redux Store --> Component
    return {
      loggedIn: state.authReducer.loggedIn
    };
  };
  
  const mapDispatchToProps = dispatch => {
    // Action
    return {
      
      // Login
      reduxLogin: trueFalse => dispatch(login(trueFalse))
    };
  };
  export default connect(mapStateToProps, mapDispatchToProps)(ResetPw)