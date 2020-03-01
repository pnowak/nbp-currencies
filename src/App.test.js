import React from 'react';
import axios from 'axios';
import sinon from 'sinon';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NBPCurrenciesApp from './components/App';

configure({ adapter: new Adapter() });

describe('App', () => {
  const result = {
    data: {
      rates: [
        { currency: "dolar amerykański", code: "USD", bid: 3.897, ask: 3.9758 },
        { currency: "dolar australijski", code: "AUD", bid: 2.5638, ask: 2.6156 },
        { currency: "dolar kanadyjski", code: "CAD", bid: 2.9169, ask: 2.9759 },
        { currency: "euro", code: "EUR", bid: 4.2778, ask: 4.3642 },
        { currency: "forint (Węgry)", code: "HUF", bid: 0.012615, ask: 0.012869 },
        { currency: "frank szwajcarski", code: "CHF", bid: 4.0192, ask: 4.1004 },
        { currency: "funt szterling", code: "GBP", bid: 5.0209, ask: 5.1223 },
        { currency: "jen (Japonia)", code: "JPY", bid: 0.035444, ask: 0.03616 },
        { currency: "korona czeska", code: "CZK", bid: 0.1689, ask: 0.1723 },
        { currency: "korona duńska", code: "DKK", bid: 0.5725, ask: 0.5841 },
        { currency: "korona norweska", code: "NOK", bid: 0.4144, ask: 0.4228 },
        { currency: "korona szwedzka", code: "SEK", bid: 0.4037, ask: 0.4119 },
        { currency: "SDR (MFW)", code: "XDR", bid: 5.3777, ask: 5.4863 }
      ]
    }
  };

  const promise = Promise.resolve(result);

  beforeAll(() => {
    sinon
      .stub(axios, 'get')
      .withArgs('https://api.nbp.pl/api/exchangerates/tables/c?format=json')
      .returns(promise);
  });

  afterAll(() => {
    axios.get.restore();
  });

  it('fetches data from server when server returns a successful response', (done) => {
    const wrapper = mount(<NBPCurrenciesApp />);

    expect(wrapper.state().data).toEqual(null);

    promise.then(() => {
      wrapper.update();

      expect(wrapper.state().data).toEqual(result.data.rates);

      done();
    });
  });

  it('should create favourite list with RemoveAll button after click Add button', () => {
    const wrapper = shallow(<NBPCurrenciesApp />);
  });

  it('should disable Add button after clicked Add buttton', () => {
    
  });

  it('should remove element after click Remove button', () => {

  });

  it('should enable Add button in All list element after click Remove button', () => {

  });

  it('should remove all element from Favourite list  after click RemoveAll button', () => {

  });

  it('should remove RemoveAll button itself from Favourite list after click RemoveAll button', () => {

  });
});