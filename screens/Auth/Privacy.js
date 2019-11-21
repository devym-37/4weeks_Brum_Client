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
          <Text style={styles.tcL3}>1. 수집항목</Text>
          <Text style={styles.tcL4}>
            ① 회사는 회원가입, 고객상담, 서비스 제공을 위하여 다음과 같이 필요한
            최소한의 개인정보만을 수집합니다.
          </Text>
          <Text style={styles.tcL4}>{"<회원가입 시>"}</Text>
          <Text style={styles.tcL4}>
            - 필수항목 : 아이디, 비밀번호, 생년월일, 휴대전화번호, 이메일주소
          </Text>
          <Text style={styles.tcL4}>
            ② 회사는 고객상담 시, 원활한 민원 처리를 위하여 상담자에 한해 별도
            개인정보 추가 수집 동의를 받고 아래의 정보를 수집할 수 있습니다.
            해당 정보는 상담 접수일로부터 3년 동안 저장됩니다.
          </Text>
          <Text style={styles.tcL4}>- 성명, 연락처, 이메일</Text>
          <Text style={styles.tcL4}>
            ③ 이벤트 당첨 시, 상품을 지급하는 과정에서 해당 이용자에 한해서만
            별도 개인정보 추가 수집 동의를 받고 아래의 정보들이 수집될 수
            있습니다. 또한, 해당 정보는 이용목적이 달성되는 즉시 파기됩니다.
          </Text>
          <Text style={styles.tcL4}>
            - 주소, 휴대전화번호, 은행 계좌번호, 주민등록번호(관계 법령이 허용한
            경우)
          </Text>
          <Text style={styles.tcL4}>
            ④ 서비스 이용과정이나 사업처리 과정에서 다음과 같은 정보들이
            자동으로 생성되어 수집될 수 있습니다.
          </Text>
          <Text style={styles.tcL4}>
            - 접속 IP정보, 쿠키, 방문 일시, 서비스 이용 기록, 불량 이용 기록
          </Text>
          <Text style={styles.tcL4}>
            ⑤ 중기통앱, 이용 시, 이용자에게 동의를 받고 해당 기기 정보를 수집할
            수 있습니다.
          </Text>
          <Text style={styles.tcL4}>- 사용 OS의 종류, 버전, 기기의 고유값</Text>
          <Text style={styles.tcL4}>
            ⑥ 서비스 이용 과정 중 관계 법령 준수를 위해 본인인증이 필요할 경우,
            추가 수집 동의를 받고 아래의 정보들이 수집될 수 있습니다.
          </Text>
          <Text style={styles.tcL4}>
            - 이름, 전화번호, 생년월일, 중복가입확인정보(DI)
          </Text>

          <Text style={styles.tcL3}>2. 수집방법</Text>
          <Text style={styles.tcL4}>
            회사는 다음과 같은 방법으로 개인정보를 수집하고 해당 목적을 달성하기
            위해서만 사용합니다.
          </Text>
          <Text style={styles.tcL4}>
            - 홈페이지를 통한 회원가입, 회원정보 수정, 서비스에 따른 회원정보
            추가 기입 및 수정, 서비스 이용, 이벤트 응모, 배송 요청, 팩스, 전화,
            고객센터 문의, 생성정보 수집 툴을 통한 수집
          </Text>

          <Text style={styles.tcT}>3. 개인정보의 보유 및 이용기간</Text>
          <Text style={styles.tcL2}>
            회사는 원칙적으로 개인정보 수집 및 이용목적이 달성된 후에는 해당
            정보를 지체 없이 파기합니다. 단, 다음의 정보에 대해서는 아래의
            이유로 명시한 기간 동안 보존합니다.
          </Text>

          <Text style={styles.tcL3}>
            1. 회사 내부방침에 의한 정보보유 및 기간
          </Text>
          <Text style={styles.tcL4}>
            - 보존항목 : 성명, 아이디, 이메일주소, 휴대 전화번호, 성별,
            생년월일, 중복가입확인정보(DI)
          </Text>
          <Text style={styles.tcL5}>
            보존근거 : 전자상거래 등에서의 소비자보호에 관한 법률
          </Text>
          <Text style={styles.tcL5}>보존기간 : 5년</Text>
          <Text style={styles.tcL3}>2. 관련법령에 의한 정보보유 및 기간</Text>
          <Text style={styles.tcL4}>
            회사는 다음과 같은 방법으로 개인정보를 수집하고 해당 목적을 달성하기
            위해서만 사용합니다.
          </Text>
          <Text style={styles.tcL4}>
            - 보존항목 : 계약 또는 청약철회 등에 관한 기록
          </Text>
          <Text style={styles.tcL5}>
            보존근거 : 전자상거래 등에서의 소비자보호에 관한 법률
          </Text>
          <Text style={styles.tcL5}>보존기간 : 5년</Text>

          <Text style={styles.tcL4}>
            - 보존항목 : 대금결제 및 재화 등의 공급에 관한 기록
          </Text>
          <Text style={styles.tcL5}>
            보존근거 : 전자상거래 등에서의 소비자보호에 관한 법률
          </Text>
          <Text style={styles.tcL5}>보존기간 : 5년</Text>

          <Text style={styles.tcL4}>
            - 보존항목 : 소비자 불만 또는 분쟁처리에 관한 기록
          </Text>
          <Text style={styles.tcL5}>
            보존근거 : 전자상거래 등에서의 소비자보호에 관한 법률
          </Text>
          <Text style={styles.tcL5}>보존기간 : 3년</Text>

          <Text style={styles.tcL4}>- 보존항목 : 본인확인에 관한 기록</Text>
          <Text style={styles.tcL5}>
            보존근거 : 정보통신망 이용촉진 및 정보보호 등에 관한 법률
          </Text>
          <Text style={styles.tcL5}>보존기간 : 6개월</Text>

          <Text style={styles.tcL4}>
            - 보존항목 : 서비스 이용기록, 접속 로그, 접속 IP정보
          </Text>
          <Text style={styles.tcL5}>보존근거 : 통신비밀보호법</Text>
          <Text style={styles.tcL5}>보존기간 : 3개월</Text>

          <Text style={styles.tcL4}>
            - 보존항목 : 세법이 규정하는 모든 거래에 관한 장부 및 증빙서류
          </Text>
          <Text style={styles.tcL5}>
            보존근거 : 국세기본법, 법인세법, 소득세법 등
          </Text>
          <Text style={styles.tcL5}>보존기간 : 5년</Text>

          <Text style={styles.tcT}>4. 개인정보의 파기절차 및 방법</Text>
          <Text style={styles.tcL2}>
            회사는 원칙적으로 개인정보 수집 및 이용목적이 달성되거나, 보유 및
            이용기간이 경과된 후에는 해당 정보를 지체 없이 파기합니다.
          </Text>
          <Text style={styles.tcL2}>파기절차 및 방법은 다음과 같습니다.</Text>
          <Text style={styles.tcL3}>1. 파기절차</Text>
          <Text style={styles.tcL4}>
            ① 이용자가 회원가입 등을 위해 입력한 정보는 수집 및 이용목적이
            달성된 후 별도의 DB로 옮겨져(종이의 경우 별도의 서류함) 내부 방침 및
            기타 관련 법령에 의한 정보보호 사유(보유 및 이용기간 참조)에 따라
            일정 기간 저장된 후 파기됩니다.
          </Text>
          <Text style={styles.tcL4}>
            ② 동 개인정보는 법률에 의한 경우가 아니고서는 보유되는 이외의 다른
            목적으로 이용되지 않습니다.
          </Text>
          <Text style={styles.tcL3}>2. 파기방법</Text>
          <Text style={styles.tcL4}>
            ① DB 등 전자적 파일 형태로 저장된 개인정보 : 재생할 수 없는 기술적
            방법으로 삭제
          </Text>
          <Text style={styles.tcL4}>
            ② 종이(서면)에 작성·출력된 개인정보 : 분쇄하거나 소각 등의 방법으로
            파기
          </Text>
          <Text style={styles.tcL3}>
            한편, 회사는 1년 동안 서비스를 이용하지 않는 사용자의 정보를 별도로
            분리 보관합니다.
          </Text>

          <Text style={styles.tcT}>5. 개인정보의 공유 및 제공</Text>
          <Text style={styles.tcL2}>
            회사는 이용자들의 개인정보를 "1. 개인정보의 수집 및 이용목적"에서
            고지한 범위 내에서 이용합니다. 단, 다음의 경우에는 주의를 기울여
            개인정보를 이용 및 제공할 수 있습니다.
          </Text>
          <Text style={styles.tcL3}>
            ① 통신판매중개의뢰자의 서비스를 이용하거나, 이벤트 응모와 같이
            회사에서 진행하는 프로모션에 참여하기 위해 이용자들이 사전에 동의한
            경우
          </Text>
          <Text style={styles.tcL3}>
            ② 법령의 규정에 의거하거나, 수사 목적으로 법령에 정해진 절차와
            방법에 따라 수사기관의 요구가 있는 경우
          </Text>

          <Text style={styles.tcT}>
            6. 이용자 및 법정대리인의 권리와 그 행사방법
          </Text>
          <Text style={styles.tcL3}>
            ① 이용자의 개인정보 조회/수정을 위해서는 '개인정보변경'(또는
            '회원정보수정' 등)을, 가입해지(동의철회)를 위해서는 "’회원탈퇴’"를
            클릭하여 본인 확인 절차를 거치신 후 직접 열람, 정정 또는 탈퇴가
            가능합니다. 혹은 개인정보보호책임자에게 서면, 전화 또는 이메일로
            연락하시면 지체 없이 조치하겠습니다.
          </Text>
          <Text style={styles.tcL3}>
            ② 이용자의 개인정보의 오류에 대한 정정을 요청한 경우에는 정정을
            완료하기 전까지 당해 개인정보를 이용 또는 제공하지 않습니다. 또한
            잘못된 개인정보를 제3자에게 이미 제공한 경우에는 정정 처리결과를
            제3자에게 지체 없이 통지하여 정정이 이루어지도록 하겠습니다.
          </Text>
          <Text style={styles.tcL3}>
            ③ 회사는 이용자 혹은 법정 대리인의 요청에 의해 해지 또는 삭제된
            개인정보는 "3. 개인정보의 보유 및 이용기간"에 명시된 바에 따라
            처리하고 그 외의 용도로 열람 또는 이용할 수 없도록 처리하고
            있습니다.
          </Text>

          <Text style={styles.tcT}>
            7. 개인정보 자동 수집 장치의 설치·운영 및 거부에 관한 사항
          </Text>
          <Text style={styles.tcL2}>
            회사는 이용자에게 특화된 맞춤서비스를 제공하기 위해서 이용자의
            정보를 수시로 저장하고 불러오는 '쿠키(cookie)'를 사용합니다. 쿠키는
            웹사이트를 운영하는데 이용되는 서버가 이용자의 브라우저에게 보내는
            아주 작은 텍스트 파일로 이용자 컴퓨터의 하드디스크에 저장됩니다.
          </Text>
          <Text style={styles.tcL3}>- 쿠키의 사용 목적</Text>
          <Text style={styles.tcL4}>
            ① 회원과 비회원의 접속빈도나 방문시간 등의 분석
          </Text>
          <Text style={styles.tcL4}>
            ② 이용자의 취향과 관심분야 파악 및 자취 추적
          </Text>
          <Text style={styles.tcL4}>
            ③ 각종 이벤트 참여 정도 및 방문횟수 파악 등을 통한 타겟마케팅
          </Text>
          <Text style={styles.tcL4}>④ 개인 맞춤서비스 제공</Text>

          <Text style={styles.tcL3}>
            - 이용자는 쿠키 설치에 대한 선택권을 가지고 있습니다. 따라서
            이용자는 웹브라우저에서 옵션을 설정함으로써 쿠키에 의한 정보수집
            수준을 조정할 수 있습니다.
          </Text>
          <Text style={styles.tcL4}>
            ① 인터넷 익스플로러의 경우, 웹브라우저의
            [도구]>[인터넷옵션]>[개인정보]>[설정]에서 쿠키에 의한 정보수집
            수준을 조정할 수 있습니다.
          </Text>
          <Text style={styles.tcL4}>
            ② 쿠키에 의한 정보수집 수준 조정을 통해 모든 쿠키를 허용하거나,
            쿠키가 저장될 때마다 확인을 하거나, 아니면 모든 쿠키의 저장을 거부할
            수도 있습니다.
          </Text>
          <Text style={styles.tcL4}>
            ③ 단, 이용자가 쿠키 설치를 거부할 경우 로그인이 필요한 일부 서비스
            이용에 어려움이 있을 수 있습니다.
          </Text>

          <Text style={styles.tcT}>
            8. 개인정보보호를 위한 기술적·관리적 대책
          </Text>
          <Text style={styles.tcL2}>
            회사는 이용자의 개인정보를 처리함에 있어 개인정보가 분실, 도난,
            유출, 변조 또는 훼손되지 않도록 안정성 확보를 위하여 다음과 같은
            기술적· 관리적 대책을 강구하고 있습니다.
          </Text>
          <Text style={styles.tcL3}>- 기술적 보호 대책</Text>
          <Text style={styles.tcL4}>
            ① 이용자의 개인정보는 비밀번호에 의해 보호되며, 중요한 데이터는 파일
            및 전송 데이터를 암호화하거나 파일 잠금기능을 사용하는 등 별도
            보안기능을 통해 보호되고 있습니다.
          </Text>
          <Text style={styles.tcL4}>
            ② 백신 프로그램을 이용하여 컴퓨터바이러스에 의한 피해를 방지하기
            위한 조치를 취하고 있습니다. 백신프로그램은 주기적으로 업데이트되며
            갑작스런 바이러스가 출현할 경우 백신이 나오는 즉시 이를 적용함으로써
            개인정보가 침해되는 것을 방지하고 있습니다.
          </Text>
          <Text style={styles.tcL4}>
            ③ 네트워크 상의 개인정보 및 개인인증정보를 안전하게 전송할 수 있는
            보안장치(SSL)를 채택하고 있습니다.
          </Text>
          <Text style={styles.tcL4}>
            ④ 해킹 등에 의해 고객의 개인정보가 유출되는 것을 방지하기 위하여,
            외부 침입을 차단하는 장치를 이용하고 있으며, 침입탐지시스템을
            설치하여 24시간 감시하고 있습니다.
          </Text>

          <Text style={styles.tcL3}>- 관리적 보호 대책</Text>
          <Text style={styles.tcL4}>
            ① 회사는 이용자의 개인정보를 처리할 수 있는 자를 최소한으로
            제한하고, 별도의 비밀번호를 부여하여 접근 권한을 관리하고 있습니다.
          </Text>
          <Text style={styles.tcL4}>
            또한 새로운 보안 기술 습득 및 개인정보보호 의무 등에 관해 정기적인
            교육을 실시하여 본 정책의 준수를 강조하고 있습니다.
          </Text>
          <Text style={styles.tcL4}>
            ② 회사는 이용자의 개인적인 부주의로 아이디, 비밀번호 등 개인정보가
            유출되어 발생한 문제와 기본적인 인터넷의 위험성 때문에 일어나는
            일들에 대해 책임을 지지 않습니다. 이용자의 아이디와 비밀번호는
            반드시 본인만 사용하고, 비밀번호를 자주 변경하며, 공용PC에서의
            로그인시 개인정보가 유출되지 않도록 각별한 주의를 기울여 주시기
            바랍니다.
          </Text>

          <Text style={styles.tcT}>9. 개인정보 보호책임자 및 상담·신고</Text>
          <Text style={styles.tcL2}>
            회사는 이용자의 개인정보를 보호하고 개인정보와 관련한 불만 및 문의를
            처리하기 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다.
          </Text>
          <Text style={styles.tcL2}>
            이용자는 회사의 서비스를 이용하며 발생하는 모든 개인정보보호 관련
            민원을 개인정보보호책임자 또는 담당부서로 신고할 수 있으며, 회사는
            이용자들의 신고사항에 대해 신속하게 충분한 답변을 드릴 것입니다.
          </Text>
          <Text style={styles.tcL3}>- 개인정보 보호책임자</Text>
          <Text style={styles.tcL4}>성명 : 안강엽</Text>
          <Text style={styles.tcL4}>전화 : 010-2869-6789</Text>
          <Text style={styles.tcL4}>이메일 : rkdduqdl12@gmail.com</Text>

          <Text style={styles.tcL3}>
            - 기타 개인정보침해에 대한 신고나 상담이 필요하신 경우에는 아래
            기관에 문의하시기 바랍니다.
          </Text>
          <Text style={styles.tcL4}>
            개인정보침해신고센터 : 118 ㅣ privacy.kisa.or.kr
          </Text>
          <Text style={styles.tcL4}>
            대검찰청 첨단범죄수사과 : 02-3480-2000 ㅣ www.spo.go.kr
          </Text>
          <Text style={styles.tcL4}>
            경찰청 사이버테러대응센터 : 국번없이 182 ㅣ cyberbureau.police.go.kr
          </Text>

          <Text style={styles.tcT}>10. 기타</Text>
          <Text style={styles.tcL2}>
            본 개인정보처리방침은 회사의 공식사이트 이외의 링크된 다른
            웹사이트(회사가 운영하지 않는 웹사이트를 말합니다)에서는 적용되지
            않습니다.
          </Text>

          <Text style={styles.tcT}>부칙</Text>
          <Text style={styles.tcL2}>
            본 개인정보처리방침은 2019년 12월 1일부터 적용됩니다.
          </Text>

          <Text style={styles.tcP}>
            법령·정책 또는 보안기술의 변경에 따라 현 개인정보처리방침 내용의
            추가·삭제 및 수정이 있을 시에는 개정안 적용일의 7일 전부터 회사의
            사이트 내 공지사항을 통하여 고지할 것입니다. 다만, 개인정보의 수집
            및 활용, 제 3자 제공 등과 같이 이용자 권리의 중요한 변경이 있을
            경우에는 최소 30일 전에 고지합니다.
          </Text>
        </ScrollView>
      </View>
    );
  }
}

const styles = {
  container: {
    marginTop: 0,
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
  tcL5: {
    marginLeft: 35,
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
