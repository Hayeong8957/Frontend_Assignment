import CalenderCheck from './calendar-check.svg';
import Calender from './calendar.svg';
import FileText from './file-text.svg';
import Home from './ico_Home.svg';
import HomeGray from './ico_Home_gray.svg';
import SheetLine from './ico_Sheet_Line.svg';
import SheetLineGray from './ico_Sheet_Line_gray.svg';
import SearchCheck from './search-check.svg';
import Search from './search.svg';
import StarFill from './star-fill.svg';
import Star from './star.svg';
import Symbol from './Symbol.svg';
import TelephoneFill from './telephone-fill.svg';
import Union from './Union.svg';

// svg파일들을 쉽게 관리하고 자동완성을 활용하기 위한
// svg파일 매핑 함수

function importSvg(name: string): any | null {
  const svgMap: { [key: string]: any } = {
    CalenderCheck,
    Calender,
    FileText,
    Home,
    HomeGray,
    SheetLine,
    SheetLineGray,
    SearchCheck,
    Search,
    StarFill,
    Star,
    Symbol,
    TelephoneFill,
    Union,
  };

  return svgMap[name] || null;
}

export default importSvg;
