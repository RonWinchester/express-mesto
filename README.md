# Бэкенд Проекта Mesto 
Репозиторий для бэкенда проекта Mesto со следующими возможностями: авторизации и регистрации пользователей, добавление и удаление карточек, регистрация пользователей,  валидация поступающих данных, сохранение токена в cookie.

## Директории
`/routes` — папка с файлами роутера  
`/controllers` — папка с файлами контроллеров пользователя и карточки   
`/models` — папка с файлами описания схем пользователя и карточки  
`/errors` — папка с классами ошибок пользователя и карточки  
`/middlewares` — папка с миддлверами авторизации, валидации, обработки ошибок  
  
Остальные директории вспомогательные, создаются при необходимости разработчиком

## Запуск проекта
1. Перед работой установите необходимые зависимости через - `npm i`
2. Для запуска базы данных используйте - `mongod`
3. Для запуска API в режиме разработчика используйте - `npm run dev`
4. Для локального запуска API воспользуйтесь - `npm run start`
