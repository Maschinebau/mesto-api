/* eslint-disable */
export enum ErrorStatuses {
  INTERNAL_SERVER = "На сервере произошла ошибка",
  MISSING_FIELDS = "Не все поля заполнены",
  DOC_NOT_FOUND = "Документ не найден"
}

export enum ResponceCodes {
  NOT_FOUND = 404,
  DATA_INCORRECT = 400,
  SERVER_ERROR = 500,
  SUCCESS = 200,
  CREATED = 201
}
