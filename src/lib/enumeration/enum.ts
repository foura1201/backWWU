export enum UserType {
  person = 'person',
  business = 'business',
}

export enum PostType {
  work = 'work',
  business = 'business',
  //수정 필요
}

export enum ReportType {
  slander = 'slander', //비방, 비하, 욕설
  illegal = 'illegal', //불법
  obscene = 'obscene', //음란
  youthHazardous = 'youthHazardous', //청소년 유해
  personalInfo = 'personalInfo', //개인정보
  copyright = 'copyright', //저작권 침해
  publicity = 'publicity', //홍보성
}

export enum PayType {
  hourly = 'hourly',
  monthly = 'monthly',
}
