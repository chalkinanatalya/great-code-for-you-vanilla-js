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

  get developers() {
    return this._load({url: 'developers'})
      .then(ApiService.parseResponse);
  }

  sendAnswers = async (answers) => {
    const response = await this._load({
      url: 'questionnaire',
      method: Method.POST,
      body: JSON.stringify(answers),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    const parsedResponse = await response.text();
    return parsedResponse;
  };

  sendFeedback = async (answers) => {
    const response = await this._load({
      url: 'feedback',
      method: Method.POST,
      body: JSON.stringify(answers),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    const parsedResponse = await response.text();
    return parsedResponse;
  };
}
