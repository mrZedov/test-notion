# Technical test Katalyz (backend)

# **Context**

You are part of a VTC (akin to Uber) booking company, and the Marketing team wants to encourage customers to book a ride by offering them promotions.

For this, they want to equip themselves with a *promo code* management service where:

- The Marketing team can add *promo codes* whose validity will depend on one or more criteria.
- The application can check the validity of a *promo code* and obtain the associated discount.

The goal of this test is to build this service with its API. You can use any framework, library, or tool you deem necessary. Please use JS/TS. Using Nestjs is a plus.

## **Specifications**

### **Structure of a *promo code***

Every promo code consists of a name, a benefit (the associated discount), and one or more restrictions (the validity criteria for the promo code).

For a promo code to be validated, all its restrictions must be validated.

Restrictions are defined by various rules titled **`@age`**, **`@date`**, **`@meteo`**, **`@or`**, and **`@and`**. The **`@or`** and **`@and`** rules include other rules.

> A @or or @and rule that can include other @or or @and rules, the tree of restrictions can go to an arbitrary depth.
> 

Here's a promo code example:

```json
{
  "_id": "...",
  "name": "WeatherCode",
  "advantage": { "percent": 20 },
  "restrictions": [
    {
      "@date": {
        "after": "2019-01-01",
        "before": "2020-06-30"
      }
    }
    {
      "@or": [
        {
          "@age": {
            "eq": 40
          }
        },
        {
          "@and": [
            {
              "@age": {
                "lt": 30,
                "gt": 15
              }
            },
            {
              "@meteo": {
                "is": "clear",
                "temp": {
                  "gt": "15" // Celsius here.
                }
              }
            }
          ]
        }
      ]
    }
  ]
}
```

This promocode is read as:

- It can be used if today's date is between January 1st, 2019, and June 30th, 2020.
- The customer either must be 40 years old or must be between 15 and 30 years old, and the outside temperature should be above 15 °C with clear skies.
- If the customer meets these restrictions, they get a 20% discount on their ride.

### **Adding a *promo code***

👉 **Instruction: the service should expose a route to add and save promo codes.**

> For data storage, it's not necessary to use a real database. A basic in-memory implementation is more than enough.
> 

### **Validation of a *promo code* and obtaining the discount**

👉 **Instruction: the service should expose a second route to validate the use of a promo code and get the associated discount for a given user.**

*Example request:*
```json
{
  "promocode_name": "WeatherCode",
  "arguments": {
    "age": 25,
    "meteo": { "town": "Lyon" }
  }
}
```
Example response if the promo code is validated:
```json
{
  "promocode_name": "WeatherCode",
  "status": "accepted",
  "advantage": { "percent": 20 }
}
```
Example response if the promo code is invalidated:
```json
{
  "promocode_name": "WeatherCode",
  "status": "denied",
  "reasons": {
    // The reasons why the promocode was not validated
  }
}
```


## **Evaluation**

During the evaluation of your code, special attention will be given to:

- The operation of the algorithm,
- The architecture of the application,
- The readability and clarity of the code,
- The presence of tests and their quality.

Happy coding 💪 ✌️

## **Annexes**

### **Weather**

To access the current weather, you can use the *OpenWeather* API.
## **Evaluation**

During the evaluation of your code, special attention will be given to:

- The operation of the algorithm,
- The architecture of the application,
- The readability and clarity of the code,
- The presence of tests and their quality.

Happy coding 💪 ✌️

## **Annexes**

### **Weather**

To access the current weather, you can use the *OpenWeather* API.

https://openweathermap.org/current

# О реализации

В качестве базы выбран сервер PostgreSQL, которая работает в docker-контейнере, конфигурационный файл находится по пути services/docker-compose.yml. Некоторые общие параметры описаны в файле services/.env

Описание API можно посмотреть http://localhost:3000/api/#/

POST /api/promo-code
<br>Метод добавляет новый промокод. Причем если промокод с переданнным наименованием уже существует, то будет возвращена в ответ ошибка с комментарием "Promo code's name - already in use".

Реализация всех методов операций CRUD не предполагалась в ТЗ, но технически это не сложно и того что реализовано как мне кажется достаточно.

POST /api/promo-code-validation
<br>Метод проверяет валидацию исходя из переданных параметров и возвращает допустимый дисконт в случае успеха. Если валидация была неуспшной, то будет возвращена структура json с признаком "status": "denied" и по возможности причина отказа. Тут стоит заметить что если отказ будет в результате неудовлетворению одному условию, то будет возвращено условие в читабельном виде, например
```json
{
    "promocode_name": "WeatherCode",
    "status": "denied",
    "reasons": "Age not equal 40"
}
```
либо если отказ будет в результате неудовлетворения группе условий, то в ответе мы увидим именно забраковавшие ограничения. Но тут хотелось бы реализовать более сложный анализировать каких именно данных будет минимально достаточно для удовлетворения ограничения. Например такой отказ мы получим при параметрах запроса *age=20*. Но нет необходимости соблюдения всех указанных причин. Достаточно будет либо *age=20*, либо *"meteo is clear"*. Пример ответа ниже:
```json
{
    "promocode_name": "WeatherCode",
    "status": "denied",
    "reasons": [
        "age not equal 40",
        "meteo.meteo is not clear"
    ]
}
```
