import React, { Component } from "react";
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  TouchableOpacity
} from "react-native";

import constants from "../../constants";

const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
  const paddingToBottom = 20;
  return (
    layoutMeasurement.height + contentOffset.y >=
    contentSize.height - paddingToBottom
  );
};

class TermsAndConditions extends Component {
  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.tcContainer}
          onScroll={({ nativeEvent }) => {
            if (isCloseToBottom(nativeEvent)) {
              this.setState({
                accepted: true
              });
            }
          }}
        >
          <Text style={styles.title}>개인정보 취급방침</Text>
          <Text style={styles.tcP}>
            샵가능(이하 "회사")은 이용자의 개인정보를 소중하게 생각하고,
            이용자의 개인정보를 보호하기 위하여 최선의 노력을 다하고 있습니다.
          </Text>
          <Text style={styles.tcP}>
            회사는 "정보통신망 이용촉진 및 정보보호 등에 관한 법률" 상의
            개인정보보호 규정 및 방송통신위원회가 제정한 "개인정보보호지침"을
            준수하고 있습니다.
          </Text>
          <Text style={styles.tcP}>
            회사는 관련 법령에 의거한 개인정보처리방침을 정하여 이용자에게
            본인의 개인정보가 어떠한 용도와 방식으로 이용되며, 개인정보 보호를
            위해 어떠한 조치를 취하는지에 대해 알려 드립니다. 또한 본 방침을
            사이트에 공개하여 이용자가 언제나 쉽게 열람할 수 있도록 하고
            있습니다.
          </Text>
          <Text style={styles.tcP}>
            본 방침은 2019년 12월 1일부터 시행됩니다.
          </Text>
          <Text style={styles.Br}></Text>
          <Text style={styles.tcT}>1. 개인정보의 수집 및 이용목적</Text>
          <Text style={styles.tcL2}>
            회사가 수집한 개인정보는 다음의 목적을 위해 활용됩니다.
          </Text>
          <Text style={styles.tcL3}>1. 회원관리</Text>
          <Text style={styles.tcL4}>
            - 회원제 서비스 이용에 따른 본인확인, 개인식별
          </Text>
          <Text style={styles.tcL4}>
            - 불량회원의 부정이용 방지와 비인가 사용 방지
          </Text>
          <Text style={styles.tcL4}>
            - 가입의사 확인, 가입 및 가입횟수 제한
          </Text>

          <Text style={styles.tcL3}>
            2. 서비스 제공에 관한 계약의 이행 및 서비스 제공에 따른 금액 정산 및
            지급
          </Text>
          <Text style={styles.tcL4}>
            - 이벤트/경품당첨 결과 안내 및 상품배송
          </Text>
          <Text style={styles.tcL4}>- 금융거래 본인 인증 및 금융 서비스</Text>
          <Text style={styles.tcL4}>
            - 서비스 제공에 따른 금액 지급 및 세금 등의 신고
          </Text>

          <Text style={styles.tcL3}>3. 마케팅 및 광고에 활용</Text>
          <Text style={styles.tcL4}>- 신규 서비스(제품) 개발 및 특화</Text>
          <Text style={styles.tcL4}>- 회원에게 최적화된 서비스 제공</Text>
          <Text style={styles.tcL4}>
            - 인구통계학적 특성에 따른 서비스 제공
          </Text>
          <Text style={styles.tcL4}>- 접속 빈도 파악</Text>
          <Text style={styles.tcL4}>- 서비스 이용에 대한 통계</Text>

          <Text style={styles.tcT}>2. 수집하는 개인정보 항목 및 수집방법</Text>
          <Text style={styles.tcL2}>
            회사는 회원가입 시 개인정보수집에 대한 동의를 받고 있습니다.
            개인정보수집과 관련하여 회사의 이용약관과 개인정보수집 및 이용에
            대해 「동의함」 버튼을 클릭할 수 있는 절차를 마련하고 있으며,
            「동의함」 버튼을 클릭하면 개인정보 수집에 대해 동의한 것으로
            봅니다.
          </Text>
          <Text style={styles.tcL2}>
            회사가 수집하는 개인정보는 필수항목과 선택항목으로 구분됩니다.
          </Text>
          <Text style={styles.tcL2}>
            - 인구통계학적 특성에 따른 서비스 제공
          </Text>
          <Text style={styles.tcL2}>- 접속 빈도 파악</Text>
          <Text style={styles.tcL2}>- 서비스 이용에 대한 통계</Text>
        </ScrollView>
      </View>
    );
  }
}

const styles = {
  container: {
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
    padding: 10,
    alignItems: "center",
    justifyContents: "center"
  },
  title: {
    fontSize: 22,
    alignSelf: "center"
  },
  tcP: {
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 4,
    fontSize: 12
  },
  tcP2: {
    marginLeft: 10,
    marginTop: 4,
    fontSize: 12,
    marginBottom: 16
  },
  Br: {
    marginTop: 2,
    fontSize: 12
  },
  tcL: {
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 10,
    fontSize: 12
  },
  tcT: {
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 10,
    fontSize: 13
  },
  tcL2: {
    marginLeft: 10,
    marginTop: 0,
    marginBottom: 10,
    fontSize: 12
  },
  tcL3: {
    marginLeft: 18,
    marginTop: 0,
    marginBottom: 10,
    fontSize: 12
  },
  tcL4: {
    marginLeft: 26,
    marginTop: 0,
    marginBottom: 10,
    fontSize: 12
  },
  tcContainer: {
    marginTop: 15,
    marginBottom: 15,
    height: constants.height * 0.8
  },

  button: {
    backgroundColor: "#136AC7",
    borderRadius: 5,
    padding: 10
  },

  buttonDisabled: {
    backgroundColor: "#999",
    borderRadius: 5,
    padding: 10
  },

  buttonLabel: {
    fontSize: 14,
    color: "#FFF",
    alignSelf: "center"
  }
};

export default TermsAndConditions;
