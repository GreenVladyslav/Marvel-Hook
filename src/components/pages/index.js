import MainPage from "../pages/MainPage";
import ComicsPage from "./ComicsPage";
import Page404 from './404';
import SingleComicPage from "./SingleComicPage/SingleComicPage";

export {MainPage, ComicsPage, Page404, SingleComicPage};

// Для оптимизации если вдруг у нас будет очень много страничек ( и + мы в app импортируем только один обьект, одной строкой)
// Если у каждого файла в папке pages появятся свои стили то лучше в этой же папке создать еще папки для каждого отдельного файла и его стилей