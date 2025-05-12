// Базовый путь для ссылок и ресурсов
// Измените на '/имя-репозитория' если сайт будет размещен в подкаталоге
export const BASE_PATH = process.env.NODE_ENV === "production" ? "/paint-ecommerce" : ""

// Функция для получения полного пути с учетом базового пути
export function getFullPath(path: string): string {
  return `${BASE_PATH}${path}`
}
