export const majorSaver = major => ({
  type: "SAVE_MAJOR",
  major: major
});

export const nicknameSaver = nickname => ({
  type: "SAVE_NICKNAME",
  nickname: nickname
});

export const introductionSaver = introduction => ({
  type: "SAVE_INTRODUCTION",
  introduction: introduction
});
