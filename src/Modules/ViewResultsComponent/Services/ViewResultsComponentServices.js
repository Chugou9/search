import { FAKE_GET } from "../../../Common/Utils/RestUtils";
/**
 * Сервисы для работы с компонентом просмотра результатов.
 */
export class ViewResultsComponentServices {
    
    /**
     * Получить изображения.
     *
     * @param {*} request Параметризированный запрос для получения изображений.
     */
    getImages(request) {
        return FAKE_GET(request);
    }
}