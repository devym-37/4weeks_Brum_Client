// Initial State

const randomNum = {};
//0~9까지의 난수
randomNum.random = function(n1, n2) {
  return parseInt(Math.random() * (n2 - n1 + 1)) + n1;
};
//인증번호를 뽑을 난수 입력 n 5이면 5자리
randomNum.authNo = function(n) {
  var value = "";
  for (let i = 0; i < n; i++) {
    value += randomNum.random(0, 9);
  }
  return value;
};

const initialState = {
  otp: randomNum.authNo(4)
};

// Reducers (Modifies The State And Returns A New State)
const otpReducer = (state = initialState, action) => {
  switch (action.type) {
    // Create random 4-digits otp
    case "CREATE_OTP": {
      return {
        // State
        ...state,
        // Redux Store
        otp: randomNum.authNo(4)
      };
    }

    case "SAVE_OTP": {
      return {
        // State
        ...state,
        // Redux Store
        otp: action.otp
      };
    }

    // Default
    default: {
      return state;
    }
  }
};

// Exports
export default otpReducer;
