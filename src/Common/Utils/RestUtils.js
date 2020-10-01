const faker = require('faker');

/**
 * Возвращает массив тестовых данных.
 *
 * @param {*} request Запрос с параметрами генерации.
 */
export const FAKE_GET = (request) => {
    return new Promise(
        (resolve, reject) => {
            if (
                request.amount < 0
                || !request.dataType
                || !request.data
            ) {
                return setTimeout(() => {
                    reject('Шэф, всё пропало...')
                }, 3000);
            }

            setTimeout(() => {
                const result = [];

                for (let i = 0; i < request.amount; i++) {
                    let dataTypeFunc = faker[request.dataType];

                    let data = dataTypeFunc && dataTypeFunc[request.data] && dataTypeFunc[request.data](100, 100, request.amount)
                    data && result.push(data);
                }
    
                return resolve(result);
            }, 5000);
        }
    );
};