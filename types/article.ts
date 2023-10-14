export interface IAPIReturnData {
  articles: IArticle[];
  nextPage: number;
}

export interface IArticle {
  abstract: string;
  web_url: string; // 웹 링크
  snippet: string;
  print_page: number;
  print_section: string;
  source: string; // 신문사
  multimedia: Multimedia[];
  headline: Headline; // 헤드라인
  keywords: Keyword[];
  lead_paragraph: string;
  pub_date: string; // 작성 날짜
  document_type: string;
  news_desk: string;
  subsection_name: string;
  section_name: string;
  byline: Byline;
  type_of_material: string;
  _id: string;
  word_count: number;
  uri: string;
}

export interface Byline {
  original: string;
  person: Person[];
  organization: string;
}

export interface Headline {
  main: string; // 헤드라인
  kicker: string;
  content_kicker: string;
  print_headline: string;
  name: string;
  seo: string;
  sub: string;
}

export interface Keyword {
  name: string;
  value: string;
  rank: number;
  major: string;
}

export interface Multimedia {
  rank: number;
  subtype: string;
  caption: string;
  credit: string;
  type: string;
  url: string;
  height: number;
  width: number;
  legacy: Legacy;
  crop_name: string;
}

export interface Legacy {
  xlarge: string;
  xlargewidth: number;
  xlargeheight: number;
}

export interface Person {
  firstname: string;
  middlename: string;
  lastname: string;
  qualifier: string;
  title: string;
  role: string;
  organization: string;
  rank: number;
}
