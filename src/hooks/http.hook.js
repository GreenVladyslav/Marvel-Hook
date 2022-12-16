import { useState, useCallback } from "react";

export const useHttp = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    /* состояние будет менятся во время запроса loading - когда идет запрос перед ним, error - когда запрос завершился с ошибкой*/
    // const request = useCallback() - эту функцию потом будут помещать где-то внутри нашего приложения в том числе она может передоваться во внутрь дочерних компонентов чтобы не вызывать лишних запросов я буду использовать мимозированый варинат при помощи useCallback
    // method = 'GET' - по умолчанию (если вдруг он не будет указан)
    const request = useCallback(async (url, method = 'GET', body = null, headers = {'Content-Type': 'application/json'}) => {
        // useCallback - функция может передаваться в качестве пропса и, чтобы она не создавалась каждый раз при перерендеринге компонента, мы используем этот хук.
        setLoading(true);

        try {
            const response = await fetch(url, {method, body, headers});

            if (!response.ok) {
                throw new Error(`Could not fetch ${url}, status: ${response.status}`)
            }

            const data = await response.json(); /* предполагаю что будем работать с json но если нет, то можно передать тоже как аргумент */

            setLoading(false); /* если все ок то загрузка завершена и вернет данные(ответ) */
            return data;
        } catch(e) {
            setLoading(false); /* загрузка прекратилась она завершилась ошибкой*/
            setError(e.message); /* у ошибки есть свойство месседж ты знаешь) */
            throw e;
        }

    }, []);
    /* чистит ошшибку, когда получаем ошибку 404 - получаем и не можем переключить  */
    const clearError = useCallback(() => setError(null), [])
    /* вызвать эту функцию прямо перед тем как мы делаем каждый новый запрос */
    return {loading, request, error, clearError}
}