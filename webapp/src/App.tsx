import {
  Admin,
  I18nProvider,
  Resource,
  ShowGuesser,
} from "react-admin";
import { DataProviderImpl } from "./data-provider";
import { ProductCreate, ProductList, ProductEdit } from "./entities/products";
import { i18nEdit, i18nCreate, i18nList } from "./entities/i18n";
import polyglotI18nProvider from 'ra-i18n-polyglot';
// @ts-ignore
import russianMessages from 'ra-language-russian';
import { useEffect, useState } from "react";
import axios from "axios";

export const App = () => {
  const [http] = useState(() => axios.create({ baseURL: '/api/' }))
  const [i18nProvider, setI18nProvider] = useState<I18nProvider>();

  useEffect(() => {
    http.get('/i18n').then(d => {
      const i18n: Map<string, string> = d.data._embedded.i18n.reduce((acc: Map<string, string>, curr: object) => {
        acc.set(Reflect.get(curr, 'path'), Reflect.get(curr, 'value'));
        return acc;
      }, new Map<string, string>())
      setI18nProvider(polyglotI18nProvider(() => ({
        ...russianMessages,
        ...Object.fromEntries(i18n),
      }), 'ru'));
    })
  }, []);

  return <Admin dataProvider={DataProviderImpl.getProvider(http)} i18nProvider={i18nProvider}>
  <Resource
    name="products"
    list={ProductList}
    edit={ProductEdit}
    show={ShowGuesser}
    create={ProductCreate}
  />
  <Resource
    name="i18n"
    list={i18nList}
    edit={i18nEdit}
    create={i18nCreate}
  />
</Admin>
};
