import ApiService from './utils/api-service';

const Method = {
  GET: 'GET',
  POST: 'POST',
};

export default class PortfolioApiService extends ApiService {
  get questions() {
    return this._load({url: 'questions'})
      .then(ApiService.parseResponse);
  }

  get certificates() {
    return this._load({url: 'certificates'})
      .then(ApiService.parseResponse);
  }

  sendAnswers = async (answers) => {
    const response = await this._load({
      url: 'answers',
      method: Method.POST,
      body: JSON.stringify(answers),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  };
}

//json-server src/mock/question.json --routes src/mock/routes.json || json-server src/mock/question.json
