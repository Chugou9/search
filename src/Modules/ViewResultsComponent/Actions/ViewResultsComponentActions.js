import { ActionTypes } from "../Consts";
import {PENDING} from 'Common/Consts/Statuses';
import { FULFILLED, REJECTED } from "../../../Common/Consts/Statuses";

export class ViewResultsComponentActions {
    constructor(services, dispatch) {
        this.services = services;
        this.dispatch = dispatch;
    }

    /**
     * Получить изображения.
     *
     * @param {*} request Параметризированный запрос.
     */
    async getImages(request) {
        try {
            this.dispatch({
                type: `${ActionTypes.GET_IMAGES}${PENDING}`
            });

            const result = await this.services.getImages(request);

            this.dispatch({
                type: `${ActionTypes.GET_IMAGES}${FULFILLED}`,
                payload: result
            });
        } catch(e) {
            this.dispatch({
                type: `${ActionTypes.GET_IMAGES}${REJECTED}`
            });

            throw e;
        }

    }
}