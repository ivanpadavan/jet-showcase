# JetShowcase

Проект состоит из трех компонент
 - Postrgesql база
 - [jetadmin/jet-bridge](https://github.com/jet-admin/jet-bridge)
 - Angular фронтенд
 
Фронтенд использует REST API предоставляемый пакетом [jetadmin/jet-bridge](https://github.com/jet-admin/jet-bridge).
В данный момент тут только таблицы и меню с reordering.

## Development server
- Скопировать `app/.env.example` в `app/.env`.
- Запустить `docker-compose up -d` для запуска бэкенда.
- Воспользоваться командой `ng serve`
