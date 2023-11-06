export const getErrorMesageFrom = (statusCode: number) => {
  let errMsg;
  switch (statusCode) {
    case 404:
      errMsg = '게시글이 존재하지 않습니다.';
      break;
    case 500:
      errMsg = '에러가 발생했습니다. 관리자에게 문의해 주세요!';
      break;
    default:
      errMsg = '게시글이 존재하지 않습니다.';
    // throw new Error(`처리되지 않은 상태 코드입니다: ${statusCode}`);
  }
  return errMsg;
};
